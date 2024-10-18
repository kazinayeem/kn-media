import  { useState } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    bio: "",
    profilePictureUrl: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password, gender, bio, profilePictureUrl } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    console.log(formData);
    
    e.preventDefault();
    try {
      // Reset previous errors
      setFieldErrors({ username: "", email: "", password: "" });
      setErrorMessage("");
      const res = await axios.post("http://localhost:5001/api/v1/user/reg", formData);
      if (res.data.success) {
        setErrorMessage("User created successfully!");
        setOpenSnackbar(true);
        redirect("/login")
      }
    } catch (err) {
      // Handle validation errors and custom errors
      if (err.response && err.response.data) {
        const data = err.response.data;

        if (data.errors) {
          // Backend validation errors for specific fields
          const newFieldErrors = { ...fieldErrors };
          data.errors.forEach((error) => {
            newFieldErrors[error.path] = error.msg; // Set error message for each field
          });
          setFieldErrors(newFieldErrors);
        } else if (data.message) {
          setErrorMessage(data.message);
          setOpenSnackbar(true);
        }
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
        Register
      </Typography>
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="username"
              variant="outlined"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={onChange}
              error={Boolean(fieldErrors.username)}
              helperText={fieldErrors.username} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              value={email}
              onChange={onChange}
              error={Boolean(fieldErrors.email)}
              helperText={fieldErrors.email} 
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
              error={Boolean(fieldErrors.password)}
              helperText={fieldErrors.password} 
            />
          </Grid>

          {/* Gender Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={gender}
                onChange={onChange}
                label="Gender"
                required
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="bio"
              variant="outlined"
              fullWidth
              label="Bio"
              value={bio}
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="profilePictureUrl"
              variant="outlined"
              fullWidth
              label="Profile Picture URL"
              value={profilePictureUrl}
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
          Register
        </Button>
      </form>

      {/* Error Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;
