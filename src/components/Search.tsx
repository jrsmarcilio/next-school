import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { IStudent } from '../interfaces/Students';
import Link from 'next/link';

export default function SearchStudent({ students }: { students: IStudent[] }) {
  return (
    <Stack spacing={2}>
      <Autocomplete
        freeSolo
        options={students.map((student) => student.name)}
        renderInput={
          (params) => <TextField {...params} label="Search Student Name" />
        }
      />
    </Stack>
  );
}
