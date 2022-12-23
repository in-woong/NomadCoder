import { getIronSession } from 'iron-session/edge';
import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from 'next/server';

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  if (userAgent(req).isBot) {
    //
  }
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: 'carrotsession',
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV! === 'production', // if you are using https
    },
  });

  if (!session.user && !req.url.includes('/enter')) {
    req.nextUrl.searchParams.set('from', req.nextUrl.pathname);
    req.nextUrl.pathname = '/enter';
    return NextResponse.redirect(req.nextUrl);
  }
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};
