import { createWriteStream } from 'fs'
import { SitemapStream } from 'sitemap'
import exportSitemap from '../export'

jest.mock('fs')
jest.mock('sitemap')

const defaultPathMap = { foo: {}, bar: {} }
const exportPathMap = jest.fn(() => ({ fizz: {}, buzz: {}, foo: {}, bar: {} }))
const options = {
  dev: true,
  outDir: 'out'
}
const sitemap = {
  filename: 'sitemap.xml',
  hostname: 'test.com/'
}

describe('exportSitemap', () => {
  it('should return defaultPathMap', async () => {
    const exporter = exportSitemap()
    const pathMap = await exporter(defaultPathMap, options)

    expect(pathMap).toEqual({ foo: {}, bar: {} })
    expect(createWriteStream).not.toBeCalled()
    expect(SitemapStream).not.toBeCalled()
  })

  it('should not generate sitemap.xml if all paths are ignore', async () => {
    const nextConfig = {
      sitemap: {
        ...sitemap,
        ignorePaths: ['foo', 'bar']
      }
    }

    const exporter = exportSitemap(nextConfig)
    const pathMap = await exporter(defaultPathMap, {
      ...options,
      dev: false
    })

    expect(pathMap).toEqual({ foo: {}, bar: {} })
    expect(createWriteStream).not.toBeCalled()
    expect(SitemapStream).not.toBeCalled()
  })

  it('should generate sitemap.xml', async () => {
    const nextConfig = {
      sitemap,
      exportPathMap
    }

    const exporter = exportSitemap(nextConfig)

    const pathMap = await exporter(defaultPathMap, {
      ...options,
      dev: false
    })

    expect(pathMap).toEqual({ fizz: {}, buzz: {}, foo: {}, bar: {} })
    expect(createWriteStream).toBeCalledWith('out/sitemap.xml')
    expect(SitemapStream).toBeCalledWith({ hostname: 'http://test.com' })
    expect(SitemapStream.mock.instances[0].write).toBeCalledTimes(4)
    expect(SitemapStream.mock.instances[0].write.mock.calls[0]).toEqual([
      { url: 'fizz' }
    ])
    expect(SitemapStream.mock.instances[0].write.mock.calls[1]).toEqual([
      { url: 'buzz' }
    ])
    expect(SitemapStream.mock.instances[0].write.mock.calls[2]).toEqual([
      { url: 'foo' }
    ])
    expect(SitemapStream.mock.instances[0].write.mock.calls[3]).toEqual([
      { url: 'bar' }
    ])
    expect(nextConfig.exportPathMap).toBeCalledWith(defaultPathMap, {
      ...options,
      dev: false
    })
  })
})
