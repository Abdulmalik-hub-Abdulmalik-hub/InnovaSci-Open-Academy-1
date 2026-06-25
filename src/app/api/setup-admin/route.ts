import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  
  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Create admin client with service role key
  const adminSupabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get() { return undefined },
        set() {},
        remove() {},
      },
    }
  )

  const adminEmail = 'admin@innovasci.com'
  const adminPassword = 'Admin@123'
  const adminName = 'Admin User'

  try {
    // Check if admin user already exists
    const { data: existingUsers } = await adminSupabase.auth.admin.listUsers()
    const existingAdmin = existingUsers?.users.find(u => u.email === adminEmail)

    if (existingAdmin) {
      // Update existing admin role
      const { data: profile } = await adminSupabase
        .from('profiles')
        .select('*')
        .eq('id', existingAdmin.id)
        .single()

      if (profile) {
        await adminSupabase
          .from('profiles')
          .update({ role: 'SUPER_ADMIN' })
          .eq('id', existingAdmin.id)
      } else {
        await adminSupabase
          .from('profiles')
          .insert({
            id: existingAdmin.id,
            full_name: adminName,
            email: adminEmail,
            role: 'SUPER_ADMIN'
          })
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Admin user updated successfully',
        user: { id: existingAdmin.id, email: adminEmail, role: 'SUPER_ADMIN' }
      })
    }

    // Create new admin user
    const { data: newUser, error: createError } = await adminSupabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        full_name: adminName
      }
    })

    if (createError) {
      return NextResponse.json({ 
        success: false, 
        error: createError.message 
      }, { status: 500 })
    }

    if (newUser.user) {
      // Create profile with SUPER_ADMIN role
      await adminSupabase
        .from('profiles')
        .insert({
          id: newUser.user.id,
          full_name: adminName,
          email: adminEmail,
          role: 'SUPER_ADMIN'
        })

      return NextResponse.json({ 
        success: true, 
        message: 'Admin user created successfully',
        user: { id: newUser.user.id, email: adminEmail, role: 'SUPER_ADMIN' }
      })
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create user' 
    }, { status: 500 })

  } catch (error: any) {
    console.error('Setup admin error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}

// Also allow GET for easy testing
export async function GET(request: NextRequest) {
  return POST(request)
}
