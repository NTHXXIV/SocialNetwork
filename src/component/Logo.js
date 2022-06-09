import { Box } from "@mui/material";
import React from "react";
import LogoSVG from "./svg-icon/LogoSVG";
import { Link as RouterLink } from "react-router-dom";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 60, eight: 60, ...sx }}>
      <LogoSVG />
    </Box>
  );
  if (disabledLink) {
    return <>{logo}</>;
  }
  return (
    <div>
      <RouterLink to="/">{logo}</RouterLink>
    </div>
  );
}

export default Logo;
