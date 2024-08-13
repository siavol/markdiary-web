import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { loadConfig } from '../../services/config-storage'
import {
  createRecord,
  getRecordHtml,
  getRecords,
  JournalRecord,
} from '../../services/journal-repository'

export async function newRecordAction(
  args: ActionFunctionArgs
): Promise<Response> {
  const values = Object.fromEntries(await args.request.formData())

  const config = loadConfig()
  await createRecord(values.content.toString(), config)

  return redirect('/')
}

export async function recordsLoader(): Promise<JournalRecord[]> {
  const config = loadConfig()
  try {
    const records = await getRecords(config)
    return records
  } catch (err: unknown) {
    console.error('Failed to load journal records', err)
    throw err
  }
}

export async function recordHtmlLoader({
  params,
}: ActionFunctionArgs): Promise<string> {
  const config = loadConfig()
  const { recordId } = params
  if (!recordId) throw new Error('recordId param must be not empty')

  const html = await getRecordHtml(recordId, config)
  return html
}
