import { v1 as uuid } from "uuid";

import patients from "../../data/patients.ts";

import type {
  Patient,
  NonSensitivePatient,
  Entry,
  EntryWithoutId
} from "../types.ts";

const getPatients = (): NonSensitivePatient[] => {
  return patients.map((patient): NonSensitivePatient => {
    const {
      ssn: _ssn,
      entries: _entries,
      ...publicPatient
    } = patient;

    void _ssn;
    void _entries;

    return publicPatient;
  });
};

const findById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const addPatient = (
  patient: Omit<Patient, 'id' | 'entries'>
): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: []
  };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (
  patientId: string,
  entry: EntryWithoutId
): Entry | undefined => {
  const patient = patients.find(
    patient => patient.id === patientId
  );

  if (!patient) {
    return undefined;
  }

  const newEntry: Entry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  findById,
  addPatient,
  addEntry
};
