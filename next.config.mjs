/** @type {import('next').NextConfig} */

import { DuplicateReporterPlugin } from 'duplicate-dependencies-webpack-plugin';
import { readdirSync } from 'fs';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ANALYZE = process.env.ANALYZE;

const withNextIntl = createNextIntlPlugin();

const TARGET_APP = process.env.TARGET_APP;
const NODE_ENV = process.env.NODE_ENV;

function distDir() {
  if (NODE_ENV === 'production') return getDistDirName('build');
  return getDistDirName('.next');
}

function getDistDirName(prefix) {
  const platformName = TARGET_APP || 'default';
  return `${prefix}/${platformName}`;
}

function getReplacements(target) {
  if (!target) return [];
  const regex = new RegExp(`\.${target}\.`);
  const getFileNames = (source) =>
    readdirSync(source, { withFileTypes: true }).reduce((acc, directoryEntity) => {
      if (directoryEntity.isDirectory()) return [...acc, ...getFileNames(path.join(source, directoryEntity.name))];

      if (regex.test(directoryEntity.name)) {
        const replacement = path.join(source, directoryEntity.name.replace(`.${target}`, ''));

        return [
          ...acc,
          new webpack.NormalModuleReplacementPlugin(
            new RegExp(replacement.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
            path.join(source, directoryEntity.name),
          ),
        ];
      }
      return acc;
    }, []);
  return getFileNames(path.join(__dirname, './src'));
}

const nextConfig = {
  distDir: distDir(),
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
      preventFullImport: true,
    },
  },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );
    fileLoaderRule.exclude = /\.svg$/i;
    if (ANALYZE) {
      config.plugins.push(new DuplicateReporterPlugin());
    }

    getReplacements(TARGET_APP).forEach((replacement) => config.plugins.push(replacement));

    return config;
  },
  compress: true,
  output: 'standalone',
  reactStrictMode: false,
  poweredByHeader: false,
  transpilePackages: [],
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'huns-esport.s3.amazonaws.com',
      port: '',
    },
    {
      protocol: 'https',
      hostname: 'cdn.portal.mn',
      port: '',
    },
    {
      protocol: 'https',
      hostname: 's1.ticketm.net',
      port: '',
    },
          {
        protocol: "https",
        hostname: "d3sbph5g2uu26k.cloudfront.net",
        pathname: "/**",
      },
  ],
},

};

export default withNextIntl(nextConfig);
