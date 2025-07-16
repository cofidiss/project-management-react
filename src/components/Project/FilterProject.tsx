import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Typography,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
import { Grid } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  CommonLov,
  FilteredProject,
  FilterProjectParameters,
} from "../../Models/Models";
// Update the path below if your AppContext file is located elsewhere
import { AppContext } from "../../Contexts/AppContext";
// OR, if the file does not exist, create it as shown below
import { DateRangePicker, DateRange, ClearIcon } from "@mui/x-date-pickers-pro";
import { Dayjs } from "dayjs";
import UpdateProject from "./UpdateProject";
import CloseIcon from "@mui/icons-material/Close";
import { setLovState } from "../../utils";
import ProjectList from "./ProjectList";
  const buildQueryString = (filter: FilterProjectParameters): string => {
    let query = "";



      query += `pageNumber=${filter.pageNumber}&`;
 

      query += `pageSize=${filter.pageSize}&`;
 
    if (filter.name) {
      query += `name=${filter.name}&`;
    }
    if (filter.actualStartDate) {
      query += `actualStartDate=${(
        filter.actualStartDate as Dayjs
      ).toISOString()}&`;
    }
    if (filter.actualEndDate) {
      query += `actualEndDate=${(
        filter.actualEndDate as Dayjs
      ).toISOString()}&`;
    }
    if (filter.plannedStartDate) {
      query += `plannedStartDate=${(
        filter.plannedStartDate as Dayjs
      ).toISOString()}&`;
    }
    if (filter.plannedEndDate) {
      query += `plannedEndDate=${(
        filter.plannedEndDate as Dayjs
      ).toISOString()}&`;
    }
    if (filter.statusId!= -1 && filter.statusId != undefined ) {
      query += `statusId=${filter.statusId}&`;
    }
    if (filter.categoryId!= -1 && filter.categoryId != undefined ) {
      query += `categoryId=${filter.categoryId}&`;
    }

    return query;
  };
const FilterProject: React.FC = () => {
  debugger;

  const defaultFilterParam: FilterProjectParameters = {
    pageNumber: 0, // Default değer
    pageSize: 5,
  };
  const [filteredProjectList, setFilteredProjectList] = useState<
    FilteredProject[]
  >([]);
  const [statusLov, setStatusLov] = useState<CommonLov[]>([]);
  const [categoryLov, setCategoryLov] = useState<CommonLov[]>([]);
  const [filterProjectParam, setFilterProjectParam] =
    useState<FilterProjectParameters>(defaultFilterParam);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading, setModal1State } = useContext(AppContext);

  const filterProjects = async (filterParams: FilterProjectParameters) => {
    try {
      let queryString = buildQueryString(filterParams);
      startLoading();
      const response = await fetch(`${baseUrl}/api/project/FilterProject?${queryString}`);
      if (!response.ok) {
        throw new Error("Error fetching orders.");
      }
      const data: FilteredProject[] = await response.json();
      setFilteredProjectList(data);
    } catch (error: any) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    setLovState(
      setStatusLov,
      "api/project/getStatusLov",
      startLoading,
      stopLoading,
      baseUrl
    );

    setLovState(
      setCategoryLov,
      "api/project/getCategoryLov",
      startLoading,
      stopLoading,
      baseUrl
    );
    filterProjects(filterProjectParam);
  }, []);
useEffect(() => {
  
    filterProjects(filterProjectParam);
  }, [filterProjectParam.pageNumber, filterProjectParam.pageSize]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setFilterProjectParam((prevState) => ({
      ...prevState,
      pageNumber: newPage ,
    }));

  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSize = parseInt(event.target.value, 10);
    setFilterProjectParam((prevState) => ({
      ...prevState,
      pageSize: newSize
    }));

  };

  // Filtreleri temizleme fonksiyonu
  const clearFilters = () => {
    setFilterProjectParam(defaultFilterParam);
    filterProjects(defaultFilterParam);
  };
  const deleteProject = async (projectId: number) => {
    try {
      startLoading();
      const response = await fetch(`${baseUrl}/api/project/${projectId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting project.");
      }
      // Refresh the project list after deletion
      filterProjects(filterProjectParam);
    } catch (error: any) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };  
  return (
    <Container>
      <Typography variant="h5" align="center" gutterBottom>
        Filter Project
      </Typography>

      {/* Arama Formu */}
 <Grid container spacing={2}>
  <Grid  size={{ xs: 12, sm: 6, md: 4 }}>
    <Box display="flex" alignItems="center">
      <Typography sx={{ minWidth: 120, mr: 2 }} variant="subtitle2">
        Project Name
      </Typography>
      <TextField
        fullWidth
        value={filterProjectParam.name ?? ""}
        onChange={(e) =>
          setFilterProjectParam((prevState) => ({
            ...prevState,
            name: e.target.value,
          }))
        }
      />
    </Box>
  </Grid>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Box display="flex" alignItems="center">
      <Typography sx={{ minWidth: 120, mr: 2 }} variant="subtitle2">
        Status
      </Typography>
      <Select
        fullWidth
        value={filterProjectParam.statusId == undefined ? -1 : filterProjectParam.statusId}
        onChange={(e) =>
          setFilterProjectParam((prevState) => ({
            ...prevState,
            statusId: isNaN(Number(e.target.value)) ? undefined : Number(e.target.value),
          }))
        }
      >
        <MenuItem value="-1">
          <em>Choose Status</em>
        </MenuItem>
        {statusLov.map((status) => (
          <MenuItem key={status.id} value={status.id}>
            {status.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  </Grid>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Box display="flex" alignItems="center">
      <Typography sx={{ minWidth: 120, mr: 2 }} variant="subtitle2">
        Category
      </Typography>
      <Select
        fullWidth
        value={filterProjectParam.categoryId == undefined ? -1 : filterProjectParam.categoryId}
        onChange={(e) =>
          setFilterProjectParam((prevState) => ({
            ...prevState,
            categoryId: isNaN(Number(e.target.value)) ? undefined : Number(e.target.value),
          }))
        }
      >
        <MenuItem value="-1">
          <em>Choose Category</em>
        </MenuItem>
        {categoryLov.map((category) => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  </Grid>
   <Grid size={{ xs: 12, sm: 6 ,md:4}}>
          <Box display="flex" alignItems="center">
      <Typography sx={{ minWidth: 120, mr: 2 }} variant="subtitle2">
        Actual Date Range
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          localeText={{ start: "Planned Start", end: "Planned End" }}
          slotProps={{
            actionBar: {
              actions: ["clear"],
            },
          }}
          value={[
            filterProjectParam.actualStartDate as Dayjs,
            filterProjectParam.actualEndDate as Dayjs,
          ]}
          onChange={(newValue) => {
            setFilterProjectParam((prevState) => ({
              ...prevState,
              actualStartDate: newValue[0] as Dayjs,
              actualEndDate: newValue[1] as Dayjs,
            }));
          }}
        />
      </LocalizationProvider>
    </Box>
        </Grid>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Box display="flex" alignItems="center">
      <Typography sx={{ minWidth: 120, mr: 2 }} variant="subtitle2">
        Planned Date Range
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateRangePicker
          localeText={{ start: "Planned Start", end: "Planned End" }}
          slotProps={{
            actionBar: {
              actions: ["clear"],
            },
          }}
          value={[
            filterProjectParam.plannedStartDate as Dayjs,
            filterProjectParam.plannedEndDate as Dayjs,
          ]}
          onChange={(newValue) => {
            setFilterProjectParam((prevState) => ({
              ...prevState,
              plannedStartDate: newValue[0] as Dayjs,
              plannedEndDate: newValue[1] as Dayjs,
            }));
          }}
        />
      </LocalizationProvider>
    </Box>
  </Grid>
  {/* Diğer filtreler için aynı yapıyı kullanabilirsiniz */}

</Grid>
        <Grid sx={{ xs: 12, display: "flex", justifyContent: "flex-end" }}>
            <Box display="flex" justifyContent="flex-end" width="100%" mt={2}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<SearchIcon />}
        onClick={() => filterProjects(filterProjectParam)}
        style={{ marginRight: "10px" }}
      >
        Search
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<ClearIcon />}
        onClick={clearFilters}
      >
        Clear Filter
      </Button>
    </Box>
        </Grid>
      <ProjectList
        pageNumber={filterProjectParam.pageNumber}
        pageSize={filterProjectParam.pageSize}
        filterProjectParameters={filterProjectParam}
        filterProjects={filterProjects}
        filteredProjectList={filteredProjectList}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
      />
    </Container>
  );
};
export default FilterProject;
