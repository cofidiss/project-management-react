import React, { useContext } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Box,
  Button,
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { AppContext } from '../../Contexts/AppContext';
import { ProjectListProps, UserRole } from '../../Models/Models';
import { formatDateForDisplay } from '../../utils';
import UpdateProject from './UpdateProject';
import { useNavigate } from 'react-router-dom';



const ProjectList: React.FC<ProjectListProps> = ({
  filteredProjectList,
  pageNumber,
  pageSize,
  handlePageChange,
  handleRowsPerPageChange,
  filterProjectParameters,
  filterProjects
}) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { startLoading, stopLoading,setModal1State,setModal2State,userRole } = useContext(AppContext);
  const canModifyProjects = userRole === UserRole.modify;


    
const navigate = useNavigate();

const onProjectDetailClick = (projectId:number) => {

  navigate(`/project/detail/${projectId}`);
};

  const onEditClick = (projectId:number)=> {

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

    <UpdateProject projectId={projectId} filterProjectParameters={filterProjectParameters} filterProjects={filterProjects} />
  </div>)
  
  setModal1State({
      isOpen:true,
      children:modalChildren
    })
  
  
  }

    const onDeleteClick = (projectId:number)=> {
  setModal1State({
    isOpen: true,
    children: null,
    title: 'Delete Project',
    message: 'Are you sure you want to delete this project?',
    leftButtonText: 'Cancel',
    leftButtonClick: () => setModal1State({ isOpen: false }),
    rightButtonText: 'Delete',
    rightButtonClick: () => {
      startLoading();
      fetch(`${baseUrl}/api/project/?id=${projectId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
      
            filterProjects(filterProjectParameters);
          } else {
            throw new Error('Error deleting project');
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
      <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '20px' }}>
        Projects
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: 'inherit', borderRadius: '8px', boxShadow: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
        
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Action</TableCell>
          
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Project No</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Actual Start</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Actual End</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Planned Start</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Planned End</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjectList.map((project, index) => (
              <TableRow
                key={project.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9'
                }}
              >
                <TableCell>               
             {canModifyProjects && (
                  <div>
    <IconButton aria-label="edit" onClick={() => onEditClick(project.id)}>
                      <Tooltip title="Güncelle">
                        <EditIcon />
                      </Tooltip>
                    </IconButton>

                    <IconButton aria-label="delete" onClick={() => onDeleteClick(project.id)}>
                      <Tooltip title="Sil">
                        <DeleteIcon />
                      </Tooltip>
                    </IconButton>
                  </div>
                  
                )}
                    <IconButton aria-label="more" onClick={() => onProjectDetailClick(project.id)}>
                      <Tooltip title="Diğer">
                        <MoreHorizIcon />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
   
                <TableCell>{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>{project.category}</TableCell>
                <TableCell>{formatDateForDisplay(project.actualStartDate)}</TableCell>
                <TableCell>{formatDateForDisplay(project.actualEndDate)}</TableCell>
          <TableCell>{formatDateForDisplay(project.plannedStartDate)}</TableCell>
                <TableCell>{formatDateForDisplay(project.plannedEndDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={-1}
        rowsPerPage={pageSize}
        page={pageNumber }
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
          nextIconButtonProps={{
    disabled: filteredProjectList.length === 0
  }}
      />
    </div>
  );
};

export default ProjectList;