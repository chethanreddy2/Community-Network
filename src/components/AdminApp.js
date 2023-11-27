import { Box } from "@mui/material";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Colors, DrawerWidth } from "../styles/theme";
import { styled } from "@mui/material/styles";
import NavDrawer from "./NavDrawer";
import { DrawerHeader } from "./AppBar1";
import Dashboard from "./NavComponents/Dashboard";
import Promo from "./NavComponents/Promo";
import Category from "./NavComponents/Category";
import Banner from "./NavComponents/Banner";
import Settings from "./NavComponents/Settings";
import UserList from "./NavComponents/UserList";
import Customer from "./NavComponents/Customer";
import Notifications from "./NavComponents/Notifications";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${DrawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

export default function AdminApp() {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          // background: Colors.background,
          height: "100%",
          width: "100%",
        }}
      >
        <NavDrawer open={open} setOpen={setOpen} />
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/promo" element={<Promo />} />
            <Route exact path="/category" element={<Category />} />
            <Route exact path="/user" element={<UserList />} />
            <Route exact path="/customer" element={<Customer />} />
            <Route exact path="/banner" element={<Banner />} />
            <Route exact path="/notifications" element={<Notifications />} />
            <Route exact path="/settings" element={<Settings />} />
          </Routes>{" "}
        </Main>
      </Box>
    </>
  );
}
