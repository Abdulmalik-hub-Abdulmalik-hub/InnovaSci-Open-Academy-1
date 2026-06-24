import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Helper function to create Supabase admin client (service role - bypasses RLS)
const createSupabaseAdminClient = () => {
  return createServerClient(
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
}

// Helper function to get user role from profiles table
const getUserRole = async (userId: string): Promise<string | null> => {
  try {
    const supabaseAdmin = createSupabaseAdminClient()
    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()
    
    if (error || !profile) {
      console.error('Profile query error:', error?.message)
      return null
    }
    
    console.log('Role fetched from DB - UserID:', userId, 'Role:', profile.role)
    return profile.role
  } catch (err) {
    console.error('Profile query exception:', err)
    return null
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  console.log('\n=== MIDDLEWARE REQUEST ===')
  console.log('Path:', pathname)

  // Create response object
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Initialize Supabase client for session
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
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Get current session
  const { data: { session } } = await supabase.auth.getSession()
  const isAuthenticated = !!session
  const userId = session?.user?.id || null

  console.log('Authenticated:', isAuthenticated, 'UserID:', userId)

  // Route flags
  const isAdminRoute = pathname.startsWith('/admin')
  const isAuthRoute = pathname.startsWith('/auth/')
  const isRootRoute = pathname === '/'
  const isProtectedRoute = pathname.startsWith('/dashboard')

  // ============================================
  // STEP 1: Authentication Check for Protected Routes
  // ============================================
  if (isProtectedRoute && !isAuthenticated) {
    console.log('DECISION: Protected route, not authenticated -> /auth/login')
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ============================================
  // STEP 2: Admin Route - Allow SUPER_ADMIN, redirect others
  // ============================================
  if (isAdminRoute && isAuthenticated && userId) {
    const userRole = await getUserRole(userId)
    
    console.log('Admin route check - Path:', pathname)
    console.log('User Role:', userRole)
    
    if (userRole === 'SUPER_ADMIN') {
      console.log('DECISION: SUPER_ADMIN accessing /admin -> ALLOW')
      return response // Allow access
    } else {
      console.log('DECISION: Not SUPER_ADMIN -> /dashboard')
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // ============================================
  // STEP 3: Auth Routes - Skip redirects for normal auth pages
  // Only redirect if accessing login/register while authenticated
  // ============================================
  if (isAuthRoute) {
    if (isAuthenticated && userId && (pathname === '/auth/login' || pathname === '/auth/register')) {
      const userRole = await getUserRole(userId)
      console.log('DECISION: Auth route while authenticated - Role:', userRole)
      
      if (userRole === 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      // Don't redirect authenticated users from login page - let them stay
      console.log('DECISION: Staying on auth page')
      return response
    }
    // For other auth routes, just continue
    console.log('DECISION: Auth route, continuing...')
    return response
  }

  // ============================================
  // STEP 4: Root Route - Redirect to appropriate dashboard
  // ============================================
  if (isRootRoute && isAuthenticated && userId) {
    const userRole = await getUserRole(userId)
    
    console.log('Root route check - Role:', userRole)
    
    if (userRole === 'SUPER_ADMIN') {
      console.log('DECISION: SUPER_ADMIN on / -> /admin')
      return NextResponse.redirect(new URL('/admin', request.url))
    } else {
      console.log('DECISION: Non-admin on / -> /dashboard')
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // ============================================
  // DEFAULT: Allow all other requests
  // ============================================
  console.log('DECISION: No rules matched -> Allow')
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}
