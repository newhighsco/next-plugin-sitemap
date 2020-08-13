const { createWriteStream } = require('fs')
const { SitemapStream } = require('sitemap')
const { join } = require('path')
const normalizeUrl = require('normalize-url')

module.exports = (nextConfig = {}) => async (...args) => {
  const { sitemap = {} } = nextConfig
  const [defaultPathMap, { dev, outDir }] = args
  const customMapPath = nextConfig.exportPathMap
    ? await nextConfig.exportPathMap(...args)
    : defaultPathMap

  if (!dev && sitemap && sitemap.hostname) {
    const { filename, hostname, ignorePaths = [] } = sitemap
    const pathMap = Object.assign({}, customMapPath)

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

  return nextConfig.exportPathMap
    ? nextConfig.exportPathMap(...args)
    : defaultPathMap
}
