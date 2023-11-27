import React, { useEffect, useState } from "react";
import { AddCircle, DeleteForever, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { BaseUrl } from "../../BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Settings } from "@mui/icons-material";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Dashboard() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.accessToken}`,
    };

    // Define your API URL
    const apiUrl = `${BaseUrl}/advertisement/v1/queryAllAdvertisement`;

    // Make the API request
    axios
      .get(apiUrl, { headers })
      .then((response) => {
        // Assuming the API response is an array of advertisements
        // console.log(response);
        setAdvertisements(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const navi = useNavigate();

  const handlePromo = () => {
    navi("/promo");
  };
  const handleBanner = () => {
    navi("/banner");
  };
  const handleCat = () => {
    navi("/category");
  };
  const handleUser = () => {
    navi("/user");
  };
  const handleCustomer = () => {
    navi("/customer");
  };
  const handleNoti = () => {
    navi("/notifications");
  };

  return (
    <>
      <Box>
        <Typography sx={{ mb: 1 }} variant="h4">
          Dashboard
        </Typography>

        <style>
          {`
          .responsive-image {
            height: 20vh;
            width: 100%;
            max-width: 100%;
          }

          @media (min-width: 768px) {
            .responsive-image {
              height: 40vh;
            }
          }
        `}
        </style>
        <Carousel
          autoPlay
          interval={3000}
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          swipeable={true}
          emulateTouch={true}
          dynamicHeight={true}
          useKeyboardArrows={true}
        >
          {advertisements.map((advertisement) => (
            <div key={advertisement.id}>
              <img
                src={`${BaseUrl}/file/downloadFile/?filePath=${encodeURIComponent(
                  advertisement.filePath
                )}`}
                alt="Advertisement"
                className="responsive-image"
              />
            </div>
          ))}
        </Carousel>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Card
              sx={{
                width: "100%",
                height: "120px",
                background: "lightGray",
                mt: 5,
              }}
              onClick={handlePromo}
            >
              <CardActions>
                <Button size="small"> Promo</Button>
                <IconButton>
                  <AdUnitsIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card
              sx={{
                width: "100%",
                height: "120px",
                background: "lightGray",
                mt: 5,
              }}
              onClick={handleBanner}
            >
              <CardActions>
                <Button size="small"> Banner</Button>
                <IconButton>
                  <NewspaperIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card
              sx={{
                width: "100%",
                height: "120px",
                background: "lightGray",
                mt: 5,
              }}
              onClick={handleCat}
            >
              <CardActions>
                <Button size="small"> Category</Button>
                <IconButton>
                  <CategoryIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card
              sx={{
                width: "100%",
                height: "120px",
                background: "lightGray",
                mt: 5,
              }}
              onClick={handleUser}
            >
              <CardActions>
                <Button size="small"> User</Button>
                <IconButton>
                  <PersonIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card
              sx={{
                width: "100%",
                height: "120px",
                background: "lightGray",
                mt: 5,
              }}
              onClick={handleCustomer}
            >
              <CardActions>
                <Button size="small"> Customer</Button>
                <IconButton>
                  <PersonIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card
              sx={{
                width: "100%",
                height: "120px",
                background: "lightGray",
                mt: 5,
              }}
              onClick={handleNoti}
            >
              <CardActions>
                <Button size="small"> Notifications</Button>
                <IconButton>
                  <NotificationsIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card
              sx={{
                width: "100%",
                height: "120px",
                background: "lightGray",
                mt: 5,
              }}
              onClick={handleNoti}
            >
              <CardActions>
                <Button size="small"> Settings</Button>
                <IconButton>
                  <Settings />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
