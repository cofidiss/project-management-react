import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import AddTask from "./AddTask";
import { use, useContext, useEffect, useState } from "react";
import { AppContext } from "../../Contexts/AppContext";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { TaskInfo, TaskListProps } from "../../Models/Models";
import UpdateTask from "./UpdateTask";
const TaskList: React.FC<TaskListProps> = ({
 projectId
}) => {
    const [taskInfoList, setTaskInfoList] = useState<TaskInfo[]>([]);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading, setModal1State ,setModal2State} = useContext(AppContext);

        const onAddTaskClick = (projectId: string | null, parentTaskId: string | null): void => {

              const modalChildren = (
    <div>
     <Box display="flex" justifyContent="flex-end" marginBottom={2}>
     <Button
        onClick={() => setModal1State({ isOpen: false })}
        sx={{
          width: '40px', // Butonun genişliği
          height: '40px', // Butonun yüksekliği
          backgroundColor: 'red', // Dışarısı kırmızı
          borderRadius: '0%', // Kare görünüm için
          display: 'flex', // İçerikleri ortalamak için
          justifyContent: 'center', // Yatay ortalama
          alignItems: 'center', // Dikey ortalama
          padding: 0, // İç boşlukları kaldırmak için
        }}
      >
        <CloseIcon sx={{ color: 'white' }} /> {/* İçi beyaz çarpı */}
      </Button>
        </Box>

    <AddTask projectId={projectId} parentTaskId={parentTaskId} getTaskForProject={getTaskForProject} />
  </div>)
  
  setModal1State({
      isOpen:true,
      children:modalChildren
    })
  
            // Open the AddTask modal or navigate to the AddTask page
            console.log(`Add task for project ID: ${projectId}`);

    }
        const onEditTaskClick = (taskId:  string | null): void => {

              const modalChildren = (
    <div>
     <Box display="flex" justifyContent="flex-end" marginBottom={2}>
     <Button
        onClick={() => setModal1State({ isOpen: false })}
        sx={{
          width: '40px', // Butonun genişliği
          height: '40px', // Butonun yüksekliği
          backgroundColor: 'red', // Dışarısı kırmızı
          borderRadius: '0%', // Kare görünüm için
          display: 'flex', // İçerikleri ortalamak için
          justifyContent: 'center', // Yatay ortalama
          alignItems: 'center', // Dikey ortalama
          padding: 0, // İç boşlukları kaldırmak için
        }}
      >
        <CloseIcon sx={{ color: 'white' }} /> {/* İçi beyaz çarpı */}
      </Button>
        </Box>

    <UpdateTask taskId={taskId}  getTaskForProject={getTaskForProject} />
  </div>)
  
  setModal1State({
      isOpen:true,
      children:modalChildren
    })
  
            // Open the AddTask modal or navigate to the AddTask page
            console.log(`Add task for project ID: ${projectId}`);

    }
const getTaskForProject = (projectId: string | null) => {
    startLoading();
    fetch(`${baseUrl}/api/task/getTasksByProjectId?projectId=${projectId}`)
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setTaskInfoList(data);
          });
        } else {
          throw new Error('Error fetching tasks');
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        stopLoading();
      });
  };

  useEffect(() => {
    // Fetch tasks for the project when the component mounts
    getTaskForProject(projectId);
  }, [projectId]);  
useEffect(() => {   
    // Fetch tasks for the project when the component mounts
    startLoading();
    fetch(`${baseUrl}/api/task/getTasksByProjectId?projectId=${projectId}`)
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setTaskInfoList(data);
          });   
        } else {
          throw new Error('Error fetching tasks');
        }
      })
      .then((data) => {
        // Handle the fetched task data
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        stopLoading();
      });
  } , [projectId]); // Dependency array to re-fetch when projectId changes
  const onDeleteTaskClick = (taskId:string | null)=> {
  setModal1State({
    isOpen: true,
    children: null,
    title: 'Delete Task',
    message: 'Are you sure you want to delete this task?',
    leftButtonText: 'Cancel',
    leftButtonClick: () => setModal1State({ isOpen: false }),
    rightButtonText: 'Delete',
    rightButtonClick: () => {
      startLoading();
      fetch(`${baseUrl}/api/task/?id=${taskId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {

            getTaskForProject(projectId);
          } else {
            throw new Error('Error deleting task');
          }
        })
        .catch((error) => {
          console.error(error);
          setModal2State({ isOpen: true, title: 'Error', message: error.message, okButtonText: "Ok", okButtonClick: () => {
            setModal2State({ isOpen: false });
          } });
        }).finally(() => {
          setModal1State({ isOpen: false });
          stopLoading();
        });
    }
  });
};



  return (
    <div>
                <Grid sx={{ xs: 12, display: "flex", justifyContent: "flex-end" }}>
            <Box display="flex" justifyContent="flex-end" width="100%" mt={2}>
      <Button
        variant="contained"
      style={{
    marginRight: "10px",
    backgroundColor: "#4caf50", // MUI yeşil
    color: "#fff"

  }}
        startIcon={<AddIcon  />}
        onClick={() => onAddTaskClick(projectId, null)} // Pass projectId and null for parentTaskId
      >
        Add
      </Button>
    
    </Box>
        </Grid>
      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2 }}>
        Tasks
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: 'inherit', borderRadius: 2, boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Actions</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>id</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Total Man Hour</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Completed Man Hour</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Actual Start</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Actual End</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Planned Start</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Planned End</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Project ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Parent Task ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Priority</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskInfoList.map((task, index) => (
              <TableRow
                key={task.id}
                sx={{
                  '&:hover': { backgroundColor: '#f0f0f0' },
                  backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9'
                }}
              >
                <TableCell>
                  <Tooltip title="Add">
                    <IconButton onClick={() => onAddTaskClick(null, task.id.toString())} ><AddIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => onEditTaskClick(task.id.toString())} ><EditIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => onDeleteTaskClick(task.id.toString())} ><DeleteIcon /></IconButton>
                  </Tooltip>
                </TableCell>
                              <TableCell>{task.id}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.totalRequiredManHour}</TableCell>
                <TableCell>{task.completedManHour}</TableCell>
                <TableCell>{task.actualStartDate}</TableCell>
                <TableCell>{task.actualEndDate}</TableCell>
                <TableCell>{task.plannedStartDate}</TableCell>
                <TableCell>{task.plannedEndDate}</TableCell>
                <TableCell>{task.projectId}</TableCell>
                <TableCell>{task.parentTaskId ?? '-'}</TableCell>  
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     
    </div>
  );
};

export default TaskList;