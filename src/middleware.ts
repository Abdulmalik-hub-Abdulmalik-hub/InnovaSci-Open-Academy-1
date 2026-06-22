import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/dashboard', '/admin']
// Routes that are admin-only
const adminRoutes = ['/admin']
// Public routes that should redirect to dashboard if already logged in
const publicRoutes = ['/auth/login', '/auth/register', '/']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Create response to allow modifications
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create Supabase client for server components
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Get current session
  const { data: { session } } = await supabase.auth.getSession()

  // Check if user is authenticated
  const isAuthenticated = !!session
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route))
  const isPublicRoute = publicRoutes.includes(pathname) || pathname.startsWith('/auth/')
  const isRootRoute = pathname === '/'

  // If accessing protected route without auth, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If authenticated and accessing public/auth routes, redirect to appropriate dashboard
  if (isAuthenticated && (isPublicRoute || isRootRoute)) {
    // Fetch user role from profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    // Redirect SUPER_ADMIN to admin dashboard, others to student dashboard
    if (profile?.role === 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // If accessing admin route, verify SUPER_ADMIN role
  if (isAdminRoute && isAuthenticated) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    // If not SUPER_ADMIN, redirect to student dashboard
    if (profile?.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (keep API routes accessible)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}
