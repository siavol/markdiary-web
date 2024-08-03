export type JournalRecord = {
  name: string
  path: string
  htmlUrl: URL
}

export async function getRecords(): Promise<JournalRecord[]> {
  return [
    {
      name: '20240701-1902',
      path: 'journal/2024/07/20240701-1902.md',
      htmlUrl: new URL(
        'https://github.com/siavol/dairy/blob/main/journal/2024/07/20240701-1902.md'
      ),
    },
    {
      name: '20240703-0003',
      path: 'journal/2024/07/20240703-0003.md',
      htmlUrl: new URL(
        'https://github.com/siavol/dairy/blob/main/journal/2024/07/20240703-0003.md'
      ),
    },
  ]
}
