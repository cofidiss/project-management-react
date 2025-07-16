import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useContext, useEffect, useReducer, useState } from "react";
import { setLovState } from "../../utils";
import { UpdateTaskFormState, UpdateTaskProps, CommonLov, FormActionType } from "../../Models/Models";
import { AppContext } from "../../Contexts/AppContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function reducer(state: UpdateTaskFormState, action: FormActionType<UpdateTaskFormState>): UpdateTaskFormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    case 'REPLACE':
      return { ...action.value };
    default:
      return state;
  }
}

const initialState: UpdateTaskFormState = {
  name: '',
  projectId: null,
  parentTaskId: null,
  statusId: null,
  hasChildTasks: false,
  priority: '',
  totalRequiredManHour: '',
  plannedStartDate: null,
  plannedEndDate: null,
  description: '',
  completedManHour: ''
};

const UpdateTask: React.FC<UpdateTaskProps> = ({ taskId ,getTaskForProject}) => {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading, setModal2State } = useContext(AppContext);
  const [statusLov, setStatusLov] = useState<CommonLov[]>([]);

  const getTaskInfo = (taskId: string | null) => {
    startLoading();
    fetch(`${baseUrl}/api/task/?taskId=${taskId}`)
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            dispatch({ type: 'REPLACE', value: data });
            debugger
          });
        } else {
          throw new Error('Error fetching task data');
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
    getTaskInfo(taskId);
    setLovState(setStatusLov, "api/task/getStatusLov", startLoading, stopLoading, baseUrl);
  }, []);

  const handleUpdate = () => {
    const payload = {
      id: taskId,
      name: formState.name,
      projectId: formState.projectId ,
      parentTaskId: formState.parentTaskId ,
      priority:  formState.priority,
      totalRequiredManHour: formState.totalRequiredManHour,
      plannedStartDate: formState.plannedStartDate,
      plannedEndDate: formState.plannedEndDate,
      statusId: formState.statusId,
      description: formState.description || '',
      completedManHour:  formState.completedManHour
    };

    startLoading();

    fetch(`${baseUrl}/api/task/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          setModal2State({
            isOpen: true,
            title: 'Task updated successfully',
            okButtonText: 'Ok',
            okButtonClick: () => setModal2State({ isOpen: false })
          });
        } else {
          return response.text().then((msg) => {
            setModal2State({
              isOpen: true,
              title: 'Error',
              message: msg,
              okButtonText: 'Ok',
              okButtonClick: () => setModal2State({ isOpen: false })
            });
          });
        }
      })
      .catch(() => {
        setModal2State({
          isOpen: true,
          title: 'Error',
          message: 'Error in task update',
          okButtonText: 'Ok',
          okButtonClick: () => setModal2State({ isOpen: false })
        });
      })
      .finally(() => {
          getTaskForProject(formState.projectId);
        stopLoading();
      });


  };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
      <TextField
        label="Task Name"
        value={formState.name}
        onChange={e => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
        required
      />
      <TextField
        label="Task Description"
        value={formState.description}
        onChange={e => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
        required
      />
      <TextField
        label="Priority"
        type="number"
        value={formState.priority}
        onChange={e => dispatch({ type: 'SET_FIELD', field: 'priority', value: e.target.value })}
        required
      />

      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          value={formState.statusId || ''}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'statusId', value: Number(e.target.value) })}
          disabled={formState.hasChildTasks}
          label="Status"
        >
          {statusLov.map(s => (
            <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Total Required Man Hour"
        type="number"
        value={formState.totalRequiredManHour}
        onChange={e => dispatch({ type: 'SET_FIELD', field: 'totalRequiredManHour', value: e.target.value })}
        required
        disabled={formState.hasChildTasks}
      />
      <TextField
        label="Total Completed Man Hour"
        type="number"
        value={formState.completedManHour}
        onChange={e => dispatch({ type: 'SET_FIELD', field: 'completedManHour', value: e.target.value })}
        required
        disabled={formState.hasChildTasks}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Planned Start"
          value={formState?.plannedStartDate ? dayjs(formState.plannedStartDate) : null}
          onChange={value => dispatch({ type: 'SET_FIELD', field: 'plannedStartDate', value })}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <DateTimePicker
          label="Planned End"
          value={formState?.plannedEndDate ? dayjs(formState.plannedEndDate) : null}
          onChange={value => dispatch({ type: 'SET_FIELD', field: 'plannedEndDate', value })}
          slotProps={{ textField: { fullWidth: true } }}
        />
      </LocalizationProvider>

      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Task
      </Button>
    </Box>
  );
};

export default UpdateTask;