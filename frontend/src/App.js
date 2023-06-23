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
import Line from "./components/Line";
import Pie from "./components/Pie";
import Bar from "./components/Bar";
import Geography from "./components/Geography";
import FAQ from "./components/FAQ";
import Login from './components/Login'

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
            <Route path="/login" element={<Login />} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/ManageUsers" element={<ManageUsers />} />
              <Route path="/AddCode" element={<AddCode/>} />
              <Route path="/ManageDepots" element={<ManageDepots/>} />
              <Route path="/AddDepot" element={<AddDepot/>} />
              <Route path="/calendar" element={<Calendar/>} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/faq" element={<FAQ />} />

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
