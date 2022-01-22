import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import FormLogin from "../components/FormLogin";

const Home: NextPage = () => {
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "background.default",
        }}
      >
        <Grid container spacing={3}>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={8}>
              <Box
                sx={{
                  width: "100%",
                  height: "400px",
                  background: "#FFFFFF",
                  borderRadius: "8px",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/2038/2038157.png"
                  alt="logo"
                  width={150}
                  height={150}
                />
                <Typography variant="h3" component="h1" gutterBottom>
                  School App
                </Typography>
                <Typography variant="subtitle1" component="h1" gutterBottom>
                  simple student registration system
                </Typography>
                <Typography variant="subtitle1" component="h1" gutterBottom>
                  with authentication and activation of registration by email
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4} container direction="column" spacing={3}>
              <Grid item xs={8}>
                <Box
                  sx={{
                    height: "100%",
                    background: "#F1F9FE",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="subtitle1" component="h1" gutterBottom>
                    Access <strong>School App</strong> with your account
                  </Typography>
                  <FormLogin />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box
                  sx={{
                    height: "100%",
                    background: "#F1F9FE",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="subtitle1" component="h1" gutterBottom>
                    Not a member yet?
                  </Typography>
                  <Link href="/register">
                    <Typography variant="h6" component="h1" gutterBottom>
                      Register
                    </Typography>
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "37px",
                borderRadius: "8px",
                background: "#BBCDE8",
                color: "#2E7BB4",
              }}
            >
              <Typography variant="h6" component="h1">
                &copy; &ensp; {new Date().getFullYear()}&ensp; School App &ensp;
                - &ensp; By{" "}
                <Link href="https://github.com/jrsmarcilio">
                  <a target="_blank">Marcílio Júnior</a>
                </Link>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
