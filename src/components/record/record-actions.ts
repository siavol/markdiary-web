import { ActionFunctionArgs, redirect } from 'react-router-dom'
import { loadConfig } from '../../services/config-storage'
import { createRecord } from '../../services/journal-repository'

export async function newRecordAction(
  args: ActionFunctionArgs
): Promise<Response> {
  const values = Object.fromEntries(await args.request.formData())

  const config = loadConfig()
  await createRecord(values.content.toString(), config)

  return redirect('/')
}
