import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { loadConfig } from '../../services/config-storage'
import {
  createRecord,
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
