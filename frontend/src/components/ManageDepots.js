import { useEffect, useState } from "react";
import { Box, useTheme,Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useNavigate } from 'react-router-dom';
import Header from "../screens/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [depotData, setDepotData] = useState([]);
  const navigate = useNavigate();


  const redirectToPath = (path) => {
    navigate(path);
  };
  useEffect(() => {
    // Make an API request to fetch user data from your backend
    // Replace 'apiEndpoint' with the actual endpoint of your backend API
    fetch("http://localhost:5000/depots/getAll")
      .then((response) => response.json())
      .then((data) => setDepotData(data))
      .catch((error) => console.log(error));
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    
    {
        field: "name",
        headerName: "Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "worktime",
        headerName: "worktime",
        flex: 1,
        cellClassName: "worktime-column--cell",
      },
    {
      field: "picture",
      headerName: "picture",
      type: "text",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "longitude",
      headerName: "longitude",
      flex: 1,
    },
    {
      field: "latitude",
      headerName: "latitude",
      flex: 1,
    },
    {
        field: "capacity",
        headerName: "capacity",
        type: 'Object',
        flex: 1,
      },
      {
        field: "certificate",
        headerName: "certificate",
        flex: 1,
      },
      {
        field: "logo",
        headerName: "logo",
        flex: 1,
      },
       
      
  ];

  return (
    <Box m="20px">
      <Header title="DEPOTS" subtitle="Managing the Depots" />
      <Button type="submit" variant="contained" colors="neutral" onClick={() => redirectToPath('/AddDepot')}>
            add new depot
          </Button>
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
            "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={depotData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
