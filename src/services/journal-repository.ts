import {
  getRepositoryContent,
  writeFileContent,
  RepositoryContentItem,
  getRepositoryContentHtml,
} from './github'
import { Config } from './config-storage'

const rootJournalPath = 'journal'

export type JournalRecord = {
  name: string
  path: string
  htmlUrl: URL
}

type RecordDateParts = {
  year: string
  month: string
  day: string
}

function byPath(a: RepositoryContentItem, b: RepositoryContentItem): number {
  if (a.path < b.path) {
    return -1
  }
  if (a.path > b.path) {
    return 1
  }
  return 0
}

function byNameDesc(a: JournalRecord, b: JournalRecord): number {
  if (a.name < b.name) {
    return 1
  }
  if (a.name > b.name) {
    return -1
  }
  return 0
}

function dateFromRecordId(recordId: string): RecordDateParts {
  const year = recordId.substring(0, 4)
  const month = recordId.substring(4, 6)
  const day = recordId.substring(6, 8)

  return { year, month, day }
}

export async function getRecords(config: Config): Promise<JournalRecord[]> {
  const resultLimit = 25

  const yearItems = await getRepositoryContent(rootJournalPath, config)
  const monthTasks = yearItems.map(async (year) => {
    return await getRepositoryContent(year.path, config)
  })
  const months = (await Promise.all(monthTasks)).flat().sort(byPath)

  const result: JournalRecord[] = []
  while (result.length < resultLimit && months.length > 0) {
    const monthDir = months.pop()
    if (!monthDir) continue

    const path = monthDir.path
    const items = await getRepositoryContent(path, config)
    const records = items
      .map((i) => ({
        name: i.name,
        path: i.path,
        htmlUrl: i.html_url ? new URL(i.html_url) : null,
      }))
      .filter((r): r is JournalRecord => !!r.htmlUrl)
    result.push(...records)
  }

  return result.sort(byNameDesc)
}

export async function createRecord(
  content: string,
  config: Config
): Promise<void> {
  const now = new Date()
  const title = now.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  await writeFileContent(title, content, now, config)
}

export async function getRecordHtml(
  recordId: string,
  config: Config
): Promise<string> {
  const { year, month } = dateFromRecordId(recordId)
  const path = `${rootJournalPath}/${year}/${month}/${recordId}/`

  return await getRepositoryContentHtml(path, config)
}
