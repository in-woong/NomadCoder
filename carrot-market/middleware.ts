import { getIronSession } from 'iron-session/edge';
import {
  NextFetchEvent,
  NextRequest,
  NextResponse,
  userAgent,
} from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (userAgent(req).isBot) {
    return NextResponse.json(
      { message: "Plz don't be a bot. Be human." },
      { status: 403 }
    );
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
}

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
