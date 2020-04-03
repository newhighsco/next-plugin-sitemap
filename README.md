# next-plugin-sitemap [![NPM version](https://img.shields.io/npm/v/@newhighsco/next-plugin-sitemap.svg)](https://www.npmjs.com/package/@newhighsco/next-plugin-sitemap)

[Next.js](https://nextjs.org/) plugin for generating an XML sitemap during `next export`

## Installation

Install Next.js and `@newhighsco/next-plugin-sitemap`:

```
npm install --save next @newhighsco/next-plugin-sitemap
```

## Usage

Create a `next.config.js` in your project:

```js
// next.config.js
const withSitemap = require('@newhighsco/next-plugin-sitemap')
module.exports = withSitemap()
```

Optionally you can add your custom Next.js configuration as a parameter:

```js
// next.config.js
const withSitemap = require('@newhighsco/next-plugin-sitemap')

const nextConfig = {
  ...
}

module.exports = withSitemap(nextConfig)
```

## Options

### filename

### hostname

### ignore

## [CHANGELOG](CHANGELOG.md)
