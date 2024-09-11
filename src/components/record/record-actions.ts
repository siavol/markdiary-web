import { ActionFunctionArgs, redirect } from 'react-router-dom'
import {
  hasRequiredConfiguration,
  loadConfig,
} from '../../services/config-storage'
import {
  createRecord,
  getRecordHtml,
  getRecords,
  JournalRecord,
} from '../../services/journal-repository'

function getSavingError(error: unknown): Error {
  if (error instanceof Error) {
    return error
  }
  return new Error('Unknown saving error', { cause: error })
}

export type SaveRecordProblem = {
  recordText: string
  error: Error
}

export async function newRecordAction(
  args: ActionFunctionArgs
): Promise<Response | SaveRecordProblem> {
  const config = loadConfig()
  const values = Object.fromEntries(await args.request.formData())
  const recordText = values.content.toString()

  try {
    await createRecord(recordText, config)
    return redirect('/')
  } catch (err) {
    console.error('Failed to save a record', err)
    return {
      recordText,
      error: getSavingError(err),
    }
  }
}

export async function recordsLoader(): Promise<Response | JournalRecord[]> {
  if (hasRequiredConfiguration()) {
    const config = loadConfig()
    try {
      const records = await getRecords(config)
      return records
    } catch (err: unknown) {
      console.error('Failed to load journal records', err)
      throw err
    }
  } else {
    return redirect('/start')
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
