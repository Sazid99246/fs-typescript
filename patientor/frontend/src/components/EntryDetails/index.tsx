import {Typography } from "@mui/material";
import {
  PatientEntry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry
} from "../../types";

interface Props {
  entry: PatientEntry;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled entry type: ${JSON.stringify(value)}`
  );
};

const HealthCheckEntryDetails = ({
  entry
}: {
  entry: HealthCheckEntry;
}) => (
  <>
    <Typography>
      <strong>Health check rating:</strong>{" "}
      {entry.healthCheckRating}
    </Typography>
  </>
);

const OccupationalHealthcareEntryDetails = ({
  entry
}: {
  entry: OccupationalHealthcareEntry;
}) => (
  <>
    <Typography>
      <strong>Employer:</strong> {entry.employerName}
    </Typography>

    {entry.sickLeave && (
      <Typography>
        <strong>Sick leave:</strong>{" "}
        {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
      </Typography>
    )}
  </>
);

const HospitalEntryDetails = ({
  entry
}: {
  entry: HospitalEntry;
}) => (
  <Typography>
    <strong>Discharge:</strong>{" "}
    {entry.discharge.date} — {entry.discharge.criteria}
  </Typography>
);

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;

    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntryDetails entry={entry} />
      );

    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;

    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
