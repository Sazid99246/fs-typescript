import axios from "axios";
import { Diagnosis, EntryWithoutId, Patient, PatientEntry, PatientFormValues } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
  return data;
};

const getOne = async (id: string): Promise<Patient> => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const getDiagnoses = async (): Promise<Diagnosis[]> => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const addEntry = async (
  patientId: string,
  entry: EntryWithoutId
): Promise<PatientEntry> => {
  const { data } = await axios.post<PatientEntry>(
    `${apiBaseUrl}/patients/${patientId}/entries`,
    entry
  );

  return data;
};

export default {
  getAll,
  getOne,
  getDiagnoses,
  create,
  addEntry
};
