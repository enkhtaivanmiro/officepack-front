export async function fetchData<T = any>(uri: string, searchParams?: Record<string, string | number | boolean>): Promise<T> {
  const url = new URL(uri, process.env.NEXT_PUBLIC_API_URL);

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const res = await fetch(url.toString(), {
    cache: 'force-cache',
    next: { revalidate: 604800 },
    headers: {
      merchant: 'portal',
    },
  });

  if (!res.ok) throw new Error(`Fetch failed: ${res.statusText}`);

  return res.json() as T;
}
