const { createWriteStream } = require('fs')
const { SitemapStream } = require('sitemap')
const { join } = require('path')
const normalizeUrl = require('normalize-url')

module.exports = (nextConfig = {}) => async (...args) => {
  const { sitemap = {} } = nextConfig
  const [defaultPathMap, { dev, outDir }] = args

  if (!dev && sitemap && sitemap.hostname) {
    const { filename, hostname, ignorePaths = [] } = sitemap
    const pathMap = Object.assign({}, defaultPathMap)

    ignorePaths.map(path => delete pathMap[path])

    const paths = Object.keys(pathMap)

    if (paths.length) {
      const sitemap = new SitemapStream({
        hostname: normalizeUrl(hostname)
      })
      const writeStream = createWriteStream(join(outDir, filename))

      sitemap.pipe(writeStream)

      paths.map(path => sitemap.write({ url: path }))

      sitemap.end()
    }
  }

  if (typeof nextConfig.exportPathMap === 'function') {
    return nextConfig.exportPathMap(...args)
  }

  return defaultPathMap
}
