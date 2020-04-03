const exportSitemap = require('./export')

module.exports = (nextConfig = {}) => {
  const { sitemap = {} } = nextConfig
  const { ignorePaths = [], ...rest } = sitemap

  nextConfig.sitemap = {
    filename: 'sitemap.xml',
    ignorePaths: ['/404', '/index'].concat(ignorePaths),
    ...rest
  }

  return Object.assign({}, nextConfig, {
    exportPathMap: exportSitemap(nextConfig)
  })
}
