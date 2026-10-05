export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export type EntryType =
  | "HealthCheck"
  | "OccupationalHealthcare"
  | "Hospital";

export const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3
} as const;

export type HealthCheckRating =
  typeof HealthCheckRating[keyof typeof HealthCheckRating];

export interface Entry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis["code"]>;
}

export interface HealthCheckEntry extends Entry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends Entry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends Entry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type PatientEntry =
  | HealthCheckEntry
  | OccupationalHealthcareEntry
  | HospitalEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: PatientEntry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;
