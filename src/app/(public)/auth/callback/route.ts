import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  // Create response object
  const response = NextResponse.redirect(`${origin}${next}`)

  // Create Supabase client with proper cookie handling
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

  // If there's a code (OAuth flow), exchange it for a session
  if (code) {
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && session) {
      try {
        // Fetch user role and redirect accordingly
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        // Determine redirect based on role
        const redirectPath = profile?.role === 'SUPER_ADMIN' ? '/admin' : '/dashboard'
        return NextResponse.redirect(`${origin}${redirectPath}`)
      } catch (err) {
        console.error('Callback profile query error:', err)
        // Fallback to dashboard on error
        return NextResponse.redirect(`${origin}/dashboard`)
      }
    }
  } else {
    // No code - this is a direct redirect after login
    // Check if user is already authenticated
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
      try {
        // Fetch user role and redirect accordingly
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        // Determine redirect based on role
        const redirectPath = profile?.role === 'SUPER_ADMIN' ? '/admin' : '/dashboard'
        return NextResponse.redirect(`${origin}${redirectPath}`)
      } catch (err) {
        console.error('Callback profile query error:', err)
        return NextResponse.redirect(`${origin}/dashboard`)
      }
    }
  }

  // Redirect to login if something went wrong
  return NextResponse.redirect(`${origin}/auth/login?error=callback_error`)
}
