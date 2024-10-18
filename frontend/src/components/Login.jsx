import  { useState } from "react";
import { redirect } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API request to login
      const res = await axios.post("http://localhost:5001/api/v1/user/login", formData);
      
      if (res.data.success) {
        // If login is successful, store the token in localStorage
        localStorage.setItem("token", res.data.token);

        // Optionally, store user data too
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setErrorMessage("Logged in successfully!");
        setOpenSnackbar(true);
        redirect("/")
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message || "Login failed. Please try again.");
        setOpenSnackbar(true);
      } else {
        setErrorMessage("An error occurred. Please try again.");
        setOpenSnackbar(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              value={email}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={onChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Login
        </Button>
      </form>

      {/* Snackbar for error/success messages */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={errorMessage === "Logged in successfully!" ? "success" : "error"} sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
