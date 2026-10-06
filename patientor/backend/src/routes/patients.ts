import express from 'express';
import patientService from '../services/patientService.ts';
import { newEntrySchema, newPatientSchema } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
});

router.post('/', (req, res) => {
  const result = newPatientSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error
    });
  }

  const addedPatient = patientService.addPatient(result.data);

  return res.json(addedPatient);
});

router.post('/:id/entries', (req, res) => {
  const result = newEntrySchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error
    });
  }

  const entry = patientService.addEntry(
    req.params.id,
    result.data
  );

  if (!entry) {
    return res.status(404).json({
      error: 'Patient not found'
    });
  }

  return res.json(entry);
});

export default router;
