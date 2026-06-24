import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const response = NextResponse.redirect(`${origin}${next}`)
    
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

    // Exchange the code for a session
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error && session) {
      // DEBUG: Log session info
      console.log('[CALLBACK DEBUG] Session user ID:', session.user.id)
      
      // Fetch user role and redirect accordingly
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      // DEBUG: Log profile query result
      console.log('[CALLBACK DEBUG] Profile query:', { profile, profileError })
      console.log('[CALLBACK DEBUG] Profile role:', profile?.role)

      // Determine redirect based on role - NOTE: Admin route is /admin, not /admin/dashboard
      const redirectPath = profile?.role === 'SUPER_ADMIN' ? '/admin' : '/dashboard'
      console.log('[CALLBACK DEBUG] Redirecting to:', redirectPath)
      
      // Redirect to appropriate dashboard based on role
      return NextResponse.redirect(`${origin}${redirectPath}`)
    }
  }

  // Redirect to login if something went wrong
  return NextResponse.redirect(`${origin}/auth/login?error=callback_error`)
}
