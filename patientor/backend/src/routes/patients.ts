import express from 'express';
import patientService from '../services/patientService.ts';
import { isNewPatient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.post('/', (req, res) => {
  const body: unknown = req.body;

  if (!isNewPatient(body)) {
    return res.status(400).json({
      error: 'malformatted patient data'
    });
  }

  const addedPatient = patientService.addPatient(body);

  return res.json(addedPatient);
});

export default router;
