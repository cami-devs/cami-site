import type { GalleryPhoto } from './types'

/**
 * Every image in src/assets/photos/ becomes a tessellation cell — drop a file
 * in or delete one and the panel re-tiles itself, no code change needed.
 *
 * These live in src/assets/ rather than public/ on purpose: Vite copies
 * public/ verbatim *and* would emit a hashed copy for each glob import,
 * shipping every photo twice. From src/assets/ each file is bundled once,
 * content-hashed and cache-busted.
 */
const imageModules = import.meta.glob<string>(
  '/src/assets/photos/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP}',
  { eager: true, query: '?url', import: 'default' },
)

/** "nueva_grad.jpeg" -> "nueva grad" */
function describe(path: string): string {
  const file = path.split('/').pop() ?? path
  return file.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ')
}

// glob keys come back sorted, so cell order stays stable between builds
export const photos: GalleryPhoto[] = Object.entries(imageModules).map(([path, src]) => ({
  src,
  alt: describe(path),
}))
