/**
 * ════════════════════════════════════════════════════════════════
 * GOOGLE APPS SCRIPT - TEDx KPRCAS Registration Data Handler
 * ════════════════════════════════════════════════════════════════
 * 
 * Setup Instructions:
 * 1. Go to https://script.google.com
 * 2. Create a new project named "TEDxKPRCAS Registration"
 * 3. Replace all code with this file
 * 4. Update SHEET_ID below (from your Google Sheet URL)
 * 5. Run: verifySetup() to test
 * 6. Deploy as Web app (Deploy > New > Web app > Anyone)
 * 7. Paste deployment URL into Admin Panel > Payment Settings
 * ════════════════════════════════════════════════════════════════
 */

// ⚠️  CONFIGURATION - UPDATE THESE VALUES
const SHEET_ID = ""; // Replace with your Google Sheet ID
const SHEET_NAME = ""; // Name of the sheet tab
const REQUIRED_HEADERS = [
  "timestamp",
  "iso_timestamp",
  "registration_number",
  "name",
  "email",
  "phone",
  "user_type",
  "registration_code",
  "payment_status",
  "user_upi_id",
  "transaction_id"
];

// ════════════════════════════════════════════════════════════════
// MAIN POST HANDLER - Called by registration app
// ════════════════════════════════════════════════════════════════

/**
 * Main handler for POST requests from TEDx KPRCAS registration app
 */
function doPost(e) {
  try {
    // Validate request
    if (!e || !e.postData) {
      return createErrorResponse("Invalid request - e.postData not found");
    }

    // Parse JSON data from request body
    const data = JSON.parse(e.postData.contents);
    
    if (!data || typeof data !== 'object') {
      return createErrorResponse("Invalid JSON data format");
    }

    // Get or create sheet
    const sheet = getOrCreateSheet();
    if (!sheet) {
      return createErrorResponse("Failed to access spreadsheet");
    }

    // Ensure headers exist
    if (sheet.getLastRow() === 0) {
      createHeaders(sheet);
    }

    // Prepare and add the row
    const success = addToSheet(sheet, data);
    
    if (success) {
      Logger.log(`✅ Registration: ${data.email || 'unknown'} | Code: ${data.registration_code || 'pending'}`);
      return createSuccessResponse("Data received and saved to sheet");
    } else {
      return createErrorResponse("Failed to append row to sheet");
    }

  } catch (error) {
    Logger.log(`❌ Error in doPost: ${error.message}`);
    return createErrorResponse(error.message);
  }
}

// ════════════════════════════════════════════════════════════════
// SHEET MANAGEMENT FUNCTIONS
// ════════════════════════════════════════════════════════════════

/**
 * Get or create the spreadsheet and sheet
 */
function getOrCreateSheet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      Logger.log(`📋 Created new sheet: ${SHEET_NAME}`);
    }

    return sheet;
  } catch (error) {
    Logger.log(`❌ Error getting/creating sheet: ${error.message}`);
    return null;
  }
}

/**
 * Create header row with formatting
 */
function createHeaders(sheet) {
  try {
    const headers = [
      "timestamp",
      "iso_timestamp",
      "registration_number",
      "name",
      "email",
      "phone",
      "user_type",
      "registration_code",
      "payment_status",
      "user_upi_id",
      "transaction_id"
    ];

    // Append headers
    sheet.appendRow(headers);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#1f2937");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setFontSize(11);

    // Auto-resize columns
    for (let i = 1; i <= headers.length; i++) {
      sheet.autoResizeColumn(i);
    }

    Logger.log(`✅ Headers created: ${headers.length} columns`);
    return true;

  } catch (error) {
    Logger.log(`❌ Error creating headers: ${error.message}`);
    return false;
  }
}

/**
 * Prepare row data and add to sheet
 */
function prepareRowData(sheet, data) {
  try {
    // Get headers from first row
    const headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Build row data in header order
    const rowData = headerRow.map(header => {
      if (!header) return "";

      const headerKey = header.toLowerCase().trim();
      let value = data[header] || data[headerKey] || "";

      // Handle nested form_data
      if (!value && data.form_data && typeof data.form_data === 'object') {
        value = data.form_data[header] || data.form_data[headerKey] || "";
      }

      // Convert objects to JSON string
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }

      return String(value).trim();
    });

    return rowData;

  } catch (error) {
    Logger.log(`❌ Error preparing row: ${error.message}`);
    return null;
  }
}

/**
 * Add data row to sheet
 */
function addToSheet(sheet, data) {
  try {
    const rowData = prepareRowData(sheet, data);

    if (!rowData || rowData.length === 0) {
      Logger.log("❌ No valid row data to append");
      return false;
    }

    sheet.appendRow(rowData);
    Logger.log(`✅ Row appended with ${rowData.length} columns`);
    return true;

  } catch (error) {
    Logger.log(`❌ Error adding to sheet: ${error.message}`);
    return false;
  }
}

// ════════════════════════════════════════════════════════════════
// RESPONSE HELPERS
// ════════════════════════════════════════════════════════════════

/**
 * Create success response
 */
function createSuccessResponse(message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: message,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Create error response
 */
function createErrorResponse(message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: message,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ════════════════════════════════════════════════════════════════
// UTILITY & TESTING FUNCTIONS
// ════════════════════════════════════════════════════════════════

/**
 * Handle GET requests (browser visits)
 */
function doGet(e) {
  return ContentService
    .createTextOutput("✅ Google Apps Script is running.\nEndpoint: POST requests from TEDx KPRCAS registration app")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Test posting data to the endpoint
 */
function testPost() {
  try {
    const testData = {
      timestamp: new Date().toISOString(),
      registration_number: 999,
      name: "Test User",
      email: "test@example.com",
      phone: "9876543210",
      user_type: "student",
      registration_code: "TEST123",
      payment_status: "submitted",
      user_upi_id: "test@upi",
      transaction_id: "TXN123"
    };

    // Call doPost directly
    const mockEvent = {
      postData: {
        contents: JSON.stringify(testData)
      }
    };

    const response = doPost(mockEvent);
    Logger.log("Test response:", response.getContent());

  } catch (error) {
    Logger.log("❌ Test failed:", error.message);
  }
}

/**
 * Verify setup and test connection
 * Run this function first to check everything is configured correctly
 */
function verifySetup() {
  try {
    Logger.log("════════════════════════════════════════════════════");
    Logger.log("VERIFICATION REPORT - TEDx KPRCAS Apps Script");
    Logger.log("════════════════════════════════════════════════════");

    // Check SHEET_ID
    Logger.log(`\n📋 Sheet Configuration:`);
    Logger.log(`   Sheet ID: ${SHEET_ID}`);
    Logger.log(`   Sheet Name: ${SHEET_NAME}`);

    // Try to access spreadsheet
    try {
      const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
      Logger.log(`   ✅ Spreadsheet accessible`);

      // Check if sheet exists or create it
      let sheet = spreadsheet.getSheetByName(SHEET_NAME);
      if (!sheet) {
        sheet = spreadsheet.insertSheet(SHEET_NAME);
        Logger.log(`   ✅ Sheet created: ${SHEET_NAME}`);
      } else {
        Logger.log(`   ✅ Sheet found: ${SHEET_NAME}`);
      }

      // Check headers
      if (sheet.getLastRow() === 0) {
        Logger.log(`   ⚠️  Sheet is empty - creating headers...`);
        createHeaders(sheet);
        Logger.log(`   ✅ Headers created`);
      } else {
        const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        Logger.log(`   ✅ Headers exist: ${headers.length} columns`);
        Logger.log(`      ${headers.join(" | ")}`);
      }

      // Display stats
      const totalRows = sheet.getLastRow();
      Logger.log(`\n📊 Sheet Statistics:`);
      Logger.log(`   Total rows: ${totalRows}`);
      Logger.log(`   Data rows: ${totalRows - 1}`);

    } catch (error) {
      Logger.log(`   ❌ Error: ${error.message}`);
      return;
    }

    // Test data preparation
    Logger.log(`\n🧪 Test Data Preparation:`);
    const testData = {
      timestamp: new Date().toISOString(),
      name: "John Doe",
      email: "john@example.com",
      phone: "9876543210",
      user_type: "student",
      form_data: {
        college_name: "KPRCAS",
        department: "CSE"
      }
    };

    const sheet = getOrCreateSheet();
    const rowData = prepareRowData(sheet, testData);
    Logger.log(`   ✅ Row prepared: ${rowData.length} columns`);

    Logger.log(`\n════════════════════════════════════════════════════`);
    Logger.log("✅ SETUP VERIFICATION COMPLETE - Ready to use!");
    Logger.log(`\n📤 Next Step: Paste this deployment URL in Admin Panel:`);
    Logger.log(`   Admin → Payment Settings → Google Sheet Integration`);
    Logger.log("════════════════════════════════════════════════════\n");

  } catch (error) {
    Logger.log(`\n❌ VERIFICATION FAILED: ${error.message}`);
  }
}
