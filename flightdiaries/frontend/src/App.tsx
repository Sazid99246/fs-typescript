import { useEffect, useState } from 'react'
import DiaryEntry from './components/DiaryEntry'
import diaryService from './services/diaryService'
import type { DiaryEntry as DiaryEntryType } from './types'

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntryType[]>([])

  useEffect(() => {
    diaryService
      .getAll()
      .then(data => {
        setDiaries(data)
      })
  }, [])

  return (
    <div>
      <h1>Flight Diaries</h1>

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
