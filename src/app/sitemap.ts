import { MetadataRoute } from 'next';

const lastModified = new Date();

const domain = 'https://www.portal.mn';

const events = [
  'mens-night-2025-05-01',
  'ineed-belegleye-2025-05-02',
  'ineed-belegleye-2025-05-02-d4d3',
  'mesa',
  'saturday-night-2025-05-03',
  'alsou',
  'guys',
  'wake-up-2025',
  'camerton',
  'in-da-khuree',
  'art-n-tech-festival-of-nomads',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: domain,
      lastModified,
      priority: 1,
    },
    {
      url: `${domain}/events`,
      lastModified,
      priority: 0.8,
    },
    {
      url: `${domain}/privacy`,
      lastModified,
      priority: 1,
    },
    {
      url: `${domain}/en/privacy`,
      lastModified,
      priority: 1,
    },
    {
      url: `${domain}/camerton`,
      lastModified,
      priority: 0.8,
    },
    ...events.map((id) => ({
      url: `${domain}/events/${id}`,
      lastModified,
      priority: 0.6,
    })),
  ];
}
