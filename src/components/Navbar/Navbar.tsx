import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext";

import {
  Settings as SettingsIcon,
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
  List as ListIcon,
  Add as AddIcon,
  Assessment as ReportIcon,
} from "@mui/icons-material";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { UserRole } from "../../Models/Models";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, isLoggedIn, userRoles, setUserRoles } =
    useContext(AppContext);
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [projectsAnchorEl, setProjectsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [reportAnchorEl, setReportAnchorEl] = useState<null | HTMLElement>(
    null
  );
  setIsLoggedIn(true); // Temporary fix for testing, remove later
  // Settings menu handlers
  const handleSettingsOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };
  const handleSettingsClose = () => setSettingsAnchorEl(null);

  // Projects menu handlers
  const handleProjectsOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setProjectsAnchorEl(event.currentTarget);
  };
  const handleProjectsClose = () => setProjectsAnchorEl(null);

  // Report menu handlers
  const handleReportOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setReportAnchorEl(event.currentTarget);
  };
  const handleReportClose = () => setReportAnchorEl(null);

  const handleProfileClick = () => {
    navigate("/profile");
    handleSettingsClose();
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("JWT");
    setIsLoggedIn(false);
    navigate("/login");
    handleSettingsClose();
  };

  // Project List & Add handlers
  const handleProjectListClick = () => {
    navigate("/project/list");
    handleProjectsClose();
  };
  const handleProjectAddClick = () => {
    navigate("/project/add");
    handleProjectsClose();
  };

  // Report submenu example (örnek)
  const handleReportSummaryClick = () => {
    navigate("/report/summary");
    handleReportClose();
  };

  const handleReportDetailClick = () => {
    navigate("/report/detail");
    handleReportClose();
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "rgba(17, 112, 221, 0.5)" }}
    >
      <Toolbar>
        {/* Sol Menü - Projects */}
        {isLoggedIn && (
          <div
            onMouseEnter={handleProjectsOpen}
            onMouseLeave={handleProjectsClose}
            style={{ marginRight: 20, position: "relative" }}
          >
            <Button
              color="inherit"
              sx={{
                borderRadius: "10px",
                padding: "5px 0",
                minWidth: "150px",               
                ...(projectsAnchorEl && {
                  border: "2px solid white",
                  borderRadius: "4px",
                  transform: "scale(1.05)",
                }),
                "& .MuiMenuItem-root": {
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  transition: "background-color 0.3s ease"         
                },
              }}
            >
              Projects
            </Button>
            <Menu
              anchorEl={projectsAnchorEl}
              open={Boolean(projectsAnchorEl)}
              onClose={handleProjectsClose}
              MenuListProps={{
                onMouseLeave: handleProjectsClose,
              }}
              PaperProps={{
                elevation: 3,
                sx: {
                  borderRadius: "10px",
                  padding: "5px 0",
                  minWidth: "150px",
                  "& .MuiMenuItem-root": {
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 20px",
                    "&:hover": {
                      backgroundColor: "#1976d2",
                      color: "white",
                      transition: "background-color 0.3s ease",
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={handleProjectListClick}>
                <ListIcon sx={{ marginRight: "10px" }} /> Project List
              </MenuItem>

              {userRoles.includes(UserRole.write) && (
                <MenuItem onClick={handleProjectAddClick}>
                  <AddIcon sx={{ marginRight: "10px" }} /> Add Project
                </MenuItem>
              )}
            </Menu>
          </div>
        )}

        {/* Sol Menü - Report */}
        {isLoggedIn && (
          <div
            onMouseEnter={handleReportOpen}
            onMouseLeave={handleReportClose}
            style={{ marginRight: 20, position: "relative" }}
          >
            <Button
              color="inherit"
                     sx={{
                borderRadius: "10px",
                padding: "5px 0",
                minWidth: "150px",               
                ...(reportAnchorEl && {
                  border: "2px solid white",
                  borderRadius: "4px",
                  transform: "scale(1.05)",
                }),
                "& .MuiMenuItem-root": {
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 20px",
                  transition: "background-color 0.3s ease"         
                },
              }}
            >
              Report
            </Button>
            <Menu
              anchorEl={reportAnchorEl}
              open={Boolean(reportAnchorEl)}
              onClose={handleReportClose}
              MenuListProps={{
                onMouseLeave: handleReportClose,
              }}
              PaperProps={{
                elevation: 3,
                sx: {
                  borderRadius: "10px",
                  padding: "5px 0",
                  minWidth: "150px",
                  "& .MuiMenuItem-root": {
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 20px",
                    "&:hover": {
                      backgroundColor: "#1976d2",
                      color: "white",
                      transition: "background-color 0.3s ease",
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={handleReportSummaryClick}>Summary</MenuItem>
              <MenuItem onClick={handleReportDetailClick}>Detail</MenuItem>
            </Menu>
          </div>
        )}


        {/* Sağ Menü */}
        <div style={{ marginLeft: 'auto' }}>

       
        {isLoggedIn ? (
          <>
            {/* Settings Icon with Dropdown Menu */}
            <div
              onMouseEnter={handleSettingsOpen}
              onMouseLeave={handleSettingsClose}
            >
              <IconButton
                color="inherit"
                sx={
                  settingsAnchorEl && {
                    border: "2px solid white",
                    borderRadius: "4px",
                    transform: "scale(1.05)",
                  }
                }
              >
                <SettingsIcon />
              </IconButton>
              <Menu
                id="settings-menu"
                anchorEl={settingsAnchorEl}
                open={Boolean(settingsAnchorEl)}
                onClose={handleSettingsClose}
                MenuListProps={{
                  onMouseLeave: handleSettingsClose,
                }}
                PaperProps={{
                  elevation: 3,
                  sx: {
                    borderRadius: "10px",
                    padding: "5px 0",
                    minWidth: "150px",
                    "& .MuiMenuItem-root": {
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 20px",
                      "&:hover": {
                        backgroundColor: "#1976d2",
                        color: "white",
                        transition: "background-color 0.3s ease",
                      },
                    },
                  },
                }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <AccountCircleIcon sx={{ marginRight: "10px" }} /> Profile
                </MenuItem>
                <MenuItem onClick={handleLogoutClick}>
                  <ExitToAppIcon sx={{ marginRight: "10px" }} /> Log Out
                </MenuItem>
              </Menu>
            </div>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              onClick={() => navigate("/login")}
              startIcon={<LoginIcon />}
              sx={{
                "&:hover": {
                  border: "2px solid white",
                  borderRadius: "4px",
                  transform: "scale(1.05)",
                },
              }}
            >
              Login
            </Button>
            <Button
              color="inherit"
              onClick={() => navigate("/signup")}
              startIcon={<PersonAddIcon />}
              sx={{
                "&:hover": {
                  border: "2px solid white",
                  borderRadius: "4px",
                  transform: "scale(1.05)",
                },
              }}
            >
              Signup
            </Button>
          </>
        )}
         </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
