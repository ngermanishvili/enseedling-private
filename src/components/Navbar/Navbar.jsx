import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useCookies } from "react-cookie";
import axios from "axios";

const pages = ["Intership", "About us", "Contact"];
const settings = ["InternDashboard"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [cookies, , removeCookie] = useCookies(["jwt"]);
  const [userData, setUserData] = useState(null);
  const location = useLocation();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "http://localhost:4000/get-user-data",
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setUserData(data.user);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchUserData();
  // }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isLoggedIn = !!cookies.jwt;

  const handleLogout = () => {
    removeCookie("jwt");
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={
                      page === "Login"
                        ? "/login"
                        : page === "Register"
                        ? "/register"
                        : `/${page.toLowerCase()}`
                    }
                    textAlign="center"
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={
                  page === "Login"
                    ? "/login"
                    : page === "Register"
                    ? "/register"
                    : `/${page.toLowerCase()}`
                }
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  ...(location.pathname === `/${page.toLowerCase()}` && {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "4px",
                  }),
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip
                title={`Open settings - ${userData?.firstName} ${userData?.lastName}`}
              >
                {/* Display the user's first name and last name in the tooltip */}
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={`${userData?.firstName} ${userData?.lastName}`}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      component={Link}
                      to={`/${setting.toLowerCase()}`}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Button component={Link} to="/login" sx={{ color: "white" }}>
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
