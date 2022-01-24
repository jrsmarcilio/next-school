import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import { Box } from "@mui/material";

export default function Copyright() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 5,
        width: "100%",
      }}
    >
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      >
      {"Copyright © "}
      <MuiLink color="inherit" href="https://github.com/jrsmarcilio">
        My GitHub - Marcílio Júnior
      </MuiLink>{" "}
      {new Date().getFullYear()}.
    </Typography>
      </Box>
  );
}
