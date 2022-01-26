import React from "react";
import Link from "next/link";
import {
  Container,
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";

import theme from "../styles/theme";

export default function DenseAppBar() {
  const [userAccount, setUserAccount] = React.useState("User Account");

  React.useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUserAccount(username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={StyleAppBar}>
        <Container maxWidth="xl">
          <Toolbar variant="dense" style={StyleToolbar}>
            <section
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <Link href="/">
                  <SchoolIcon />
                </Link>
              </IconButton>
              <Typography variant="h6" color="inherit" component="div">
                School App
              </Typography>
            </section>
            <section
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Typography
                variant="h6"
                color="inherit"
                component="div"
                style={{ marginRight: 20 }}
              >
                {userAccount}
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <LogoutIcon onClick={handleLogout} />
              </IconButton>
            </section>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

const StyleAppBar = {
  color: "#ffffff",
  backgroundColor: `${theme.palette.primary.dark}`,
  boxShadow: 0,
};

const StyleToolbar = {
  display: "flex",
  justifyContent: "space-between",
};
