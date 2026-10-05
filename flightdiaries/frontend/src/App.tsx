import { useEffect, useState } from 'react'

import axios from 'axios'

import DiaryEntry from './components/DiaryEntry'
import DiaryForm from './components/DiaryForm'

import diaryService from './services/diaryService'

import type { DiaryEntry as DiaryEntryType, NewDiaryEntry } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntryType[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    diaryService
      .getAll()
      .then(data => {
        setDiaries(data)
      })
  }, [])

  const addDiary = (newDiary: NewDiaryEntry) => {
    setError(null)

    diaryService
      .create(newDiary)
      .then(data => {
        setDiaries(diaries.concat(data))
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          const errorData = error.response?.data

          if (errorData?.error?.message) {
            setError(errorData.error.message)
          } else {
            setError('Failed to create diary entry')
          }
        } else {
          setError('Unknown error')
        }
      })
  }

  return (
    <div>
      <h1>Flight Diaries</h1>

      {error && (
        <div>
          {error}
        </div>
      )}

      <DiaryForm onSubmit={addDiary} />

      {diaries.map(diary => (
        <DiaryEntry
          key={diary.id}
          entry={diary}
        />
      ))}
    </div>
  )
}

export default App
