import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useContext, useEffect, useReducer, useState } from "react";
import { setLovState } from "../../utils";
import { AddTaskFormState, CommonLov, FormActionType } from "../../Models/Models";
import { AppContext } from "../../Contexts/AppContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const initialState: AddTaskFormState = {
    name: '',
    projectId: '',
    parentTaskId: '',
    categoryId: '',
    priority: '',
    totalRequiredManHour: '',
    plannedStartDate: dayjs(),
    plannedEndDate: dayjs(),
    description: ''
};
function reducer(state: AddTaskFormState, action: FormActionType<AddTaskFormState>): AddTaskFormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const AddTask: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading } = useContext(AppContext);
  const [categoryLov, setCategoryLov] = useState<CommonLov[]>([]);
  // Proje ve parent task için örnek veri, API'den çekebilirsiniz
  const [projectLov, setProjectLov] = useState<{ id: number; name: string }[]>([]);
  const [parentTaskLov, setParentTaskLov] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    setLovState(
      setCategoryLov,
      "api/task/category",
      startLoading,
      stopLoading,
      baseUrl
    );
    // Proje ve parent task listelerini burada fetch edebilirsiniz
    // setProjectLov([...]);
    // setParentTaskLov([...]);
  }, []);

  const handleAdd = () => {

    const payload = {
      name: state.name,
      projectId: state.projectId ? Number(state.projectId) : null,
      parentTaskId: state.parentTaskId ? Number(state.parentTaskId) : null,
      categoryId: state.categoryId ? Number(state.categoryId) : null,
      priority: state.priority ? Number(state.priority) : null,
      totalRequiredManHour: state.totalRequiredManHour ? Number(state.totalRequiredManHour) : null,
      plannedStartDate: state.plannedStartDate?.toISOString(),
      plannedEndDate: state.plannedEndDate?.toISOString()
    };
    console.log(payload);
    dispatch({ type: 'RESET' });
  };

  return (

      <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
        <TextField
          label="Task Name"
          value={state.name}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
          required
        />
        <FormControl fullWidth>
          <InputLabel id="project-label">Project</InputLabel>
          <Select
            labelId="project-label"
            label="Project"
            value={state.projectId}
            onChange={e => dispatch({ type: 'SET_FIELD', field: 'projectId', value: Number(e.target.value) })}
            required
          >
            {projectLov.map(project => (
              <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="parent-task-label">Parent Task</InputLabel>
          <Select
            labelId="parent-task-label"
            label="Parent Task"
            value={state.parentTaskId}
            onChange={e => dispatch({ type: 'SET_FIELD', field: 'parentTaskId', value: Number(e.target.value) })}
          >
            <MenuItem value="">None</MenuItem>
            {parentTaskLov.map(task => (
              <MenuItem key={task.id} value={task.id}>{task.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="category-label">Task Category</InputLabel>
          <Select
            labelId="category-label"
            label="Task Category"
            value={state.categoryId}
            onChange={e => dispatch({ type: 'SET_FIELD', field: 'categoryId', value: Number(e.target.value) })}
            required
          >
            {categoryLov.map(category => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Priority"
          type="number"
          value={state.priority}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'priority', value: e.target.value })}
          required
        />
        <TextField
          label="Total Required Man Hour"
          type="number"
          value={state.totalRequiredManHour}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'totalRequiredManHour', value: e.target.value })}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Planned Start"
            value={state.plannedStartDate}
            onChange={value => dispatch({ type: 'SET_FIELD', field: 'plannedStartDate', value })}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <DateTimePicker
            label="Planned End"
            value={state.plannedEndDate}
            onChange={value => dispatch({ type: 'SET_FIELD', field: 'plannedEndDate', value })}
            slotProps={{ textField: { fullWidth: true } }}
          />
        </LocalizationProvider>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add Task
        </Button>
      </Box>

  );
};

export default AddTask;