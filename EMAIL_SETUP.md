# Email Setup - Development vs Production

## Development (Local)

### 1. Install Email Server
```bash
cd server
npm install
```

### 2. Start Both Servers
```bash
# From root directory
.\START_DEV_FULL.bat
```

- Email API: `http://localhost:3001/api/send-email`
- Frontend: `http://localhost:5173`

---

## Production (Vercel)

Your production deployment is now using **Vercel API Routes** instead of a separate Node.js server.

### 1. Set Environment Variables on Vercel

Go to your Vercel project settings and add:

```
VITE_APP_EMAIL = tedxkprcas@kprcas.ac.in
VITE_APP_PASSWORD = rycb wxyp dsdc jqre
```

### 2. Deploy

```bash
git add .
git commit -m "Add email API and nodemailer"
git push
```

Vercel will automatically:
- Install `nodemailer` from `package.json`
- Deploy the `/api/send-email` endpoint
- Route email requests to the serverless function

### 3. Test Production

Once deployed, your production site (`https://tedxkprcas-one.vercel.app`) will use:
- **Email endpoint**: `https://tedxkprcas-one.vercel.app/api/send-email`

---

## How It Works

### Development Flow
1. Frontend → `http://localhost:3001/api/send-email` (Node.js server)
2. Server uses Nodemailer → Gmail SMTP

### Production Flow
1. Frontend → `/api/send-email` (Vercel API Route)
2. Serverless function uses Nodemailer → Gmail SMTP

Both automatically detect the environment and use the correct endpoint.

---

## Troubleshooting

### Error: 405 Method Not Allowed
- Make sure you're using `POST` not `GET`
- Check that `/api/send-email` endpoint exists
- Verify environment variables are set on Vercel

### Error: Invalid login
- Verify app password is correct: `rycb wxyp dsdc jqre`
- Regenerate at: https://myaccount.google.com/apppasswords
- Ensure you're using App Password, not main Gmail password

### Emails not sending
- Check Vercel function logs: https://vercel.com → Project → Functions
- Verify email address is correct: `tedxkprcas@kprcas.ac.in`
- Check network tab for API response

---

## File Structure

```
project/
├── api/
│   └── send-email.js          ← Vercel API route
├── server/
│   ├── server.js              ← Local Node.js server
│   ├── package.json
│   └── .env                   ← Local email credentials
├── src/
│   └── lib/
│       └── email.ts           ← Frontend email service
├── .env                       ← Frontend config
├── package.json               ← Added nodemailer
└── START_DEV_FULL.bat        ← Start both servers locally
```

---

## Next Steps

1. **Local Testing** (Recommended first)
   ```bash
   npm install  # Install dependencies
   .\START_DEV_FULL.bat  # Start both servers
   # Test registration form at http://localhost:5173
   ```

2. **Deploy to Vercel**
   ```bash
   git push  # Automatic deployment
   # Or manual: vercel --prod
   ```

3. **Verify Production**
   - Test registration on https://tedxkprcas-one.vercel.app
   - Check Vercel function logs for any errors

