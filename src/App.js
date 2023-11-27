import { ThemeProvider } from "@mui/system";
import AdminApp from "./components/AdminApp";
import theme from "./styles/theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/NavComponents/Dashboard";

function App() {
  // Check if the user is authenticated by checking for a session item
  const isAuthenticated = () => {
    return sessionStorage.getItem("user") !== null;
  };

  // Create a ProtectedRoute component
  const ProtectedRoute = ({ element }) => {
    if (isAuthenticated()) {
      return element;
    } else {
      return <Navigate to="/login" replace />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*" // Catch all other paths
            element={<ProtectedRoute element={<AdminApp />} />}
          />
          <Route
            element={
              <Navigate
                to={isAuthenticated() ? "/dashboard" : "/login"}
                replace
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
