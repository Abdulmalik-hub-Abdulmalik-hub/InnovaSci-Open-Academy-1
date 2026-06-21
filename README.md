# InnovaSci Open Academy

A world-class, enterprise-grade Learning Management System (LMS) platform for scientific and technological education. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

### Public-Facing Pages
- **Landing Page** - Modern hero section, course catalog, learning paths, testimonials
- **Course Catalog** - Searchable, filterable course listings
- **Course Detail Pages** - Full course information, syllabus, instructor details
- **Learning Paths** - Structured learning journeys
- **Certificate Verification** - Public verification page
- **Authentication** - Login, Register, Password Reset

### Student Dashboard
- **Personal Profile Management** - Avatar, bio, social links
- **Course Progress Tracking** - Visual progress bars, lesson completion
- **Certificate Management** - View, download earned certificates
- **Wishlist** - Save courses for later
- **Notifications** - Real-time notifications
- **Account Settings** - Security, preferences

### Admin Dashboard
- **User Management** - View, edit, suspend users
- **Course Management** - Create, edit, publish, archive courses
- **Video Management** - Upload and organize video content
- **Certificate Management** - Templates, generation, verification
- **Pricing & Plans** - Subscription and payment management
- **Newsletter System** - Email campaigns, subscriber management
- **Storage Manager** - File management, bandwidth tracking
- **Analytics Dashboard** - Real-time metrics, charts, reports
- **Database Explorer** - View and manage database records
- **Roles & Permissions** - RBAC system
- **Audit Logs** - Track all system actions
- **Support Center** - Help desk functionality
- **System Settings** - Platform configuration

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **ShadCN UI** - High-quality UI components
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible primitives

### Backend
- **Supabase** - Database, Auth, Storage
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Relational database

### Integrations
- **Stripe** - Payment processing
- **Resend** - Email delivery
- **Vercel** - Deployment

## 📁 Project Structure

```
/workspace/project
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── (public)/           # Public pages (landing, courses, etc.)
│   │   ├── (protected)/        # Protected student dashboard
│   │   ├── (admin)/            # Admin dashboard
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── ui/                 # ShadCN UI components
│   │   ├── layout/             # Navigation, Footer
│   │   ├── landing/            # Landing page sections
│   │   ├── course/             # Course-related components
│   │   ├── dashboard/          # Student dashboard components
│   │   └── admin/              # Admin components
│   ├── lib/                    # Utilities, Supabase clients
│   ├── hooks/                  # Custom React hooks
│   ├── store/                  # Zustand state management
│   └── types/                  # TypeScript definitions
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.sql               # Initial data
├── public/                    # Static assets
└── *.config.*                 # Configuration files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (for payments)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Abdulmalik-hub-Abdulmalik-hub/InnovaSci-Open-Academy-.git
cd InnovaSci-Open-Academy-
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your Supabase and Stripe credentials
```

4. Set up the database:
```bash
npm run db:generate
npm run db:push
# Or run the seed script manually
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Database Schema

The platform uses a comprehensive PostgreSQL schema with:

- **Users & Auth** - Supabase Auth with profile extensions
- **RBAC** - Roles and permissions system
- **Courses** - Full course management
- **Enrollments** - Student enrollments and progress
- **Certificates** - Digital certificate generation
- **Payments** - Stripe integration
- **Newsletter** - Email marketing
- **Analytics** - Event tracking
- **Audit Logs** - Security logging

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Purple | `#9333ea` | Primary brand, innovation |
| Blue | `#2563eb` | Secondary, trust, AI |
| Teal | `#0d9488` | Accent, science, research |
| Dark | `#0f172a` | Text, dark theme |

## 📱 Accessibility

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Proper color contrast
- Focus indicators

## 🔒 Security

- Row Level Security (RLS) on all tables
- Role-based access control
- JWT authentication
- CSRF protection
- Input validation with Zod
- Secure password hashing

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```bash
docker build -t innovasci-academy .
docker run -p 3000:3000 innovasci-academy
```

## 📄 License

This project is proprietary software. All rights reserved.

## 🤝 Contributing

This is a private project. Please contact the repository owner for collaboration opportunities.

---

**Powered by InnovaSci AI Labs**
*Democratizing high-quality scientific and technological education through open-access learning.*