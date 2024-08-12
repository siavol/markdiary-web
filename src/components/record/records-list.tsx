import React from 'react'
import { JournalRecord } from '../../services/journal-repository'
import { Link, useLoaderData } from 'react-router-dom'

const RecordsList: React.FunctionComponent = () => {
  const data = useLoaderData() as JournalRecord[]

  return (
    <div>
      <ul>
        {data.map((r) => (
          <li key={r.path}>
            <Link to={`view/${r.name}`}>{r.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecordsList
