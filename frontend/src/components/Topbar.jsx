import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme.js";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";


const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={1.5} backgroundColor={colors.primary[400]}  >
      {/* SEARCH BAR */}
      <Box
      display="flex"  sx={{ marginLeft: '10px' }}
      >
        <img
          src={require("./logo1.png")} // Replace with the path to your logo image file
          alt="Logo"
          style={{ width: '290px', height: '55px'}}
        />
       
      </Box>

      {/* ICONS */}
      <Box display="flex" sx={{ marginRight: '80px' }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
       
        
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;