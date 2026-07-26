import React, {
  ReactNode,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { Backdrop, Box, CircularProgress, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../components/Navbar/Navbar';
import {
  AppContextType,
  CustomModalProps,
  
  
} from '../Models/Models';
import CustomModal from '../components/CustomModal/CustomModal';
import { UserRole } from '../Models/Models';
import { IsLoggedIn } from '../services/authService';
const theme = createTheme({
  palette: {
    background: {
      default: '#f0f2f5', // Arka plan rengi
    },
  },
});

export const AppContext = React.createContext<AppContextType>({
  loading: false,
  startLoading: () => {},
  stopLoading: () => {},
  setModal1State: (modalProps: Omit<CustomModalProps, 'onClose'>) => {},
  setModal2State: (modalProps: Omit<CustomModalProps, 'onClose'>) => {},
  refreshNavbar: () => {},
  setIsLoggedIn: () => {},
  isLoggedIn: false,
  setUserRole: () => {},
  globalCss: { componentBackgroundColor: '#f9f9f933' },
  userRole: null
});

export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const [modal1State, setModal1State] = useState<CustomModalProps>({
    isOpen: false,
    title: '',
    message: undefined,
    okButtonText: undefined,
    okButtonClick: undefined,
    leftButtonText: undefined,
    leftButtonClick: undefined,
    rightButtonText: undefined,
    rightButtonClick: undefined,
    children: undefined,
  });
  const [modal2State, setModal2State] = useState<CustomModalProps>({
    isOpen: false,
    title: '',
    message: undefined,
    okButtonText: undefined,
    okButtonClick: undefined,
    leftButtonText: undefined,
    leftButtonClick: undefined,
    rightButtonText: undefined,
    rightButtonClick: undefined,
    children: undefined,
  });
  const startLoading = () => setLoadingCount((prev) => prev + 1);

  const stopLoading = () => {
    debugger;

    setLoadingCount((prev) => prev - 1);
  };

  const refreshNavbar = () => {
    // Implement the logic to refresh the navbar
    console.log('Navbar refreshed');
  };

  useEffect(() => {
    console.log('isLoggedIn' + isLoggedIn);
    if (!isLoggedIn) {
      setUserRole(null);
      return;
    }
    debugger;
    var response = startLoading();
    fetch(`${baseUrl}/api/user/getUserRole`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('getUserRole başarılı');
          return response.json().then((data) => {      
            setUserRole( Number(data) as UserRole);
          });
        }
      })
      .catch((e) => {
        console.log('getUserRole başarısız ' + e);
      })
      .finally(() => {
        stopLoading();
      });
  }, [isLoggedIn]);

  useEffect(() => {
    IsLoggedIn(baseUrl as string).then((result) => {
      setIsLoggedIn(result);
    });
  }, []);


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AppContext.Provider
        value={{
          loading: loadingCount > 0,
          startLoading: startLoading,
          stopLoading: stopLoading,
          setModal1State: setModal1State,
          setModal2State: setModal2State,
          refreshNavbar: refreshNavbar,
          setIsLoggedIn: setIsLoggedIn,
          isLoggedIn: isLoggedIn,
          globalCss: { componentBackgroundColor: '#f9f9f933' },
          userRole: userRole,
          setUserRole: setUserRole
        }}
      >
        <Navbar />
        <ThemeProvider theme={theme}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          
                 bgcolor="rgba(56, 39, 39, 0)"
              boxShadow={3}
              borderRadius={2}
          >           <CssBaseline />
          {children}</Box>

        </ThemeProvider>
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
          open={loadingCount > 0}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <CustomModal
          isOpen={modal1State.isOpen}
          title={modal1State.title}
          message={modal1State.message}
          leftButtonClick={modal1State.leftButtonClick}
          leftButtonText={modal1State.leftButtonText}
          rightButtonClick={modal1State.rightButtonClick}
          rightButtonText={modal1State.rightButtonText}
          okButtonClick={modal1State.okButtonClick}
          okButtonText={modal1State.okButtonText}
        >
          {modal1State.children}
        </CustomModal>
        <CustomModal
          isOpen={modal2State.isOpen}
          title={modal2State.title}
          message={modal2State.message}
          leftButtonClick={modal2State.leftButtonClick}
          leftButtonText={modal2State.leftButtonText}
          rightButtonClick={modal2State.rightButtonClick}
          rightButtonText={modal2State.rightButtonText}
          okButtonClick={modal2State.okButtonClick}
          okButtonText={modal2State.okButtonText}
        >
          {modal2State.children}
        </CustomModal>
      </AppContext.Provider>
    </LocalizationProvider>
  );
};
