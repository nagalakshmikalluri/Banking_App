# GitHub Pages Setup Guide for Banking App

This guide will help you deploy your Banking App frontend on GitHub Pages (fast and free) while hosting the backend on Render.

## 🚀 Quick Setup Steps

### Step 1: Deploy Backend on Render

1. Go to [Render.com](https://render.com) and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `https://github.com/nagalakshmikalluri/Banking_App`
4. Configure the service:
   - **Name**: banking-app-backend (or any name you prefer)
   - **Environment**: Java
   - **Build Command**: `./mvnw clean package -DskipTests`
   - **Start Command**: `java -jar target/banking-app-0.0.1-SNAPSHOT.jar`
   - **Instance Type**: Free
5. Click **"Create Web Service"**
6. Wait for deployment (5-10 minutes for first time)
7. **Copy your Render URL** (e.g., `https://banking-app-backend-xxxx.onrender.com`)

### Step 2: Update Frontend Configuration

1. Open `docs/config.js` in your repository
2. Replace the `baseURL` with your Render backend URL:
```javascript
const API_CONFIG = {
    baseURL: 'https://banking-app-backend-xxxx.onrender.com/api/accounts'
};
```
3. Commit and push this change to GitHub

### Step 3: Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/nagalakshmikalluri/Banking_App
2. Click **"Settings"** → **"Pages"** (in the left sidebar)
3. Under "Source", select:
   - **Branch**: `main` (or your default branch)
   - **Folder**: `/docs`
4. Click **"Save"**
5. GitHub will deploy your site (takes 1-2 minutes)
6. Your site will be available at: `https://nagalakshmikalluri.github.io/Banking_App/`

### Step 4: Update CORS Configuration

To allow your GitHub Pages frontend to communicate with your Render backend, update the CORS configuration:

1. Open `src/main/java/net/javaguides/banking_app/config/WebConfig.java`
2. Add your GitHub Pages URL to the allowed origins:
```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            .allowedOrigins(
                "http://localhost:3000",
                "https://nagalakshmikalluri.github.io"  // Add this line
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
}
```
3. Commit and push this change
4. Render will automatically redeploy your backend with the new CORS settings

## ✅ Verification Steps

After completing all steps:

1. Visit your GitHub Pages site: `https://nagalakshmikalluri.github.io/Banking_App/`
2. Open browser DevTools (F12) → Console tab
3. Try creating an account
4. If you see CORS errors, double-check Step 4
5. If you see connection errors, verify your Render backend URL in `docs/config.js`

## 🎯 Benefits of This Setup

- ✨ **GitHub Pages**: Fast, free, and reliable frontend hosting
- 🚀 **Render**: Free backend hosting with auto-sleep (wakes up when accessed)
- 💰 **Cost**: Completely free!
- 🔄 **Auto-deployment**: Both update automatically when you push to GitHub

## 📝 Important Notes

1. **Render Free Tier**: Backend sleeps after 15 minutes of inactivity. First request after sleep takes 30-60 seconds to wake up.
2. **GitHub Pages**: Updates within 1-2 minutes after pushing changes.
3. **Custom Domain** (Optional): You can configure a custom domain in GitHub Pages settings.

## 🔧 Troubleshooting

### Frontend doesn't load accounts
- Check if backend URL in `docs/config.js` is correct
- Open DevTools Console and look for error messages
- Verify backend is running by visiting: `https://your-backend-url.onrender.com/api/accounts`

### CORS Error
- Make sure you updated `WebConfig.java` with your GitHub Pages URL
- Verify the backend redeployed on Render (check Render dashboard)

### Backend is slow
- Render free tier sleeps after inactivity
- First request takes 30-60 seconds to wake up
- Subsequent requests are fast

## 📱 Your URLs

- **Frontend (GitHub Pages)**: https://nagalakshmikalluri.github.io/Banking_App/
- **Backend (Render)**: `https://your-backend-name.onrender.com` (update after deployment)
- **GitHub Repository**: https://github.com/nagalakshmikalluri/Banking_App

---

**Need Help?** Check the [Render Documentation](https://render.com/docs) or [GitHub Pages Documentation](https://docs.github.com/en/pages)
