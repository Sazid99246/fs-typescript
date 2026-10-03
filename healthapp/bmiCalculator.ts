export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeter = height * 0.01;
  const bmi = weight / (heightInMeter * heightInMeter);

  if (bmi < 16) {
    return 'Underweight (Severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (Moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (Mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight (Pre-obese)';
  } else if (bmi < 35) {
    return 'Obese (Class I)';
  } else if (bmi < 40) {
    return 'Obese (Class II)';
  } else {
    return 'Obese (Class III)';
  }
};

if (process.argv[1] === import.meta.filename) {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    throw new Error('Please provide height and weight.');
  }

  const height = Number(args[0]);
  const weight = Number(args[1]);

  if (!Number.isFinite(height) || !Number.isFinite(weight)) {
    throw new Error('Height and weight must be numbers.');
  }

  console.log(calculateBmi(height, weight));
}
