# Email Server - Node.js + Nodemailer

This is a simple Node.js Express API server that sends emails using Nodemailer with Gmail SMTP.

## Setup

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `server/` directory with your Gmail credentials:

```env
PORT=3001
VITE_APP_EMAIL=tedxkprcas@kprcas.ac.in
VITE_APP_PASSWORD=rycb wxyp dsdc jqre
```

**Important:** Use a Gmail App Password, not your main password!
- Go to: https://myaccount.google.com/apppasswords
- Select "Mail" and "Windows Computer" (or your device)
- Generate a 16-character app password
- Use that password in `.env`

### 3. Start the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

The server will start on `http://localhost:3001`

## Endpoints

### Health Check
```
GET /health
```
Response: `{ "status": "ok", "message": "Email server is running" }`

### Send Email
```
POST /api/send-email
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Subject Line",
  "html": "<h1>Email Body</h1>",
  "text": "Plain text version (optional)"
}
```

Response:
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "message-id@gmail.com"
}
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3001` |
| `VITE_APP_EMAIL` | Gmail account | `tedxkprcas@kprcas.ac.in` |
| `VITE_APP_PASSWORD` | Gmail app password | `rycb wxyp dsdc jqre` |

## Frontend Configuration

In your main `.env` file, set:
```env
VITE_EMAIL_API_URL=http://localhost:3001  # Development
VITE_EMAIL_API_URL=https://your-server.com  # Production
```

## Deployment

### Option 1: Heroku
```bash
heroku create your-app-name
heroku config:set VITE_APP_EMAIL=your-email@gmail.com
heroku config:set VITE_APP_PASSWORD=your-app-password
git push heroku main
```

### Option 2: Vercel
```bash
vercel --prod
```

### Option 3: Railway, Render, or other Node.js hosts
Just push your code and set environment variables in their dashboard.

## Troubleshooting

**Error: "Invalid login"**
- Make sure you're using an App Password, not your main Gmail password
- Generate a new one at https://myaccount.google.com/apppasswords

**Error: "CORS blocked"**
- The server includes CORS headers by default
- Make sure your frontend is making requests to the correct `VITE_EMAIL_API_URL`

**Server not starting**
- Check if port 3001 is already in use
- Try `npm start` with a different PORT: `PORT=3002 npm start`
