import { isNotNumber } from './utils.ts';

interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

export const calculateExercises = (
  dailyExerciseHours: number[],
  targetValue: number
): ExerciseResult => {
  const periodLength = dailyExerciseHours.length;

  const trainingDays = dailyExerciseHours.filter(
    hour => hour !== 0
  ).length;

  let totalTrainingHours = 0;

  for (let i = 0; i < dailyExerciseHours.length; i++) {
    totalTrainingHours += dailyExerciseHours[i];
  }

  const average = totalTrainingHours / periodLength;

  const success = average >= targetValue;

  let rating: number;
  let ratingDescription: string;

  if (average >= targetValue) {
    rating = 3;
    ratingDescription = 'very good';
  } else if (average >= targetValue * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetValue,
    average
  };
};

// Run the command-line version only when this file is executed directly
if (process.argv[1] === import.meta.filename) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    throw new Error(
      'Please provide a target and at least one day of exercise data.'
    );
  }

  if (args.some(argument => isNotNumber(argument))) {
    throw new Error('All arguments must be numbers.');
  }

  const target = Number(args[0]);
  const dailyExerciseHours = args.slice(1).map(Number);

  console.log(calculateExercises(dailyExerciseHours, target));
}
