import React from 'react';
import { Button, Container, Divider, Typography } from '@mui/material';
import Link from 'next/link'
import Image from 'next/image'

import nodejs from '../../../public/node-js.png'
import { HeaderContent } from '../../styles/Students'
import Listing from '../../components/Listing';
import { api } from '../../service/api'
import { IStudent } from '../../interfaces/Students'
import Search from '../../components/Search';


export default function Students() {
  const [students, setStudents] = React.useState<IStudent[]>([]);

  React.useEffect(() => {
    function fetchStudents() {
      api.get('/students').then(response => {
        setStudents(response.data);
      });
    }
    fetchStudents();
  }, []);


  return (
    <Container maxWidth="xl">
      <HeaderContent>
        <Image
          alt="Logo Node.js"
          src={nodejs}
          layout="intrinsic"
          width={175}
          height={113}
        />
        <Typography variant="h1" component="h2">
          Students Listing
        </Typography>
        <Button variant="outlined">
          <Link href="/students/form">
            <a style={{ textDecoration: 'none' }}>Add new student</a>
          </Link>
        </Button>
      </HeaderContent>
      <Divider variant="fullWidth" />
      <Listing students={students} />
    </Container>
  );
}