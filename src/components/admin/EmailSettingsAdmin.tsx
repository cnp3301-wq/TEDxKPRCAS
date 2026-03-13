import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Key, Loader2, Info, Send, ExternalLink, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useSiteSetting,
  useUpdateSiteSetting,
} from "@/hooks/use-database";
import { supabase } from "@/lib/supabase";

type Props = {
  showNotification: (type: "success" | "error", message: string) => void;
};

const EmailSettingsAdmin = ({ showNotification }: Props) => {
  const [gmailEmail, setGmailEmail] = useState("");
  const [appPassword, setAppPassword] = useState("");
  const [fromName, setFromName] = useState("TEDx KPRCAS");
  const [showSetupGuide, setShowSetupGuide] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testEmail, setTestEmail] = useState("");

  // Load saved settings
  const { data: savedEmail } = useSiteSetting("gmail_email");
  const { data: savedPassword } = useSiteSetting("gmail_app_password");
  const { data: savedFromName } = useSiteSetting("email_from_name");

  const { mutate: updateSetting, isPending } = useUpdateSiteSetting();

  // Load settings into form
  useEffect(() => {
    if (savedEmail) setGmailEmail(savedEmail);
    if (savedPassword) setAppPassword(savedPassword);
    if (savedFromName) setFromName(savedFromName);
  }, [savedEmail, savedPassword, savedFromName]);

  const handleSave = async () => {
    if (!gmailEmail || !appPassword) {
      showNotification("error", "Please fill in Gmail Email and App Password");
      return;
    }

    try {
      const settings = [
        { key: "gmail_email", value: gmailEmail },
        { key: "gmail_app_password", value: appPassword },
        { key: "email_from_name", value: fromName },
        // Also save as SMTP for backward compatibility
        { key: "smtp_host", value: "smtp.gmail.com" },
        { key: "smtp_port", value: "587" },
        { key: "smtp_user", value: gmailEmail },
        { key: "smtp_pass", value: appPassword },
        { key: "smtp_from_email", value: gmailEmail },
        { key: "smtp_from_name", value: fromName },
      ];

      for (const setting of settings) {
        await new Promise<void>((resolve, reject) => {
          updateSetting(setting, { onSuccess: () => resolve(), onError: reject });
        });
      }
      
      showNotification("success", "Email settings saved successfully");
    } catch {
      showNotification("error", "Failed to save email settings");
    }
  };

  const handleTestEmail = async () => {
    if (!gmailEmail || !appPassword) {
      showNotification("error", "Please fill in Gmail Email and App Password first");
      return;
    }

    if (!testEmail) {
      showNotification("error", "Please enter a test email address");
      return;
    }

    setIsTesting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-email", {
        body: {
          to: testEmail,
          subject: "🧪 Test Email from TEDx KPRCAS",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #e62b1e 0%, #000 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
                <h1 style="margin: 0;">🎤 TEDx KPRCAS</h1>
              </div>
              <div style="background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px;">
                <h2 style="color: #10b981;">✅ Email Configuration Working!</h2>
                <p>This is a test email from your TEDx KPRCAS website.</p>
                <p>If you received this email, your email settings are configured correctly.</p>
                <hr style="border: 1px solid #eee; margin: 20px 0;" />
                <p style="color: #666; font-size: 14px;">
                  <strong>Sent from:</strong> ${gmailEmail}
                </p>
              </div>
            </div>
          `,
          text: "Test email from TEDx KPRCAS. Your email settings are working correctly!",
        },
      });

      if (error) throw error;
      
      showNotification("success", `Test email sent to ${testEmail}`);
    } catch (error: any) {
      console.error("Test email error:", error);
      showNotification("error", error.message || "Failed to send test email. Check your settings.");
    } finally {
      setIsTesting(false);
    }
  };

  const isConfigured = gmailEmail && appPassword;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-500" />
            Email Configuration
          </h3>
          <p className="text-sm text-muted-foreground">
            Use Gmail with App Password to send emails
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSetupGuide(!showSetupGuide)}
        >
          <Info className="w-4 h-4 mr-1" />
          How to Get App Password
        </Button>
      </div>

      {/* Status indicator */}
      {isConfigured ? (
        <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-3 rounded-lg">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Email configured and ready</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-amber-500 bg-amber-500/10 px-4 py-3 rounded-lg">
          <AlertTriangle className="w-5 h-5" />
          <span>Email not configured - registration confirmations will not be sent</span>
        </div>
      )}

      {/* Setup Guide */}
      {showSetupGuide && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-5 space-y-4"
        >
          <h4 className="font-semibold text-blue-400 flex items-center gap-2">
            <Info className="w-5 h-5" />
            How to Get Gmail App Password
          </h4>
          
          <div className="space-y-4 text-sm">
            <div className="space-y-2">
              <p className="font-medium text-foreground">Step 1: Enable 2-Factor Authentication</p>
              <p className="text-muted-foreground ml-4">
                Go to your Google Account → Security → 2-Step Verification → Turn ON
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="font-medium text-foreground">Step 2: Create App Password</p>
              <ol className="list-decimal list-inside ml-4 space-y-1 text-muted-foreground">
                <li>Go to <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">Google App Passwords <ExternalLink className="w-3 h-3" /></a></li>
                <li>Select app: <strong>Mail</strong></li>
                <li>Select device: <strong>Other</strong> (name it "TEDx Website")</li>
                <li>Click <strong>Generate</strong></li>
                <li>Copy the 16-character password (remove spaces)</li>
              </ol>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded p-3">
              <p className="text-amber-300 font-medium">⚠️ Important Notes:</p>
              <ul className="list-disc list-inside ml-2 mt-1 text-muted-foreground text-xs space-y-1">
                <li>2FA must be enabled to create App Passwords</li>
                <li>App Password is 16 characters without spaces (e.g., abcdefghijklmnop)</li>
                <li>Your regular Gmail password will NOT work</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Settings Form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gmail-email">Gmail Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="gmail-email"
              type="email"
              placeholder="yourname@gmail.com"
              value={gmailEmail}
              onChange={(e) => setGmailEmail(e.target.value)}
              className="pl-10"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            The Gmail account you'll use to send emails
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="app-password">App Password *</Label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="app-password"
              type="password"
              placeholder="abcdefghijklmnop"
              value={appPassword}
              onChange={(e) => setAppPassword(e.target.value.replace(/\s/g, ""))}
              className="pl-10 font-mono"
              maxLength={16}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            16-character App Password from Google (not your regular password)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="from-name">Sender Name</Label>
          <Input
            id="from-name"
            placeholder="TEDx KPRCAS"
            value={fromName}
            onChange={(e) => setFromName(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Name shown as the sender in emails
          </p>
        </div>
      </div>

      <Button
        onClick={handleSave}
        disabled={isPending || !gmailEmail || !appPassword}
        className="w-full bg-tedx-red hover:bg-tedx-red/90"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Email Settings"
        )}
      </Button>

      {/* Test Email Section */}
      <div className="border-t pt-6 mt-6">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Send className="w-4 h-4" />
          Test Email Configuration
        </h4>
        <div className="flex gap-3">
          <Input
            placeholder="Enter your email to receive a test"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            onClick={handleTestEmail}
            disabled={isTesting || !isConfigured}
          >
            {isTesting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Test
              </>
            )}
          </Button>
        </div>
        {!isConfigured && (
          <p className="text-xs text-amber-500 mt-2">
            Save your email settings first to send a test
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailSettingsAdmin;
