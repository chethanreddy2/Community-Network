import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { BaseUrl } from "../../BaseUrl";
import { styled } from "@mui/material/styles";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CategoryIcon from "@mui/icons-material/Category";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { ReceiptLong, Settings } from "@mui/icons-material";

function Dashboard() {
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

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const carouselRef = useRef(null);

  useEffect(() => {
    // Set a timeout to advance the Carousel every 5000 milliseconds (5 seconds)
    const carouselTimeout = setInterval(() => {
      carouselRef.current.next();
    }, 5000);

    // Clear the timeout when the component unmounts
    return () => {
      clearInterval(carouselTimeout);
    };
  }, []);

  const ResponsiveCarouselContainer = styled("div")({
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
    maxWidth: "100%",
    width: "1190px",
    "@media (max-width: 1000px)": {
      width: "270px",
    },
  });

  const navi = useNavigate();

  const handleProd = () => {
    navi("/products");
  };
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
      <Box
        sx={{
          "@media (max-width: 1000px)": {
            width: "270px",
            height: "100vh",
          },
        }}
      >
        <Typography sx={{ mb: 1 }} variant="h4">
          Dashboard
        </Typography>

        <ResponsiveCarouselContainer>
          {loading ? (
            <CircularProgress />
          ) : (
            <Carousel
              responsive={responsive}
              autoPlay={true}
              autoPlaySpeed={3000}
              infinite={true}
              arrows={true}
              ref={carouselRef}
            >
              {advertisements.map((advertisement) => (
                <div key={advertisement.id}>
                  <img
                    src={`${BaseUrl}/file/downloadFile/?filePath=${encodeURIComponent(
                      advertisement.filePath
                    )}`}
                    alt="Advertisement"
                    style={{
                      maxWidth: "100%",
                      height: "40vh",
                      width: "100%",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          )}
        </ResponsiveCarouselContainer>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Card
              sx={{
                width: "250px",
                height: "150px",
                background: "lightGray",
                mt: 5,
              }}
              onClick={handleProd}
            >
              <CardActions>
                <Button size="small"> Products</Button>
                <IconButton>
                  <ReceiptLong />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card
              sx={{
                width: "250px",
                height: "150px",
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
                width: "250px",
                height: "150px",
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
                width: "250px",
                height: "150px",
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
                width: "250px",
                height: "150px",
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
                width: "250px",
                height: "150px",
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
                width: "250px",
                height: "150px",
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
                width: "250px",
                height: "150px",
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

export default Dashboard;
