# Banking App - Deployment Guide

This guide provides multiple options to deploy your Banking App live to the internet.

## 🚀 Quick Deployment Options

### Option 1: Railway (Recommended - Easiest & Free)

**Railway** offers free tier with automatic deployments from Git.

#### Steps:
1. **Create a GitHub repository** and push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app/)
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Spring Boot and deploy!
   - Your app will be live at: `https://your-app.up.railway.app`

3. **Add MySQL Database (Optional):**
   - In Railway dashboard, click "New" → "Database" → "MySQL"
   - Railway will auto-inject database credentials
   - Update `application.yaml` to use environment variables

**Cost:** FREE (500 hours/month)

---

### Option 2: Render (Free Tier Available)

#### Steps:
1. **Push code to GitHub** (same as above)

2. **Deploy on Render:**
   - Go to [render.com](https://render.com/)
   - Sign up and click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Build Command:** `./mvnw clean package -DskipTests`
     - **Start Command:** `java -jar target/banking-app-0.0.1-SNAPSHOT.jar`
   - Click "Create Web Service"
   - Your app will be live at: `https://your-app.onrender.com`

**Cost:** FREE (with limitations - sleeps after 15 min of inactivity)

---

### Option 3: Heroku

#### Steps:
1. **Install Heroku CLI:**
   ```bash
   winget install Heroku.HerokuCLI
   ```

2. **Login and Create App:**
   ```bash
   heroku login
   heroku create banking-app-yourname
   ```

3. **Add Procfile** to project root:
   ```
   web: java -jar target/banking-app-0.0.1-SNAPSHOT.jar
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

5. **Open App:**
   ```bash
   heroku open
   ```

**Cost:** $5/month (Eco Dyno)

---

### Option 4: AWS Elastic Beanstalk

#### Steps:
1. **Install AWS CLI and EB CLI:**
   ```bash
   winget install Amazon.AWSCLI
   pip install awsebcli
   ```

2. **Package Application:**
   ```bash
   mvnw clean package -DskipTests
   ```

3. **Initialize and Deploy:**
   ```bash
   eb init -p java-21 banking-app
   eb create banking-app-env
   eb open
   ```

**Cost:** ~$20/month (t2.micro instance)

---

### Option 5: Azure App Service

#### Steps:
1. **Install Azure CLI:**
   ```bash
   winget install Microsoft.AzureCLI
   ```

2. **Login and Create App:**
   ```bash
   az login
   az group create --name banking-app-rg --location eastus
   az appservice plan create --name banking-app-plan --resource-group banking-app-rg --sku B1 --is-linux
   az webapp create --name banking-app-yourname --resource-group banking-app-rg --plan banking-app-plan --runtime "JAVA:21-java21"
   ```

3. **Deploy:**
   ```bash
   az webapp deploy --resource-group banking-app-rg --name banking-app-yourname --src-path target/banking-app-0.0.1-SNAPSHOT.jar --type jar
   ```

**Cost:** ~$13/month (B1 tier)

---

### Option 6: Docker + Any Cloud Provider

#### Create Dockerfile:
```dockerfile
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY target/banking-app-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

#### Build and Run:
```bash
docker build -t banking-app .
docker run -p 8080:8080 banking-app
```

Deploy this container to:
- **Google Cloud Run** (Free tier: 2M requests/month)
- **AWS ECS/Fargate**
- **Azure Container Instances**
- **DigitalOcean App Platform** ($5/month)

---

## 🗄️ Database Configuration for Production

For production, you'll need a real database instead of H2.

### Using Railway MySQL:
```yaml
spring:
  datasource:
    url: ${DATABASE_URL}  # Railway provides this
    username: ${DB_USER}
    password: ${DB_PASSWORD}
```

### Using Cloud Databases:
- **PlanetScale** (Free tier available)
- **AWS RDS MySQL** (~$15/month)
- **Azure Database for MySQL** (~$20/month)
- **Google Cloud SQL** (~$10/month)

---

## 🔒 Production Checklist

Before deploying to production:

1. **Update application.yaml:**
   ```yaml
   server:
     port: ${PORT:8080}
   
   spring:
     datasource:
       url: ${DATABASE_URL:jdbc:h2:mem:bankingdb}
       username: ${DB_USER:sa}
       password: ${DB_PASSWORD:}
   ```

2. **Add environment variables:**
   - `PORT` (for Heroku/Railway)
   - `DATABASE_URL`
   - `DB_USER`
   - `DB_PASSWORD`

3. **Security Enhancements:**
   - Add HTTPS/SSL certificate
   - Enable CORS only for your domain
   - Add authentication (Spring Security)
   - Use environment variables for sensitive data

4. **Performance:**
   - Enable connection pooling
   - Add caching (Redis)
   - Configure logging levels

---

## 🌐 Custom Domain

After deployment, you can add a custom domain:

### Railway/Render/Heroku:
1. Go to Settings → Custom Domain
2. Add your domain (e.g., `banking.yourdomain.com`)
3. Update DNS records at your domain registrar:
   - Add CNAME record pointing to provided URL

### Namecheap/GoDaddy DNS Example:
```
Type: CNAME
Host: banking
Value: your-app.up.railway.app
TTL: Automatic
```

---

## 📊 Monitoring & Logs

### View Logs:
- **Railway:** Click on your service → "Logs" tab
- **Render:** Dashboard → "Logs"
- **Heroku:** `heroku logs --tail`
- **AWS:** CloudWatch
- **Azure:** Application Insights

---

## 🎉 Recommended: Railway Deployment (Fastest)

**For beginners, Railway is the easiest:**

1. Push to GitHub
2. Connect Railway to GitHub
3. Deploy in 1 click
4. Get live URL instantly!

**Your app will be live at:** `https://banking-app-production.up.railway.app`

---

## 💡 Next Steps After Deployment

1. Test all features on live URL
2. Share the link with others
3. Add authentication for security
4. Monitor usage and performance
5. Set up automatic backups for database

---

## 🆘 Need Help?

- Railway Docs: https://docs.railway.app/
- Render Docs: https://render.com/docs
- Heroku Docs: https://devcenter.heroku.com/
- Spring Boot Deployment: https://spring.io/guides/gs/spring-boot/

---

**Congratulations! Your Banking App is ready to go live! 🚀**
