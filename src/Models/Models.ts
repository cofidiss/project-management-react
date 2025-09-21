import exp from 'constants';
import dayjs, { Dayjs } from 'dayjs';
import { ReactNode } from 'react';



// FlightData.ts

export type globalCss = {
  componentBackgroundColor: string;
};
export interface AppContextType {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  setModal1State: (modalProps: Omit<CustomModalProps, 'onClose'>) => void; // Method to set modal state
  setModal2State: (modalProps: Omit<CustomModalProps, 'onClose'>) => void; // Method to set modal state
  refreshNavbar: () => void;
  setIsLoggedIn: (param: boolean) => void;
  userRoles: UserRole[];
  setUserRoles: React.Dispatch<React.SetStateAction<UserRole[]>>;
  isLoggedIn: boolean;
  globalCss: globalCss;

}
export interface CustomModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  okButtonText?: string;
  okButtonClick?: () => void;
  leftButtonText?: string;
  leftButtonClick?: () => void;
  rightButtonText?: string;
  rightButtonClick?: () => void;
  children?: ReactNode;
}

export type FilterProjectParameters = {
  name?: string;
  actualStartDate?: Dayjs ;
    actualEndDate?: Dayjs ;
      plannedStartDate?: Dayjs ;
    plannedEndDate?: Dayjs ;
  statusId?: number;
  categoryId?: number;
    pageNumber: number;
    pageSize: number;


};
export type UpdateProjectProps = {
  projectId: number; 
    filterProjects: (filterProjectParameters:FilterProjectParameters)=> void;
  filterProjectParameters: FilterProjectParameters;
};
export type FilteredProject = {
  id: number;
  name?: string;
  description?: string;
  actualStartDate?: string ;
    actualEndDate?: string ;
      plannedStartDate?: string ;
    plannedEndDate?: string ;
  status?: string;
  category?: string;

};


export type ProjectDetailInfo = {
  id: number;
  name?: string;
  description?: string;
  actualStartDate?: string ;
    actualEndDate?: string ;
      plannedStartDate?: string ;
    plannedEndDate?: string ;
  status?: string;
  category?: string;

};
export type ProjectListProps = {
  filteredProjectList: FilteredProject[];
  pageNumber: number;
  pageSize: number;
  handlePageChange: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        filterProjects: (filterProjectParameters:FilterProjectParameters)=> void;
  filterProjectParameters: FilterProjectParameters;
}

export type CommonLov = {
  id: number;
  name: string;
};
export type AddProjectProps = {

}

export type  AddProjectFormState = {
  name?: string;
  description?: string;
  plannedStartDate?: Dayjs ;
  plannedEndDate?: Dayjs ;
  categoryId?: number;
  statusId?: number;
};
export type  UpdateProjectFormState = {
  name?: string;
  description?: string;
  plannedStartDate?: Dayjs ;
  plannedEndDate?: Dayjs ;
  categoryId?: number;
  statusId?: number;
};
export type AddTaskFormState = {
  name: string;
  parentTaskId: string ;
  priority: number | '';
  totalRequiredManHour: number | '';
  plannedStartDate: Dayjs | null;
  plannedEndDate: Dayjs | null;
  description?: string;
  projectId?: string | null;
};
export type UpdateTaskFormState = {
  name: string;
  projectId: string | null;
  parentTaskId: string | null;
  statusId: string | null;
  hasChildTasks?: boolean;
  priority: number | '';
  totalRequiredManHour: number | '';
  plannedStartDate: Dayjs | null;
  plannedEndDate: Dayjs | null;
  description?: string;
  completedManHour: number | '';
};
export type UpdateTaskProps = {
taskId:string | null;
getTaskForProject: (projectId: string | null) => void;
};


export type FormActionType<FormType> =
  | { type: 'SET_FIELD'; field: keyof FormType; value: any }
  | { type: 'RESET' }
  | { type: 'REPLACE'; value: FormType };
export type AddTaskProps = {
  projectId: string | null;
  parentTaskId?: string | null;
  getTaskForProject: (projectId: string | null) => void;  
};
export type TaskInfo = {
id: number;
  name: string;
  totalRequiredManHour: number;
  completedManHour: number;
  actualStartDate: string;
  actualEndDate: string;
  plannedStartDate: string;
  plannedEndDate: string;
  projectId: number;
  parentTaskId: number | null;
  priority: number;
  status: string;  
    statusId: number;  
    hasChildTasks: boolean;
}
export type TaskListProps = {
  projectId: string | null ;
}


export type SignUpFormState = {
  username: string;
  password: string;
  confirmPassword: string;
  address: string;
  phone: string;
  error: string;
  roleId?: number;
};

export type SignUpFormAction =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'CLEAR_ERROR' };

export enum  UserRole{
 read,
    write,
    delete,
};


export type PieData = {
  label: string;
  value: number;
};