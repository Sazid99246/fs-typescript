import { useState } from 'react'

import type { NewDiaryEntry, Weather, Visibility } from '../types'

interface Props {
  onSubmit: (entry: NewDiaryEntry) => void
}

const DiaryForm = ({ onSubmit }: Props) => {
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>('sunny')
  const [visibility, setVisibility] = useState<Visibility>('great')
  const [comment, setComment] = useState('')

  const submitDiary = (event: React.SyntheticEvent) => {
    event.preventDefault()

    onSubmit({
      date,
      weather,
      visibility,
      comment
    })

    setDate('')
    setWeather('sunny')
    setVisibility('great')
    setComment('')
  }

  return (
    <form onSubmit={submitDiary}>
      <div>
        date:
        <input
          type="date"
          value={date}
          onChange={event => setDate(event.target.value)}
        />
      </div>

      <div>
        weather:
        <label>
          <input
            type="radio"
            name="weather"
            value="sunny"
            checked={weather === 'sunny'}
            onChange={() => setWeather('sunny')}
          />
          sunny
        </label>

        <label>
          <input
            type="radio"
            name="weather"
            value="rainy"
            checked={weather === 'rainy'}
            onChange={() => setWeather('rainy')}
          />
          rainy
        </label>

        <label>
          <input
            type="radio"
            name="weather"
            value="cloudy"
            checked={weather === 'cloudy'}
            onChange={() => setWeather('cloudy')}
          />
          cloudy
        </label>

        <label>
          <input
            type="radio"
            name="weather"
            value="stormy"
            checked={weather === 'stormy'}
            onChange={() => setWeather('stormy')}
          />
          stormy
        </label>

        <label>
          <input
            type="radio"
            name="weather"
            value="windy"
            checked={weather === 'windy'}
            onChange={() => setWeather('windy')}
          />
          windy
        </label>
      </div>

      <div>
        visibility:
        <label>
          <input
            type="radio"
            name="visibility"
            value="great"
            checked={visibility === 'great'}
            onChange={() => setVisibility('great')}
          />
          great
        </label>

        <label>
          <input
            type="radio"
            name="visibility"
            value="good"
            checked={visibility === 'good'}
            onChange={() => setVisibility('good')}
          />
          good
        </label>

        <label>
          <input
            type="radio"
            name="visibility"
            value="ok"
            checked={visibility === 'ok'}
            onChange={() => setVisibility('ok')}
          />
          ok
        </label>

        <label>
          <input
            type="radio"
            name="visibility"
            value="poor"
            checked={visibility === 'poor'}
            onChange={() => setVisibility('poor')}
          />
          poor
        </label>
      </div>

      <div>
        comment:
        <input
          value={comment}
          onChange={event => setComment(event.target.value)}
        />
      </div>

      <button type="submit">add</button>
    </form>
  )
}

export default DiaryForm
