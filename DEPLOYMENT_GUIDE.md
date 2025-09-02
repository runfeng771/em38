# Email Management System - Render Deployment Guide

## Overview
This is a comprehensive email management system built with Next.js, Prisma, and SQLite. The system includes default email accounts that are automatically initialized on deployment.

## Features
- Multi-email account management
- Real-time email fetching and caching
- Email composition and sending
- Automatic email refresh every 8 seconds
- Responsive design with modern UI
- Built-in email accounts for immediate use

## Default Email Accounts
The system comes pre-configured with the following email accounts:
- Steven@HH.email.cn
- 18@HH.email.cn
- 168@HH.email.cn
- 1688@HH.email.cn
- BOSS@HH.email.cn
- support@HH.email.cn
- 99@HH.email.cn
- 520@HH.email.cn

## Deployment to Render

### Method 1: Using Render Dashboard (Recommended)

1. **Create a Render Account**
   - Go to [render.com](https://render.com) and sign up
   - Verify your email address

2. **Create a New Web Service**
   - Click "New +" button
   - Select "Web Service"
   - Connect your GitHub repository or upload the code

3. **Configure the Service**
   - **Name**: email-management-system
   - **Environment**: Node
   - **Build Command**: `npm run render-build`
   - **Start Command**: `npm start`
   - **Instance Type**: Starter (free tier is sufficient)

4. **Environment Variables**
   Add the following environment variables:
   ```
   NODE_ENV=production
   DATABASE_URL=file:/tmp/custom.db
   ```

5. **Disk Configuration**
   - Add a persistent disk:
     - **Name**: tmp
     - **Mount Path**: /tmp
     - **Size**: 1GB

6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application

### Method 2: Using render.yaml (Blueprint)

1. **Push to GitHub**
   - Make sure your code is pushed to a GitHub repository
   - Include the `render.yaml` file in the root directory

2. **Create Blueprint**
   - Go to Render Dashboard
   - Click "Blueprints" in the sidebar
   - Click "New Blueprint"
   - Connect your GitHub repository
   - Select the `render.yaml` file
   - Click "Setup Blueprint"

3. **Deploy**
   - Render will automatically create and configure the service
   - The application will be deployed automatically

### Method 3: Using Docker

1. **Build Docker Image**
   ```bash
   docker build -t email-management-system .
   ```

2. **Push to Container Registry**
   ```bash
   docker tag email-management-system your-registry/email-management-system:latest
   docker push your-registry/email-management-system:latest
   ```

3. **Deploy to Render**
   - Create a new Web Service on Render
   - Select "Docker" as the environment
   - Use your container image URL
   - Configure environment variables and disk as above

## Post-Deployment Verification

### 1. Check the Application
- Open the deployed URL
- You should see the email management interface
- The default email accounts should be automatically loaded

### 2. Verify Email Accounts
- Check that all 8 default email accounts are listed
- Try refreshing emails for any account
- Verify that the email counts are displayed

### 3. Test Email Functions
- Try composing and sending a test email
- Check the email content display (should handle overflow properly)
- Verify the dropdown menus work correctly

### 4. Check Automatic Refresh
- The system should automatically refresh emails every 8 seconds
- New emails should appear without full page reload
- Check the browser console for refresh logs

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   ```
   Error: Unable to open the database file
   ```
   - Solution: Ensure the disk is properly mounted at `/tmp`
   - Check that `DATABASE_URL` is set to `file:/tmp/custom.db`

2. **Build Failures**
   ```
   Error: Cannot find module
   ```
   - Solution: Use `npm run render-build` as the build command
   - Ensure all dependencies are properly installed

3. **Port Binding Issues**
   - The application uses port 3000 by default
   - Render automatically handles port binding
   - No additional configuration needed

4. **Email Fetching Issues**
   - Check that the email servers are accessible
   - Verify the email credentials are correct
   - Check the server logs for connection errors

### Log Viewing
- Go to your Render service dashboard
- Click on the "Logs" tab
- View real-time logs and historical logs
- Check for any error messages during initialization

## Environment Variables

### Required Variables
- `NODE_ENV`: Set to `production`
- `DATABASE_URL`: Set to `file:/tmp/custom.db`

### Optional Variables
- `PORT`: Custom port (defaults to 3000)
- `HOSTNAME`: Custom hostname (defaults to 0.0.0.0)

## Performance Considerations

1. **Database Performance**
   - SQLite is used for simplicity and compatibility
   - The database is stored in `/tmp` for Render compatibility
   - Consider adding indexes for better query performance

2. **Memory Usage**
   - The system uses in-memory caching for emails
   - Automatic cleanup prevents memory leaks
   - Monitor memory usage in Render dashboard

3. **Email Fetching**
   - Emails are fetched every 8 seconds by default
   - Caching prevents unnecessary server requests
   - Only new emails are processed during refresh

## Security Considerations

1. **Email Credentials**
   - Default email accounts are hardcoded
   - Consider using environment variables for production
   - Rotate credentials regularly

2. **Database Security**
   - SQLite file is stored in `/tmp`
   - Ensure proper file permissions
   - Consider encryption for sensitive data

3. **Network Security**
   - All connections use HTTPS
   - Email connections use SSL/TLS
   - Consider adding authentication for the web interface

## Scaling

### Vertical Scaling
- Upgrade to larger instance types in Render
- Add more disk space for email storage
- Increase memory for better caching performance

### Horizontal Scaling
- Render automatically handles load balancing
- Consider using Redis for shared caching
- Implement database clustering for high availability

## Support

For issues and questions:
1. Check the Render logs first
2. Review the troubleshooting section
3. Check the GitHub repository for known issues
4. Contact support if needed

## Updates

To update the application:
1. Push changes to your GitHub repository
2. Render will automatically detect and deploy changes
3. Monitor the deployment process in the Render dashboard
4. Verify the update was successful