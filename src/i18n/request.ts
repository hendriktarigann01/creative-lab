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
  const about = (await import(`@/data/${locale}/about.json`)).default;
  const services = (await import(`@/data/${locale}/services.json`)).default;
  const servicesDetail = (await import(`@/data/${locale}/services-detail.json`)).default;
  const portfolioDetail = (await import(`@/data/${locale}/portfolio-detail.json`)).default;
  const metadata = (await import(`@/data/${locale}/metadata.json`)).default;

  const messages = {
    ...common,
    about: {
      ...common.about,
      ...about,
    },
    services: {
      ...common.services,
      ...services,
    },
    'services-detail': servicesDetail,
    'portfolio-detail': portfolioDetail,
    metadata,
  };

  return {
    locale,
    messages,
  };
});
