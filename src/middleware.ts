import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Helper function to create Supabase client
const createSupabaseServerClient = (request: NextRequest, response: NextResponse) => {
  return createServerClient(
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
}

// Helper function to get user role from profiles table
const getUserRole = async (supabase: ReturnType<typeof createServerClient>, userId: string): Promise<string | null> => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single()
    
    if (error || !profile) {
      console.error('Error fetching profile:', error)
      return null
    }
    
    return profile.role
  } catch (err) {
    console.error('Exception fetching profile:', err)
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Create response object to allow cookie modifications
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Initialize Supabase client
  const supabase = createSupabaseServerClient(request, response)

  // Get current session
  const { data: { session } } = await supabase.auth.getSession()
  
  const isAuthenticated = !!session
  const userId = session?.user?.id || null

  // Routes that are auth-related - we should NOT redirect from these
  const isAuthRoute = pathname.startsWith('/auth/')
  
  // Routes that require authentication
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
  
  // Admin-only routes
  const isAdminRoute = pathname.startsWith('/admin')
  
  // Student dashboard route
  const isStudentDashboard = pathname === '/dashboard'
  
  // Root route
  const isRootRoute = pathname === '/'

  // ============================================
  // 1. AUTHENTICATION CHECK - Protect routes that need it
  // ============================================
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login, preserving the intended destination
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ============================================
  // 2. ADMIN ROUTE PROTECTION - Only SUPER_ADMIN allowed
  // ============================================
  if (isAdminRoute && isAuthenticated && userId) {
    const userRole = await getUserRole(supabase, userId)
    
    // If user is NOT a SUPER_ADMIN, block access to all admin routes
    if (userRole !== 'SUPER_ADMIN') {
      console.log(`Access denied to ${pathname} - User role: ${userRole}`)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    // SUPER_ADMIN has full access to admin routes
    return response
  }

  // ============================================
  // 3. AUTH ROUTES - Don't interfere with login/register flows
  // ============================================
  if (isAuthRoute) {
    // If already authenticated and trying to access login/register,
    // redirect to appropriate dashboard
    if (isAuthenticated && userId && (pathname === '/auth/login' || pathname === '/auth/register')) {
      const userRole = await getUserRole(supabase, userId)
      
      if (userRole === 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    // Allow access to auth routes for non-authenticated users
    return response
  }

  // ============================================
  // 4. ROOT ROUTE - Redirect to appropriate dashboard
  // ============================================
  if (isRootRoute && isAuthenticated && userId) {
    const userRole = await getUserRole(supabase, userId)
    
    if (userRole === 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // ============================================
  // 5. STUDENT DASHBOARD - Allow admins too (they can view student dashboard)
  // ============================================
  // This is handled by the page component itself - no middleware redirect needed

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (keep API routes accessible)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}
