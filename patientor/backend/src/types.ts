import { z } from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other'
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export type EntryType =
  | 'HealthCheck'
  | 'OccupationalHealthcare'
  | 'Hospital';

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3
} as const;

export type HealthCheckRating =
  typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

type UnionOmit<T, K extends string | number | symbol> =
  T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

const healthCheckRatingSchema = z.union([
  z.literal(HealthCheckRating.Healthy),
  z.literal(HealthCheckRating.LowRisk),
  z.literal(HealthCheckRating.HighRisk),
  z.literal(HealthCheckRating.CriticalRisk)
]);

const healthCheckEntrySchema = z.object({
  type: z.literal('HealthCheck'),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  healthCheckRating: healthCheckRatingSchema
});

const occupationalHealthcareEntrySchema = z.object({
  type: z.literal('OccupationalHealthcare'),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()
});

const hospitalEntrySchema = z.object({
  type: z.literal('Hospital'),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});

export const newEntrySchema = z.discriminatedUnion('type', [
  healthCheckEntrySchema,
  occupationalHealthcareEntrySchema,
  hospitalEntrySchema
]);

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id' | 'entries'>;

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string()
});
