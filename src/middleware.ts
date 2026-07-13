import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Exclude only template slugs from middleware, so /portfolio itself is localized
  matcher: ["/((?!api|_next|_vercel|portfolio/(?:in-lite|bsp|leko|metland|tanta|karindo|yw)|.*\\..*).*)"],
};
