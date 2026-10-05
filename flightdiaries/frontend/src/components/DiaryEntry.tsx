import type { DiaryEntry as DiaryEntryType } from '../types'

interface Props {
  entry: DiaryEntryType
}

const DiaryEntry = ({ entry }: Props) => {
  return (
    <div>
      <h3>{entry.date}</h3>
      <p>
        visibility: {entry.visibility}<br />
        weather: {entry.weather}
      </p>
      <p>{entry.comment}</p>
    </div>
  )
}

export default DiaryEntry
