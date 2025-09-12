import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: ["/account/", "/checkout/", "/en/account/", "/en/checkout"],
      allow: ["/", "/events/", "/privacy", "/en/privacy", "*/events/*"],
    },
    sitemap: "https://www.portal.mn/sitemap.xml",
  };
}
