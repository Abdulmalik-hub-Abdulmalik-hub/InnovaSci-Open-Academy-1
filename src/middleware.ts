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
    
    if (error) {
      console.error('Profile query error:', error.message, 'Code:', error.code)
      return null
    }
    
    if (!profile) {
      console.error('Profile not found for user:', userId)
      return null
    }
    
    console.log('Role check - UserID:', userId, 'Role:', profile.role)
    return profile.role
  } catch (err) {
    console.error('Profile query exception:', err)
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

  console.log('Middleware - Path:', pathname, 'Auth:', isAuthenticated, 'UserID:', userId)

  // Routes that are auth-related
  const isAuthRoute = pathname.startsWith('/auth/')
  
  // Routes that require authentication
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/admin')
  
  // Admin-only routes
  const isAdminRoute = pathname.startsWith('/admin')
  
  // Root route
  const isRootRoute = pathname === '/'

  // ============================================
  // 1. AUTHENTICATION CHECK - Protect routes that need it
  // ============================================
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // ============================================
  // 2. ADMIN ROUTE PROTECTION - Only SUPER_ADMIN allowed
  // ============================================
  if (isAdminRoute && isAuthenticated && userId) {
    const userRole = await getUserRole(supabase, userId)
    console.log('Admin route check - Role:', userRole)
    
    // If user is NOT a SUPER_ADMIN, block access to all admin routes
    if (userRole !== 'SUPER_ADMIN') {
      console.log('Redirecting to dashboard - userRole:', userRole)
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    // SUPER_ADMIN has full access to admin routes
    console.log('SUPER_ADMIN access granted')
    return response
  }

  // ============================================
  // 3. AUTH ROUTES - Handle authenticated users on auth pages
  // ============================================
  if (isAuthRoute && isAuthenticated && userId) {
    if (pathname === '/auth/login' || pathname === '/auth/register') {
      const userRole = await getUserRole(supabase, userId)
      
      if (userRole === 'SUPER_ADMIN') {
        return NextResponse.redirect(new URL('/admin', request.url))
      }
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // ============================================
  // 4. ROOT ROUTE - Redirect authenticated users to dashboard
  // ============================================
  if (isRootRoute && isAuthenticated && userId) {
    const userRole = await getUserRole(supabase, userId)
    
    if (userRole === 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}
