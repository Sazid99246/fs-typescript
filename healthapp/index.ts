import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './calculateExercises.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!Number.isFinite(height) || !Number.isFinite(weight)) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }

  const result = {
    weight,
    height,
    bmi: calculateBmi(height, weight)
  };

  res.json(result);
});

app.post('/exercises', (req, res) => {
  const body: unknown = req.body;

  if (typeof body !== 'object' || body === null) {
    res.status(400).json({
      error: 'parameters missing'
    });
    return;
  }

  if (!('daily_exercises' in body) || !('target' in body)) {
    res.status(400).json({
      error: 'parameters missing'
    });
    return;
  }

  const dailyExercises: unknown = body.daily_exercises;
  const target: unknown = body.target;

  if (
    !Array.isArray(dailyExercises) ||
    !dailyExercises.every(
      (day: unknown) =>
        typeof day === 'number' && Number.isFinite(day)
    ) ||
    typeof target !== 'number' ||
    !Number.isFinite(target)
  ) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }

  const validatedDailyExercises = dailyExercises as number[];

  const result = calculateExercises(
    validatedDailyExercises,
    target
  );

  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
