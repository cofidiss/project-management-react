import React, { useContext, useEffect, useReducer, useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { setLovState } from '../../utils';
import { AppContext } from '../../Contexts/AppContext';
import { AddProjectFormState, CommonLov, FormActionType, UpdateProjectProps } from '../../Models/Models';


const reducer = (state: AddProjectFormState | null, action: FormActionType<AddProjectFormState>): AddProjectFormState | null  => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'REPLACE':
      return action.value;  
      default:
      return state;
  }
};

const UpdateProject: React.FC<UpdateProjectProps> = ({ projectId, filterProjectParameters, filterProjects }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { startLoading, stopLoading, setModal2State } = useContext(AppContext);

  const [formState, dispatch] = useReducer(reducer, null);
  const [categoryLov, setCategoryLov] = useState<CommonLov[]>([]);
  const [statusLov, setStatusLov] = useState<CommonLov[]>([]);

  useEffect(() => {
    setLovState(setCategoryLov, "api/project/getCategoryLov", startLoading, stopLoading, baseUrl);
    setLovState(setStatusLov, "api/project/getStatusLov", startLoading, stopLoading, baseUrl);
    getProjectData();
  }, []);
const getProjectData = () => {
    startLoading();
    
    fetch(`${baseUrl}/api/project/?projectId=${projectId}`)
      .then((res) => {
        if (res.ok) {
          return res.json().then((data) => {
            dispatch({ type: 'REPLACE', value: data });
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
  const handleUpdate = () => {
    startLoading();
    let modalMessage = '';

    fetch(`${baseUrl}/api/project/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formState),
    })
      .then((res) => {
        if (res.ok) {
          modalMessage = 'Project updated successfully';
        } else {
          return res.text().then((msg) => { modalMessage = msg; });
        }
      })
      .catch(() => {
        modalMessage = 'Error in Project update';
      })
      .finally(() => {
        setModal2State({
          isOpen: true,
          title: modalMessage,
          okButtonText: "OK",
          okButtonClick: () => {
            filterProjects(filterProjectParameters);
            setModal2State({ isOpen: false });
          },
        });
        stopLoading();
      });
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
      <TextField
        label="Proje Name"
        value={formState?.name || ''} 
        onChange={e => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
      />
      <TextField
        label="Description"
        multiline rows={3}
        value={formState?.description || ''}
        onChange={e => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
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

      <FormControl fullWidth>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={formState?.categoryId || 0}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'categoryId', value: Number(e.target.value) })}
        >
          {categoryLov.map(c => (
            <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          value={formState?.statusId || 0}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'statusId', value: Number(e.target.value) })}
        >
          {statusLov.map(s => (
            <MenuItem key={s.id} value={s.id}>{s.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Update Project
      </Button>
    </Box>
  );
};

export default UpdateProject;
