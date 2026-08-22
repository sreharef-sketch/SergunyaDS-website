import { readFileSync } from 'node:fs';

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  // details: string[];
  patreonUrl: string;
  preview?: string;
  previews: string[];
  alt: string;
}

export interface GalleryItem {
  id: string;
  image?: string;
  alt: string;
  date: string;
  featured: boolean;
  caption?: string;
  ratio: string;
}

type RecordMap = Record<string, Record<string, string>>;

function parseIni(source: string): RecordMap {
  const sections: RecordMap = {};
  let section = '';

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith(';') || line.startsWith('#')) continue;
    const header = line.match(/^\[([^\]]+)]$/);
    if (header) {
      section = header[1];
      sections[section] ??= {};
      continue;
    }
    const equals = line.indexOf('=');
    if (equals === -1 || !section) continue;
    sections[section][line.slice(0, equals).trim()] = line.slice(equals + 1).trim();
  }
  return sections;
}

const configs = import.meta.glob('/config.ini', {
  eager: true,
  query: '?raw',
  import: 'default',
});
const raw = configs['/config.ini'];
const config = parseIni(raw);
const list = (value = '') => value.split('|').map((entry) => entry.trim()).filter(Boolean);

export const site = config.site;
export const links = config.links;
export const info = config.info;

export const products: Product[] = Object.entries(config)
  .filter(([key]) => key.startsWith('product.'))
  .map(([key, value]) => ({
    id: key.replace('product.', ''),
    name: value.name,
    price: value.price_usd,
    description: value.description,
    // details: list(value.details),
    patreonUrl: value.patreon_url,
    preview: value.preview || undefined,
    previews: list(value.previews || value.image),
    alt: value.alt,
  }));

export const gallery: GalleryItem[] = Object.entries(config)
  .filter(([key]) => key.startsWith('gallery.'))
  .map(([key, value]) => ({
    id: key.replace('gallery.', ''),
    image: value.image || undefined,
    alt: value.alt,
    date: value.date,
    featured: value.featured === 'true',
    caption: value.caption || undefined,
    ratio: value.ratio || 'square',
  }))
  .sort((a, b) => Number(b.featured) - Number(a.featured) || b.date.localeCompare(a.date));
