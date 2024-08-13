import React from 'react'
import { useLoaderData } from 'react-router-dom'

const RecordView: React.FunctionComponent = () => {
  const recordHtml = useLoaderData() as string

  return <div dangerouslySetInnerHTML={{ __html: recordHtml }}></div>
}

export default RecordView
