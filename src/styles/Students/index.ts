import { styled } from "@mui/system";

export const HeaderContent = styled("div")(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexDirection: "row",
  margin: 30,
  
  "& .MuiTypography-h1": {
    fontSize: 36,
    fontWeight: 400,
  },
}));
