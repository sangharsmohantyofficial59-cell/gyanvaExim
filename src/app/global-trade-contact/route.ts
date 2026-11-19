import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const destination = request.nextUrl.clone();
  destination.pathname = "/contact";
  destination.hash = "";
  return NextResponse.redirect(destination, 301);
}
