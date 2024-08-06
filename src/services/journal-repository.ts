import { getRepositoryContent } from './github'
import { Config } from './config-storage'

export type JournalRecord = {
  name: string
  path: string
  htmlUrl: URL
}

export async function getRecords(config: Config): Promise<JournalRecord[]> {
  const rootJournalPath = 'journal'

  const yearItems = await getRepositoryContent(rootJournalPath, config)
  const monthTasks = yearItems.map(async (year) => {
    return await getRepositoryContent(year.path, config)
  })
  const months = (await Promise.all(monthTasks))
    .flat()
    .sort()

  const result: JournalRecord[] = []

  return result
  // return [
  //   {
  //     name: '20240701-1902',
  //     path: 'journal/2024/07/20240701-1902.md',
  //     htmlUrl: new URL(
  //       'https://github.com/siavol/dairy/blob/main/journal/2024/07/20240701-1902.md'
  //     ),
  //   },
  //   {
  //     name: '20240703-0003',
  //     path: 'journal/2024/07/20240703-0003.md',
  //     htmlUrl: new URL(
  //       'https://github.com/siavol/dairy/blob/main/journal/2024/07/20240703-0003.md'
  //     ),
  //   },
  // ]
}
