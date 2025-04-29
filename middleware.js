import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  //Verificando la existencia del token ante el acceso
  if (!token && request.nextUrl.pathname.startsWith("/src")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Mis rutas protegidas
export const config = {
  matcher: ["/src/:path*"], // Protege todo lo que esté debajo de /src
};
