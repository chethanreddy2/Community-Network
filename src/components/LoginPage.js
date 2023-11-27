import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function validateInput(userName, password) {
  const errors = {};

  if (!userName) {
    errors.userName = "Username is required";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
}

const defaultTheme = createTheme();

const API_URL =
  "https://virtullearning.cloudjiffy.net/ecommerce/login/v1/userLogin";

export default function LoginPage() {
  const [errors, setErrors] = React.useState({});
  const [formData, setFormData] = React.useState({
    userName: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userName = data.get("userName");
    const password = data.get("password");
    const inputErrors = validateInput(userName, password);

    if (Object.keys(inputErrors).length === 0) {
      Axios.post(API_URL, {
        userName: userName,
        password: password,
      })
        .then((response) => {
          console.log("API response:", response.data);
          // localStorage.setItem("user",JSON.stringify(res.data));
          sessionStorage.setItem("user", JSON.stringify(response.data));
          // Swal.fire("Login Successful");

          navigate("/dashboard");

          // Clear the input fields after successful login
          setFormData({ userName: "", password: "" });
        })
        .catch((error) => {
          console.error("API error:", error);
          Swal.fire("Bad Credentials");
        });
    } else {
      setErrors(inputErrors);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    // Update the formData as the user types
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="userName"
                name="userName"
                autoComplete="userName"
                autoFocus
                error={errors.userName ? true : false}
                helperText={errors.userName}
                onChange={handleInputChange}
                value={formData.userName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={errors.password ? true : false}
                helperText={errors.password}
                onChange={handleInputChange}
                value={formData.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                LogIn
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
