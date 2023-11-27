import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import { Colors } from "../styles/theme";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { ReceiptLong, Settings } from "@mui/icons-material";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
// AppBar components

import { AppBar } from "./AppBar1";
import { Search, SearchIconWrapper, StyledInputBase } from "./AppBar1";
import { MyListItemButton } from "./AppBar1";
import { Drawer } from "./AppBar1";
import { DrawerHeader } from "./AppBar1";
import { Divider, Select } from "@mui/material";
import { useEffect } from "react";
import axios from "axios";
import { BaseUrl } from "../BaseUrl";
import { useState } from "react";

export default function NavDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [user, setUser] = React.useState("");

  const handleChange = (event) => {
    setUser(event.target.value);
  };

  const [selectedItem, setSelectedItem] = React.useState("");

  // Define isLoggedIn and fullName states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fullName, setFullName] = useState(""); // Assuming fullName should be used

  // Define isLoggedOut state
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const [userInfo, setUserInfo] = useState(""); // Define userInfo state

  useEffect(() => {
    if (user && user.accessToken) {
      setIsLoggedIn(true);
      setFullName(user.fullName); // Set fullName instead of userName
      fetchUserInfo();
    }
  }, [isLoggedOut]);

  const fetchUserInfo = () => {
    axios
      .get(
        `${BaseUrl}/login/v1/queryMobileUserByUserName/8904000887/${fullName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.accessToken,
          },
        }
      )
      .then((response) => {
        console.log(response.data.fullName); // Assuming fullName is the field in the API response
        setUserInfo(response.data.fullName);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleNavbarItemClicked = (item) => {
    setSelectedItem(item);
    navigate(item);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    alert("logout successful");
    navigate("/login");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gridTemplateRows: "auto",
        gridTemplateAreas: `
          "menu appbar mobileMenu"
        `,
        height: "100%",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          gridArea: "appbar",
          background: "white",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon sx={{ color: Colors.black }} />
          </IconButton>
          {!open && (
            <Typography
              variant="h6"
              noWrap
              component="div"
              color={Colors.black}
              fontWeight="bold"
            >
              Community Networking
            </Typography>
          )}

          <Search open={open} sx={{ background: Colors.background }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: Colors.light }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              sx={{ color: Colors.black }}
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              sx={{ color: Colors.black }}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              sx={{ color: Colors.black }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon
                sx={{ color: Colors.black }}
                onClick={handleProfileMenuOpen}
              />
            </IconButton>
          </Box>
        </Toolbar>
        {renderMenu}
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          gridArea: "menu",
        }}
      >
        <DrawerHeader sx={{ background: "white" }}>
          {open && (
            <Typography
              variant="h6"
              noWrap
              component="div"
              color={Colors.black}
              fontWeight="bold"
            >
              Community Networking
            </Typography>
          )}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ background: "white", height: "100%" }}>
          <ListItem disablePadding>
            <MyListItemButton
              text={"Dashboard"}
              icons={<DashboardIcon />}
              handleNavbarItemClicked={() =>
                handleNavbarItemClicked("dashboard")
              }
              selected={selectedItem.includes("dashboard")}
            />
          </ListItem>

          <ListItem disablePadding>
            <MyListItemButton
              text={"Advertisement"}
              icons={<AdUnitsIcon />}
              handleNavbarItemClicked={() => handleNavbarItemClicked("promo")}
            />

            <Select
              value={user}
              onChange={handleChange}
              sx={{ width: "800px", ml: "-20px", mr: "5px" }}
            >
              <ListItem disablePadding>
                <MyListItemButton
                  text={"Promo"}
                  icons={<AdUnitsIcon />}
                  handleNavbarItemClicked={() =>
                    handleNavbarItemClicked("promo")
                  }
                  selected={selectedItem.includes("promo")}
                />
              </ListItem>
              <ListItem disablePadding>
                <MyListItemButton
                  text={"Banner"}
                  icons={<NewspaperIcon />}
                  handleNavbarItemClicked={() =>
                    handleNavbarItemClicked("banner")
                  }
                  selected={selectedItem.includes("banner")}
                />
              </ListItem>
            </Select>
          </ListItem>

          <ListItem disablePadding>
            <MyListItemButton
              text={"Masters"}
              icons={<CategoryIcon />}
              handleNavbarItemClicked={() =>
                handleNavbarItemClicked("category")
              }
            />

            <Select
              value={user}
              onChange={handleChange}
              sx={{ width: "600px", ml: "-20px", mr: "5px", mt: "10px" }}
            >
              <ListItem disablePadding>
                <MyListItemButton
                  text={"Category"}
                  icons={<CategoryIcon />}
                  handleNavbarItemClicked={() =>
                    handleNavbarItemClicked("category")
                  }
                  selected={selectedItem.includes("category")}
                />
              </ListItem>
            </Select>
          </ListItem>

          <ListItem disablePadding>
            <MyListItemButton
              text={"User Management"}
              icons={<PersonIcon />}
              handleNavbarItemClicked={() => handleNavbarItemClicked("user")}
            />

            <Select
              value={user}
              onChange={handleChange}
              sx={{ width: "1000px", ml: "-20px", mr: "5px", mt: "10px" }}
            >
              <ListItem disablePadding>
                <MyListItemButton
                  text={"User"}
                  icons={<PersonIcon />}
                  handleNavbarItemClicked={() =>
                    handleNavbarItemClicked("user")
                  }
                  selected={selectedItem.includes("User")}
                />
              </ListItem>
              <ListItem disablePadding>
                <MyListItemButton
                  text={"Customer"}
                  icons={<PersonIcon />}
                  handleNavbarItemClicked={() =>
                    handleNavbarItemClicked("customer")
                  }
                  selected={selectedItem.includes("Customer")}
                />
              </ListItem>
            </Select>
          </ListItem>

          <ListItem disablePadding>
            <MyListItemButton
              text={"Notifications"}
              icons={<NotificationsIcon />}
              handleNavbarItemClicked={() =>
                handleNavbarItemClicked("notifications")
              }
              selected={selectedItem.includes("notifications")}
            />
          </ListItem>
          <ListItem disablePadding>
            <MyListItemButton
              text={"Settings"}
              icons={<Settings />}
              handleNavbarItemClicked={() =>
                handleNavbarItemClicked("settings")
              }
              selected={selectedItem.includes("settings")}
            />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
