import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import ManageUsers from './components/ManageUsers'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AddCode from './components/AddCode'
import ManageDepots from './components/ManageDepots'
import AddDepot from "./components/addDepot"
import Calendar from './components/Calendar'


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ManageUsers" element={<ManageUsers />} />
              <Route path="/AddCode" element={<AddCode/>} />
              <Route path="/ManageDepots" element={<ManageDepots/>} />
              <Route path="/AddDepot" element={<AddDepot/>} />
              <Route path="/calendar" element={<Calendar/>} />
          
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
