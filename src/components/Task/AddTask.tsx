import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useContext, useEffect, useReducer, useState } from "react";
import { setLovState } from "../../utils";
import { AddTaskFormState, AddTaskProps, CommonLov, FormActionType } from "../../Models/Models";
import { AppContext } from "../../Contexts/AppContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const initialState: AddTaskFormState = {
    name: '',
    parentTaskId: '',
    priority: 1,
    totalRequiredManHour: 0,
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

const AddTask: React.FC<AddTaskProps> = ({ projectId , getTaskForProject,parentTaskId }) => {
  initialState.parentTaskId = parentTaskId || ''; 
    initialState.projectId = projectId || ''; 
  const [formState, dispatch] = useReducer(reducer, initialState);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading, setModal2State } = useContext(AppContext);
  const [categoryLov, setCategoryLov] = useState<CommonLov[]>([]);
  // Proje ve parent task için örnek veri, API'den çekebilirsiniz


  useEffect(() => {
    setLovState(
      setCategoryLov,
      "api/task/getStatusLov",
      startLoading,
      stopLoading,
      baseUrl
    );

  }, []);

  const handleAdd = () => {
debugger;
    const payload = {
      name: formState.name,
      projectId: formState.projectId ,
      parentTaskId: formState.parentTaskId ,      
      priority: formState.priority ,
      totalRequiredManHour: formState.totalRequiredManHour,
      plannedStartDate: formState.plannedStartDate,
      plannedEndDate: formState.plannedEndDate
    };

    startLoading();
let modalMessage :string;

    fetch(`${baseUrl}/api/task/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
            modalMessage = 'task added successfully';

        } else {
            return response.text().then((data) => {
              modalMessage = data;
            });
        }
      })
      .catch((error) => {
        modalMessage = 'Error in task addition';
      })
      .finally(() => {
  setModal2State({
    isOpen:true,
    title:modalMessage,
    okButtonText:"Ok",
    okButtonClick:()=> {
  getTaskForProject(projectId)
      setModal2State({isOpen:false});
    },
            
            })
        stopLoading();
      });
    console.log(payload);
    dispatch({ type: 'RESET' });
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
          label="Priority"
          type="number"
          value={formState.priority}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'priority', value: e.target.value })}
          required
        />
        <TextField
          label="Total Required Man Hour"
          type="number"
          value={formState.totalRequiredManHour}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'totalRequiredManHour', value: e.target.value })}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Planned Start"
            value={formState.plannedStartDate}
            onChange={value => dispatch({ type: 'SET_FIELD', field: 'plannedStartDate', value })}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <DateTimePicker
            label="Planned End"
            value={formState.plannedEndDate}
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