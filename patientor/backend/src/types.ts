export interface Diagnosis {
  code: string
  name: string
  latin?: string
}

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}

export type NewPatient = Omit<Patient, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn'>;

export const isNewPatient = (object: unknown): object is NewPatient => {
  if (!object || typeof object !== 'object') {
    return false;
  }

  if (
    !('name' in object) ||
    !('dateOfBirth' in object) ||
    !('ssn' in object) ||
    !('gender' in object) ||
    !('occupation' in object)
  ) {
    return false;
  }

  return (
    typeof object.name === 'string' &&
    typeof object.dateOfBirth === 'string' &&
    typeof object.ssn === 'string' &&
    typeof object.occupation === 'string' &&
    Object.values(Gender).includes(object.gender as Gender)
  );
};
