import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    locale = routing.defaultLocale;
  }

  const common = (await import(`@/data/${locale}/common.json`)).default;
  const servicesDetail = (await import(`@/data/${locale}/services-detail.json`)).default;
  const portfolioDetail = (await import(`@/data/${locale}/portfolio-detail.json`)).default;
  const productDetail = (await import(`@/data/${locale}/product-detail.json`)).default;
  const metadata = (await import(`@/data/${locale}/metadata.json`)).default;

  const messages = {
    ...common,
    'services-detail': servicesDetail,
    'portfolio-detail': portfolioDetail,
    'product-detail': productDetail,
    metadata,
  };

  return {
    locale,
    messages,
  };
});
