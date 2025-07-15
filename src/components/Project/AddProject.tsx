import React, { useContext, useEffect, useReducer, useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { setLovState } from '../../utils';
import { AppContext } from '../../Contexts/AppContext';
import { AddProjectFormState, AddProjectProps, CommonLov, FormActionType } from '../../Models/Models';

// Kategori örnekleri


const initialState: AddProjectFormState = {
    name: '',
    description: '',
    plannedStartDate: undefined,
    plannedEndDate: undefined,
    categoryId: 0,
    statusId: 0
};

function reducer(state: AddProjectFormState, action: FormActionType<AddProjectFormState>): AddProjectFormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
      default:
      return state;
  }
}

const AddProject: React.FC<AddProjectProps> = () => {
  const [formState, dispatch] = useReducer(reducer, initialState);
      const baseUrl = process.env.REACT_APP_BASE_URL;
        const { startLoading, stopLoading ,setModal2State} = useContext(AppContext);
const [categoryLov, setCategoryLov] = useState<CommonLov[]>([]);
useEffect(() => {
  setLovState(
    setCategoryLov,
    "api/project/getCategoryLov",
    startLoading,
    stopLoading,
    baseUrl
  );
}, []); // Empty dependency array to run only once on mount

  const handleAdd =  () => {
   startLoading();
let modalMessage :string;

    fetch(`${baseUrl}/api/project/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formState),
    })
      .then((response) => {
        if (response.ok) {
            modalMessage = 'Project added successfully';

        } else {
            return response.text().then((data) => {
              modalMessage = data;
            });
        }
      })
      .catch((error) => {
        modalMessage = 'Error in Project addition';
      })
      .finally(() => {
  setModal2State({
    isOpen:true,
    title:modalMessage,
    okButtonText:"Ok",
    okButtonClick:()=> {
  
      setModal2State({isOpen:false});
    },
            
            })
        stopLoading();
      });
};

  return (

      <Box id="asd" display="flex" flexDirection="column" gap={2} maxWidth={400} padding={2} borderRadius={2}>
        <Typography variant="h5" gutterBottom justifyContent={"center"} textAlign="center">
          Add Project
        </Typography>
        <TextField
          label="Project Name"
          value={formState.name}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
          required
        />
        <TextField
          label="Description"
          value={formState.description}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
          multiline
          rows={3}
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
     
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            label="Category"
            value={formState.categoryId}
            onChange={e => dispatch({ type: 'SET_FIELD', field: 'categoryId', value: Number(e.target.value) })}
            required
          >
            {categoryLov.map(category => (
              <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>

        <Button  variant="contained" color="primary" onClick={handleAdd}>
         Add Project
        </Button>
      </Box>

  );
};

export default AddProject;