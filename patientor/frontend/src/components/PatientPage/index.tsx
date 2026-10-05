import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import patientService from "../../services/patients";
import { Patient } from "../../types";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };

    void fetchPatient();
  }, [id]);

  if (!patient) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {patient.name}
      </Typography>

      <Typography>
        <strong>SSN:</strong> {patient.ssn}
      </Typography>

      <Typography>
        <strong>Date of birth:</strong> {patient.dateOfBirth}
      </Typography>

      <Typography>
        <strong>Occupation:</strong> {patient.occupation}
      </Typography>

      <Typography>
        <strong>Gender:</strong> {patient.gender}
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 2 }}>
        Entries
      </Typography>

      {patient.entries.map(entry => (
        <Box
          key={entry.id}
          sx={{
            border: "1px solid #ccc",
            padding: 2,
            marginBottom: 2
          }}
        >
          <Typography>
            {entry.date} {entry.description}
          </Typography>

          <Typography>
            <ul>
              {entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}
            </ul>
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PatientPage;
