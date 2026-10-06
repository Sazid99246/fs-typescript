import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";

import patientService from "../../services/patients";
import {
  Diagnosis,
  EntryWithoutId,
  HealthCheckRating,
  PatientEntry
} from "../../types";

interface Props {
  patientId: string;
  diagnoses: Diagnosis[];
  onEntryAdded: (entry: PatientEntry) => void;
}

type EntryType =
  | "HealthCheck"
  | "OccupationalHealthcare"
  | "Hospital";

const AddEntryForm = ({
  patientId,
  diagnoses,
  onEntryAdded
}: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [visible, setVisible] = useState(false);

  // HealthCheck
const [healthCheckRating, setHealthCheckRating] =
  useState<HealthCheckRating>(HealthCheckRating.Healthy);

  // Diagnosis codes
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  // Hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const [error, setError] = useState<string>();

  const handleDiagnosisChange = (
    event: SelectChangeEvent<string[]>
  ) => {
    const value = event.target.value;

    setDiagnosisCodes(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(undefined);

    let entry: EntryWithoutId;

    const commonFields = {
      description,
      date,
      specialist,
      ...(diagnosisCodes.length > 0 ? { diagnosisCodes } : {})
    };

    if (entryType === "HealthCheck") {
      entry = {
        type: "HealthCheck",
        ...commonFields,
        healthCheckRating
      };
    } else if (entryType === "OccupationalHealthcare") {
      entry = {
        type: "OccupationalHealthcare",
        ...commonFields,
        employerName,
        ...(sickLeaveStartDate && sickLeaveEndDate
          ? {
              sickLeave: {
                startDate: sickLeaveStartDate,
                endDate: sickLeaveEndDate
              }
            }
          : {})
      };
    } else {
      entry = {
        type: "Hospital",
        ...commonFields,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
      };
    }

    try {
      const newEntry = await patientService.addEntry(
        patientId,
        entry
      );

      console.log("Created entry:", newEntry);

      onEntryAdded(newEntry);

      setVisible(false);

      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthCheckRating(HealthCheckRating.Healthy);
      setDiagnosisCodes([]);

      setEmployerName("");
      setSickLeaveStartDate("");
      setSickLeaveEndDate("");

      setDischargeDate("");
      setDischargeCriteria("");
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const responseError = e.response?.data?.error;

        if (
          responseError &&
          typeof responseError === "object" &&
          "issues" in responseError
        ) {
          const issues = responseError.issues as Array<{
            path: Array<string | number>;
            message: string;
          }>;

          setError(
            issues
              .map(issue => `${issue.path.join(".")}: ${issue.message}`)
              .join(", ")
          );
        } else {
          setError("Something went wrong.");
        }
      } else {
        setError("Something went wrong.");
      }
    }
  };

  if (!visible) {
    return (
        <Button
            variant="contained"
            onClick={() => setVisible(true)}
            >
            Add New Entry
        </Button>
        );
    }

  return (
    <Box
      component="form"
      onSubmit={submit}
      sx={{
        border: "1px solid #ccc",
        padding: 2,
        marginTop: 3,
        marginBottom: 3
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Add Entry
      </Typography>

      {error && (
        <Typography color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}

      {/* Entry type */}

      <FormControl fullWidth margin="normal">
        <InputLabel>Entry Type</InputLabel>

        <Select
          value={entryType}
          label="Entry Type"
          onChange={event =>
            setEntryType(event.target.value as EntryType)
          }
        >
          <MenuItem value="HealthCheck">
            Health Check
          </MenuItem>

          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>

          <MenuItem value="Hospital">
            Hospital
          </MenuItem>
        </Select>
      </FormControl>

      {/* Common fields */}

      <TextField
        fullWidth
        required
        label="Description"
        value={description}
        onChange={({ target }) =>
          setDescription(target.value)
        }
        margin="normal"
      />

      <TextField
        fullWidth
        required
        label="Date"
        type="date"
        value={date}
        onChange={({ target }) => setDate(target.value)}
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
      />

      <TextField
        fullWidth
        required
        label="Specialist"
        value={specialist}
        onChange={({ target }) =>
          setSpecialist(target.value)
        }
        margin="normal"
      />

      {/* Diagnosis codes */}

      <FormControl fullWidth margin="normal">
        <InputLabel>Diagnosis Codes</InputLabel>

        <Select
          multiple
          value={diagnosisCodes}
          label="Diagnosis Codes"
          onChange={handleDiagnosisChange}
          renderValue={selected =>
            selected.join(", ")
          }
        >
          {diagnoses.map(diagnosis => (
            <MenuItem
              key={diagnosis.code}
              value={diagnosis.code}
            >
              {diagnosis.code} — {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* HealthCheck */}

      {entryType === "HealthCheck" && (
        <FormControl fullWidth margin="normal">
          <InputLabel>Health Check Rating</InputLabel>

          <Select
            value={healthCheckRating}
            label="Health Check Rating"
            onChange={event =>
              setHealthCheckRating(
                event.target.value as HealthCheckRating
              )
            }
          >
            <MenuItem value={0}>
              0 — Healthy
            </MenuItem>

            <MenuItem value={1}>
              1 — Low Risk
            </MenuItem>

            <MenuItem value={2}>
              2 — High Risk
            </MenuItem>

            <MenuItem value={3}>
              3 — Critical Risk
            </MenuItem>
          </Select>
        </FormControl>
      )}

      {/* OccupationalHealthcare */}

      {entryType === "OccupationalHealthcare" && (
        <>
          <TextField
            fullWidth
            required
            label="Employer Name"
            value={employerName}
            onChange={({ target }) =>
              setEmployerName(target.value)
            }
            margin="normal"
          />

          <Typography sx={{ marginTop: 2 }}>
            Sick Leave (optional)
          </Typography>

          <TextField
            fullWidth
            label="Sick Leave Start Date"
            type="date"
            value={sickLeaveStartDate}
            onChange={({ target }) =>
              setSickLeaveStartDate(target.value)
            }
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />

          <TextField
            fullWidth
            label="Sick Leave End Date"
            type="date"
            value={sickLeaveEndDate}
            onChange={({ target }) =>
              setSickLeaveEndDate(target.value)
            }
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />
        </>
      )}

      {/* Hospital */}

      {entryType === "Hospital" && (
        <>
          <TextField
            fullWidth
            required
            label="Discharge Date"
            type="date"
            value={dischargeDate}
            onChange={({ target }) =>
              setDischargeDate(target.value)
            }
            margin="normal"
            InputLabelProps={{
              shrink: true
            }}
          />

          <TextField
            fullWidth
            required
            label="Discharge Criteria"
            value={dischargeCriteria}
            onChange={({ target }) =>
              setDischargeCriteria(target.value)
            }
            margin="normal"
          />
        </>
      )}

      <Button
        type="submit"
        variant="contained"
        sx={{ marginTop: 2 }}
      >
        Add Entry
      </Button>
    </Box>
  );
};

export default AddEntryForm;
