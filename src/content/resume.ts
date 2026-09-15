/**
 * The resume link always points at whatever single PDF lives in
 * src/assets/resume/ — no filename to keep in sync with the code. To
 * update the resume, just delete the old PDF from that folder and drop
 * the new one in (any filename works); Vite picks it up automatically.
 */
const files = import.meta.glob<string>('/src/assets/resume/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
})

const [resumeUrl] = Object.values(files)

export { resumeUrl }
