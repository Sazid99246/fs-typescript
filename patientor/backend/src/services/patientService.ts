import { v1 as uuid } from 'uuid';
import patients from '../../data/patients.ts';
import type { Patient, PublicPatient } from '../types.ts';

const getPatients = (): PublicPatient[] => {
  return patients.map((patient): PublicPatient => {
    const { ssn: _ssn, ...publicPatient } = patient;
    void _ssn;
    return publicPatient as PublicPatient;
  });
};

const addPatient = (patient: Omit<Patient, 'id'>): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  addPatient
};
