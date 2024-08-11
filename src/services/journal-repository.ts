import {
  getRepositoryContent,
  writeFileContent,
  RepositoryContentItem,
} from './github'
import { Config } from './config-storage'

export type JournalRecord = {
  name: string
  path: string
  htmlUrl: URL
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

export async function getRecords(config: Config): Promise<JournalRecord[]> {
  const rootJournalPath = 'journal'
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
    result.push(
      ...items.map((i) => ({
        name: i.name,
        path: i.path,
        htmlUrl: new URL(i.html_url),
      }))
    )
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
