import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async () => {
  const locale = "en" // Default locale, will be overridden by client

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
