# Email Management System

A comprehensive email management system built with Next.js, Prisma, and SQLite. Features multi-account email management, real-time fetching, and a modern responsive interface.

## Features

- **Multi-Account Management**: Manage multiple email accounts from a single interface
- **Real-time Email Fetching**: Automatic email refresh every 8 seconds
- **Smart Caching**: Efficient caching system to minimize server requests
- **Email Composition**: Compose and send emails with rich text support
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Built-in Accounts**: Comes pre-configured with 8 email accounts

## Built-in Email Accounts

The system includes these pre-configured email accounts:
- Steven@HH.email.cn
- 18@HH.email.cn
- 168@HH.email.cn
- 1688@HH.email.cn
- BOSS@HH.email.cn
- support@HH.email.cn
- 99@HH.email.cn
- 520@HH.email.cn

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Database**: SQLite with Prisma ORM
- **Email Processing**: IMAP/SMTP with nodemailer
- **Real-time**: Socket.IO for live updates
- **Deployment**: Ready for Render deployment

## Quick Start

### Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Production Deployment

#### Render Deployment (Recommended)

1. Push your code to GitHub
2. Go to [Render.com](https://render.com)
3. Create a new Web Service
4. Use the following configuration:
   - **Build Command**: `npm run render-build`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV=production`
     - `DATABASE_URL=file:/tmp/custom.db`
   - **Disk**: Mount `/tmp` with 1GB storage

5. Deploy and enjoy!

#### Manual Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── page.tsx      # Main application page
│   └── layout.tsx    # Root layout
├── components/
│   └── ui/           # shadcn/ui components
└── lib/
    ├── db.ts         # Database configuration
    ├── cache.ts      # Email caching system
    ├── email-service.ts  # Email processing
    ├── socket.ts     # Socket.IO setup
    └── init-db.ts    # Database initialization
```

## Key Features Explained

### Email Caching
- Smart caching system stores emails in memory
- Only new emails are fetched during refresh
- Prevents unnecessary server requests and re-renders

### Automatic Refresh
- Emails are automatically refreshed every 8 seconds
- Uses a combination of cache refresh and server fetching
- New emails appear without full page reload

### Responsive Design
- Mobile-first design approach
- Proper overflow handling for email content
- Touch-friendly interface elements

### Performance Optimizations
- Efficient email filtering and sorting
- Optimized database queries
- Minimal re-rendering of components

## Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npm run db:push      # Push schema to database
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run migrations
npm run db:reset     # Reset database

# Render Deployment
npm run render-build # Build for Render deployment
```

## Environment Variables

### Development
- `DATABASE_URL`: Database connection string (defaults to `file:./db/custom.db`)

### Production
- `NODE_ENV`: Set to `production`
- `DATABASE_URL`: Set to `file:/tmp/custom.db` for Render

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure the database file exists
   - Check file permissions
   - Verify the DATABASE_URL environment variable

2. **Email Fetching Issues**
   - Check email server connectivity
   - Verify email credentials
   - Check IMAP/SMTP server settings

3. **Build Errors**
   - Ensure all dependencies are installed
   - Check TypeScript configuration
   - Verify Prisma schema

### Performance Issues

1. **Slow Email Loading**
   - Check database indexes
   - Verify caching configuration
   - Monitor server resources

2. **High Memory Usage**
   - Check for memory leaks
   - Verify cache cleanup
   - Monitor email storage size

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Check the troubleshooting section
- Review the deployment guide
- Create an issue on GitHub