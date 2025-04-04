import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If there's no session and the user is trying to access a protected route
  if (!session && (
    req.nextUrl.pathname.startsWith('/dashboard')
  )) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/auth';
    return NextResponse.redirect(redirectUrl);
  }

  // If there's a session and the user is trying to access auth page
  if (session && req.nextUrl.pathname === '/auth') {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return res;

    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = userData?.role === 'teacher' 
      ? '/dashboard/teacher'
      : '/dashboard/student';
    
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth'],
};