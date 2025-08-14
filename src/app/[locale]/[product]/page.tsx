import ProductPageClient from "./ProductPageClient";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}) {
  const { locale, product } = await params;

  return <ProductPageClient locale={locale} productId={product} />;
}
