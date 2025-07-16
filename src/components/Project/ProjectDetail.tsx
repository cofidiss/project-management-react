import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Contexts/AppContext";
import { ProjectDetailInfo } from "../../Models/Models";
import { useParams } from "react-router-dom";
import AddTask from "../Task/AddTask";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Task } from "@mui/icons-material";
import TaskList from "../Task/TaskList";
const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [projectDetailInfo, setProjectDetailInfo] = useState<ProjectDetailInfo | null>(null);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading, setModal1State } = useContext(AppContext);
useEffect(() => {
    getProjectData();
  // Fetch project details or perform any side effects here
}, []); 
const getProjectData = () => {
        startLoading();

    fetch(`${baseUrl}/api/project/detail?projectId=${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            setProjectDetailInfo(data);
          });
        } else {
          throw new Error('Error fetching project data');
        }
      })     
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        stopLoading();
      });
  };



  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" gutterBottom textAlign={"center"} sx={{ mb: 6 }}>
        Project Detail
      </Typography>
      <Grid container spacing={2}>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Box display="flex" alignItems="center">
      <Typography variant="h6" color="text.primary" sx={{ minWidth: 120, fontWeight: "bold" }}>
        Name
      </Typography>
      <Typography variant="body1" sx={{ ml: 2 }}>
        {projectDetailInfo?.name ?? "-"}
      </Typography>
    </Box>
  </Grid>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Box display="flex" alignItems="center">
      <Typography variant="h6" color="text.primary" sx={{ minWidth: 120, fontWeight: "bold" }}>
        Category
      </Typography>
      <Typography variant="body1" sx={{ ml: 2 }}>
        {projectDetailInfo?.category ?? "-"}
      </Typography>
    </Box>
  </Grid>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Box display="flex" alignItems="center">
      <Typography variant="h6" color="text.primary" sx={{ minWidth: 120, fontWeight: "bold" }}>
        Status
      </Typography>
      <Typography variant="body1" sx={{ ml: 2 }}>
        {projectDetailInfo?.status ?? "-"}
      </Typography>
    </Box>
  </Grid>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Box display="flex" alignItems="center">
      <Typography variant="h6" color="text.primary" sx={{ minWidth: 120, fontWeight: "bold" }}>
        Planned Start
      </Typography>
      <Typography variant="body1" sx={{ ml: 2 }}>
        {projectDetailInfo?.plannedStartDate ?? "-"}
      </Typography>
    </Box>
  </Grid>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Box display="flex" alignItems="center">
      <Typography variant="h6" color="text.primary" sx={{ minWidth: 120, fontWeight: "bold" }}>
        Planned End
      </Typography>
      <Typography variant="body1" sx={{ ml: 2 }}>
        {projectDetailInfo?.plannedEndDate ?? "-"}
      </Typography>
    </Box>
  </Grid>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Box display="flex" alignItems="center">
      <Typography variant="h6" color="text.primary" sx={{ minWidth: 120, fontWeight: "bold" }}>
        Actual Start
      </Typography>
      <Typography variant="body1" sx={{ ml: 2 }}>
        {projectDetailInfo?.actualStartDate ?? "-"}
      </Typography>
    </Box>
  </Grid>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Box display="flex" alignItems="center">
      <Typography variant="h6" color="text.primary" sx={{ minWidth: 120, fontWeight: "bold" }}>
        Actual End
      </Typography>
      <Typography variant="body1" sx={{ ml: 2 }}>
        {projectDetailInfo?.actualEndDate ?? "-"}
      </Typography>
    </Box>
  </Grid>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <Box display="flex" alignItems="center">
      <Typography variant="h6" color="text.primary" sx={{ minWidth: 120, fontWeight: "bold" }}>
        Description
      </Typography>
      <Typography variant="body1" sx={{ ml: 2 }}>
        {projectDetailInfo?.description ?? "-"}
      </Typography>
    </Box>
  </Grid>
</Grid>
    <TaskList projectId={id ?? null} />
    </Paper>


  );
};

export default ProjectDetail;