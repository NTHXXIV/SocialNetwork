import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { Stack } from "@mui/material";

function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <Logo sx={{ width: 120, height: 120 }} />
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
