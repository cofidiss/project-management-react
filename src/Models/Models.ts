import dayjs, { Dayjs } from 'dayjs';
import { ReactNode } from 'react';

export interface BottomMenuProps {
  onMenuClick: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// FlightData.ts
export interface FlightData {
  data: FlightDataItem[];
}

// FlightDataItem.ts
export interface FlightDataItem {
  flightId: string; // "fr24Id" mapped to "flightId"
  latitude: number; // "lat" mapped to "latitude"
  longitude: number; // "lon" mapped to "longitude"
  altitude: number; // "alt" mapped to "altitude"
  groundSpeed: number; // "gspeed" mapped to "groundSpeed"
  track: number; // "track" mapped to "track"
  timestamp: string; // "timestamp" mapped to "timestamp"
  flightNumber: string; // "flight" mapped to "flightNumber"
  callsign: string; // "callsign" mapped to "callsign"
  hexCode: string; // "hex" mapped to "hexCode"
  aircraftType: string; // "type" mapped to "aircraftType"
  registration: string; // "reg" mapped to "registration"
  originIcao: string; // "origIcao" mapped to "originIcao"
  destinationIcao: string; // "destIata" mapped to "destinationIcao"
  estimatedArrival: string;
}
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
export type AddTaskFormState = {
  name: string;
  projectId: number | '';
  parentTaskId: number | '';
  categoryId: number | '';
  priority: number | '';
  totalRequiredManHour: number | '';
  plannedStartDate: Dayjs | null;
  plannedEndDate: Dayjs | null;
  description?: string;
};
export type FormActionType<FormType> =
  | { type: 'SET_FIELD'; field: keyof FormType; value: any }
  | { type: 'RESET' }
  | { type: 'REPLACE'; value: FormType };


export type FlightCoordinateRangeFilter = {
  latitudeMin?: number;
  latitudeMax?: number;
  longitudeMin?: number;
  longitudeMax?: number;
};

export type SideBarformState = {
  altitudeMin?: number;
  altitudeMax?: number;
  groundSpeedMin?: number;
  groundSpeedMax?: number;
  category?: string;
  sessionId?: string;
};

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