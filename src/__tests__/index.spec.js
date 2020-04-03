import withSitemap from '../index'

const hostname = 'https://test.com/'
const ignorePaths = ['foo', 'bar']

describe('withSitemap', () => {
  it('should return exportPathMap', () => {
    const nextConfig = withSitemap()

    expect(typeof nextConfig.exportPathMap).toEqual('function')
  })

  it('should set default options', () => {
    const nextConfig = withSitemap()

    expect(nextConfig.sitemap.hostname).toEqual(undefined)
    expect(nextConfig.sitemap.ignorePaths).toEqual(['/404', '/index'])
    expect(nextConfig.sitemap.filename).toEqual('sitemap.xml')
  })

  it('should override default options', () => {
    const nextConfig = withSitemap({
      sitemap: { hostname, ignorePaths, filename: 'overridden.xml' }
    })

    expect(nextConfig.sitemap.hostname).toEqual('https://test.com/')
    expect(nextConfig.sitemap.ignorePaths).toEqual([
      '/404',
      '/index',
      'foo',
      'bar'
    ])
    expect(nextConfig.sitemap.filename).toEqual('overridden.xml')
  })
})
