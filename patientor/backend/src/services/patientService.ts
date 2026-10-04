import patients from '../../data/patients.ts'
import type { Patient, PublicPatient } from '../types.ts'

const getPatients = (): PublicPatient[] => {
  return patients.map((patient: Patient): PublicPatient => {
    const {
      ssn: _ssn,
      ...publicPatient
    } = patient

    return publicPatient
  })
}

export default {
  getPatients
}
