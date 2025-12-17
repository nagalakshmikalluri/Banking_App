<!-- Add this checklist to your README or track your progress -->

# 🎯 GitHub Pages Deployment Checklist

## Before You Start
- [ ] Your code is pushed to GitHub: https://github.com/nagalakshmikalluri/Banking_App
- [ ] You have a Render.com account (free)

## Backend Deployment (Render)
- [ ] Created new Web Service on Render
- [ ] Connected GitHub repository
- [ ] Set Build Command: `./mvnw clean package -DskipTests`
- [ ] Set Start Command: `java -jar target/banking-app-0.0.1-SNAPSHOT.jar`
- [ ] Deployment completed successfully
- [ ] Copied Render backend URL (e.g., `https://banking-app-xxxx.onrender.com`)
- [ ] Tested backend by visiting: `[YOUR_RENDER_URL]/api/accounts`

## Frontend Configuration
- [ ] Opened `docs/config.js` in your repository
- [ ] Updated `baseURL` with your Render backend URL
- [ ] Committed and pushed changes to GitHub

## GitHub Pages Setup
- [ ] Went to Repository Settings → Pages
- [ ] Selected Source: Branch = `main`, Folder = `/docs`
- [ ] Clicked Save
- [ ] Waited 1-2 minutes for deployment
- [ ] Visited site: `https://nagalakshmikalluri.github.io/Banking_App/`

## Testing
- [ ] Frontend page loads correctly
- [ ] Can create a new account
- [ ] Can deposit money
- [ ] Can withdraw money
- [ ] Can delete account
- [ ] All features working without errors

## Optional (If Needed)
- [ ] Updated CORS in `WebConfig.java` (already allows all origins)
- [ ] Set up custom domain in GitHub Pages settings

---

## 🎉 Deployment Complete!

**Your Live URLs:**
- Frontend: `https://nagalakshmikalluri.github.io/Banking_App/`
- Backend: `[YOUR_RENDER_URL]`

## 💡 Quick Tips
- Render free tier: Backend sleeps after 15 min → first request takes 30-60 sec
- GitHub Pages: Updates automatically when you push code changes
- Check browser console (F12) for any errors

## 📝 Next Steps
- Share your live app URL
- Add more features
- Consider upgrading Render for 24/7 uptime (if needed)
