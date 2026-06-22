# InnovaSci Open Academy - Supabase Schema

## Overview

This directory contains the complete database schema for InnovaSci Open Academy, built on Supabase (PostgreSQL). The schema is designed for a modern LMS (Learning Management System) with robust security and role-based access control.

## Quick Start

### 1. Create Super Admin Account in Supabase Auth

Before running the schema, create the super admin user:

1. Go to **Supabase Dashboard** → **Authentication** → **Users**
2. Click **"Add User"**
3. Enter the following credentials:
   - **Email:** `superadmin@gmail.com`
   - **Password:** `Ummuhani123/`
4. Click **"Create User"**

### 2. Run the Schema

In Supabase Dashboard:

1. Go to **SQL Editor**
2. Copy and paste the contents of `schema.sql`
3. Click **"Run"**

The schema will:
- Create all tables with proper relationships
- Set up Row Level Security (RLS) policies
- Create indexes for performance
- Set up triggers for automatic timestamps
- Create a profile automatically when users sign up
- Seed default data

## Schema Structure

### Core Tables

| Table | Description |
|-------|-------------|
| `profiles` | User profiles extending auth.users |
| `courses` | Course information and metadata |
| `lessons` | Individual lessons within courses |
| `videos` | Video content for lessons |
| `materials` | PDFs, slides, and other resources |
| `enrollments` | User course enrollments |
| `learning_progress` | Track user progress through lessons |
| `certificates` | Issued certificates |
| `learning_paths` | Curated learning paths |
| `payments` | Payment transactions |
| `notifications` | User notifications |

### Roles

| Role | Access Level |
|------|-------------|
| `SUPER_ADMIN` | Full system access |
| `STUDENT` | Access to own courses and profile |

## Security Features

### Row Level Security (RLS)

All tables have RLS enabled with policies that:
- Allow users to view published content (courses, learning paths)
- Restrict access to enrolled content (lessons, materials)
- Allow users to manage only their own data (enrollments, progress, certificates)
- Give Super Admins full access to all data

### Helper Functions

```sql
-- Check if user is Super Admin
SELECT is_super_admin(auth.uid());

-- Check if user is enrolled in a course
SELECT is_enrolled(auth.uid(), 'course-uuid');
```

## Super Admin Dashboard

The Super Admin can access the admin dashboard at `/admin` and manage:
- All users and their roles
- All courses (create, edit, publish, archive)
- All learning paths
- All enrollments
- All payments and subscriptions
- Newsletter campaigns
- System settings

## Sample Data

The schema includes sample data:
- A sample learning path: "Data Science Fundamentals"
- A sample course: "Introduction to Python Programming"
- A sample lesson

To remove sample data, delete the INSERT statements at the bottom of `schema.sql` before running.

## Environment Variables

Make sure your `.env.local` file includes:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Troubleshooting

### "Profile not found" error

Make sure you've created the auth user first, then run the schema. The trigger will automatically create a profile when a new user signs up.

### RLS Policy errors

If you encounter RLS errors:
1. Make sure the user is authenticated
2. Check that the profile exists in the profiles table
3. For admin operations, ensure the user's role is set to 'SUPER_ADMIN'

## Next Steps

1. Run the schema in Supabase
2. Create the super admin user
3. Update the super admin profile role if needed:
   ```sql
   UPDATE profiles SET role = 'SUPER_ADMIN' WHERE email = 'superadmin@gmail.com';
   ```
4. Access the admin dashboard and start creating courses!
