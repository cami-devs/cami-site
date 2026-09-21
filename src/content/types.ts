/**
 * Shared shapes for the site's content. Each section that grows its own
 * archive (making, thoughts, …) gets a type here plus a data file next to it.
 */

/** a monospace `[label ↗]` action tag. omit `url` for a non-clickable status badge like "[coming soon]" */
export type ActionLink = {
  label: string
  url?: string
}

export type Project = {
  /** url-safe id, also the future route segment: /making/:slug */
  slug: string
  title: string
  links: ActionLink[]
  /** true to keep the entry in the data but leave it out of the homepage list */
  hidden?: boolean
}

export type WritingEntry = {
  slug: string
  title: string
  link: ActionLink
  /** true to keep the entry in the data but leave it out of the homepage list */
  hidden?: boolean
}

export type WorkExperience = {
  slug: string
  /** e.g. "Rogers Investment Advisors (Tokyo)" — location folded into the string */
  role: string
  summary: string
  link: ActionLink
  /** path into public/work/ — omitted entries just render without a photo */
  photo?: string
  /** true to keep the entry in the data but leave it out of the homepage list */
  hidden?: boolean
}

/** one cell in the homepage tessellation — bundled URL + filename-derived label */
export type GalleryPhoto = {
  src: string
  alt: string
}

/** one region of the golf course ledger */
export type CourseGroup = {
  region: string
  played: string[]
  wishlist?: string[]
}

/** a paragraph, or the one blockquote an essay occasionally needs */
export type EssayBlock = { type: 'p'; text: string } | { type: 'quote'; text: string }

/** why the piece was written, and what a reader should take from it — shown before the body */
export type EssayNote = {
  why: string
  takeaway: string
}

export type Essay = {
  /** matches a WritingEntry.slug — looked up by the /writing/:slug route */
  slug: string
  title: string
  /** author / co-author / class / date lines, shown under the title */
  byline: string[]
  /** optional performance recording, shown at the top of the page */
  video?: string
  note?: EssayNote
  body: EssayBlock[]
  /** works cited, plain citation lines */
  sources: string[]
  /** path into public/writing/ — offered as the original PDF download */
  pdf: string
}

/**
 * One piece of a note's section. Add a case here (and a branch in Note.tsx)
 * only when a genuinely new kind of content shows up — ordinary new material
 * is just more blocks in src/content/notes.ts.
 */
/** an external link inside a run of text */
export type NoteLink = { text: string; url: string }

/**
 * Text that may carry inline links: a plain string when it doesn't, or the
 * pieces in order when it does — e.g.
 * ['an asset management firm (', { text: 'rogersia.com', url: '…' }, ')']
 */
export type NoteText = string | (string | NoteLink)[]

/**
 * A bullet: a plain string, or a bold lead-in phrase followed by the rest.
 * `lead` is rendered bold with a colon after it.
 */
export type NoteListItem = string | { lead: string; text: NoteText }

export type NoteBlock =
  | { type: 'p'; text: NoteText }
  | { type: 'list'; items: NoteListItem[] }
  /** `rows` entries line up with `columns`, cell by cell */
  | { type: 'table'; columns: string[]; rows: string[][] }
  /** `src` is a bundled asset URL, not a path string — see notes.ts */
  | { type: 'image'; src: string; alt: string; caption?: string }

export type NoteSection = {
  /** anchor id for the <section>, e.g. "how-it-works" */
  id: string
  /** lowercase heading, e.g. "how it works" */
  title: string
  blocks: NoteBlock[]
}

/** a project or work write-up, rendered by the /notes/:slug route */
export type Note = {
  /** matches a Project.slug / WorkExperience.slug */
  slug: string
  title: string
  /** one-paragraph lead under the title */
  intro: NoteText
  /** homepage anchor the "← back" link returns to; defaults to '/#projects' */
  backTo?: string
  sections: NoteSection[]
}

export type PianoEducation = {
  institution: string
  program: string
  years: string
  coursework: string[]
  electives: string[]
  volunteer: string[]
}

export type PianoInstructor = {
  name: string
  location: string
  years: string
}

export type PianoAward = {
  description: string
  year: string
}

/** one piece — composer and title kept separate so they can be styled differently */
export type PianoWork = {
  composer: string
  title: string
}

export type PianoRepertoireGroup = {
  category: string
  works: PianoWork[]
}

export type PianoRecording = {
  composer: string
  title: string
  url: string
}

export type PianoProfile = {
  name: string
  tagline: string
  education: PianoEducation
  instructors: PianoInstructor[]
  awards: PianoAward[]
  repertoire: PianoRepertoireGroup[]
  recordings: PianoRecording[]
}
