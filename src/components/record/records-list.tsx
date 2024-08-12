import React, { useEffect, useState } from 'react'
import { getRecords, JournalRecord } from '../../services/journal-repository'
import { loadConfig } from '../../services/config-storage'
import { Link } from 'react-router-dom'

const RecordsList: React.FunctionComponent = () => {
  const [data, setData] = useState<JournalRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const config = loadConfig()
    const fetchData = async (): Promise<void> => {
      try {
        const records = await getRecords(config)
        setData(records)
      } catch (err: unknown) {
        console.error('Failed to load journal records', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>Failed to load journal records.</div>
  } else {
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
}

export default RecordsList
