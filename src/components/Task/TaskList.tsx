import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import AddTask from "./AddTask";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Contexts/AppContext";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TaskInfo, TaskListProps } from "../../Models/Models";
import UpdateTask from "./UpdateTask";

const TaskList: React.FC<TaskListProps> = ({ projectId }) => {
  const [taskInfoList, setTaskInfoList] = useState<TaskInfo[]>([]);
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: TaskInfo[] }>({});

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading, setModal1State, setModal2State } = useContext(AppContext);

  const onAddTaskClick = (projectId: string | null, parentTaskId: string | null): void => {
    debugger;
    console.log("onAddTaskClickss");
    const modalChildren = (
      <div>
        <Box display="flex" justifyContent="flex-end" marginBottom={2}>
          <Button
            onClick={() => setModal1State({ isOpen: false })}
            sx={{ width: '40px', height: '40px', backgroundColor: 'red', borderRadius: '0%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button>
        </Box>
        <AddTask projectId={projectId} parentTaskId={parentTaskId} getTaskForProject={getTaskForProject} />
      </div>
    );
    setModal1State({ isOpen: true, children: modalChildren });
  };

  const onEditTaskClick = (taskId: string | null): void => {
    const modalChildren = (
      <div>
        <Box display="flex" justifyContent="flex-end" marginBottom={2}>
          <Button
            onClick={() => setModal1State({ isOpen: false })}
            sx={{ width: '40px', height: '40px', backgroundColor: 'red', borderRadius: '0%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </Button>
        </Box>
        <UpdateTask taskId={taskId} getTaskForProject={getTaskForProject} />
      </div>
    );
    setModal1State({ isOpen: true, children: modalChildren });
  };

  const onDeleteTaskClick = (taskId: string | null) => {
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
        fetch(`${baseUrl}/api/task/?id=${taskId}`, { method: 'DELETE' })
          .then((res) => {
            if (!res.ok)
             throw new Error('Error deleting task');
          })
          .catch((error) => {
            console.error(error);
            setModal2State({ isOpen: true, title: 'Error', message: error.message, okButtonText: "Ok", okButtonClick: () => setModal2State({ isOpen: false }) });
          })
          .finally(() => {
            getTaskForProject(projectId);
            setModal1State({ isOpen: false });
            stopLoading();
          });
      }
    });
  };

  const getTaskForProject = (projectId: string | null) => {
    startLoading();
    fetch(`${baseUrl}/api/task/getTasksByProjectId?projectId=${projectId}`)
      .then(res => res.ok ? res.json() : Promise.reject('Error fetching tasks'))
      .then(data => setTaskInfoList(data))
      .catch(console.error)
      .finally(stopLoading);
      setExpandedRows({});
  };

  const fetchChildTasks = (parentId: number) => {
    debugger;
    if (expandedRows[parentId]) {
      const copy = { ...expandedRows };
      delete copy[parentId];
      setExpandedRows(copy);
      return;
    }
    startLoading();
    fetch(`${baseUrl}/api/task/getChildTasks?parentTaskId=${parentId}`)
      .then(res => res.ok ? res.json() : Promise.reject('Error fetching children'))
      .then(data => setExpandedRows(prev => ({ ...prev, [parentId]: data })))
      .catch(console.error)
      .finally(stopLoading);
  };

  useEffect(() => {
    getTaskForProject(projectId);
  }, [projectId]);

  const renderTaskRow = (task: TaskInfo, index: number) => (
    <>
      <TableRow
        key={task.id}
        sx={{ '&:hover': { backgroundColor: '#f0f0f0' }, backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}
      >
        <TableCell>
          <Tooltip title="Add"><IconButton onClick={() => onAddTaskClick(task.projectId.toString(), task.id.toString())}><AddIcon /></IconButton></Tooltip>
          <Tooltip title="Edit"><IconButton onClick={() => onEditTaskClick(task.id.toString())}><EditIcon /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton onClick={() => onDeleteTaskClick(task.id.toString())}><DeleteIcon /></IconButton></Tooltip>
          {task.hasChildTasks && (
            <Tooltip title="View Subtasks">
              <IconButton onClick={() => fetchChildTasks(task.id)}><VisibilityIcon /></IconButton>
            </Tooltip>
          )}
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
      {expandedRows[task.id]?.map((subtask, i) => (
        <TableRow key={`sub-${subtask.id}`} sx={{ backgroundColor: '#e3f2fd' }}>
          <TableCell> <Tooltip title="Edit"><IconButton onClick={() => onEditTaskClick(subtask.id.toString())}><EditIcon /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton onClick={() => onDeleteTaskClick(subtask.id.toString())}><DeleteIcon /></IconButton></Tooltip></TableCell>
          <TableCell>{subtask.id}</TableCell>
          <TableCell>{subtask.name}</TableCell>
          <TableCell>{subtask.totalRequiredManHour}</TableCell>
          <TableCell>{subtask.completedManHour}</TableCell>
          <TableCell>{subtask.actualStartDate}</TableCell>
          <TableCell>{subtask.actualEndDate}</TableCell>
          <TableCell>{subtask.plannedStartDate}</TableCell>
          <TableCell>{subtask.plannedEndDate}</TableCell>
          <TableCell>{subtask.projectId}</TableCell>
          <TableCell>{subtask.parentTaskId ?? '-'}</TableCell>
          <TableCell>{subtask.priority}</TableCell>
          <TableCell>{subtask.status}</TableCell>
        </TableRow>
      ))}
    </>
  );

  return (
    <div>
      <Grid sx={{ xs: 12, display: "flex", justifyContent: "flex-end" }}>
        <Box display="flex" justifyContent="flex-end" width="100%" mt={2}>
          <Button variant="contained" style={{ marginRight: "10px", backgroundColor: "#4caf50", color: "#fff" }} startIcon={<AddIcon />} onClick={() => onAddTaskClick(projectId, null)}>
            Add
          </Button>
        </Box>
      </Grid>
      <Typography variant="h5" align="center" gutterBottom sx={{ mt: 2 }}>Tasks</Typography>
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
            {taskInfoList.map((task, index) => renderTaskRow(task, index))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TaskList;
