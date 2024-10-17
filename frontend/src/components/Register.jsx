import  { useState } from "react";
import { Button, TextField, Grid, Radio, RadioGroup, FormControlLabel, FormLabel, Avatar, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const Input = styled("input")({
  display: "none",
});

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // You can now send the formData to your backend via API call
    // For example, using fetch or axios
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Username Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Email Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Password Field */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>

          {/* Gender Selection */}
          <Grid item xs={12}>
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </Grid>

          {/* Profile Photo Upload */}
          <Grid item xs={12}>
            <label htmlFor="photo-upload">
              <Input
                accept="image/*"
                id="photo-upload"
                type="file"
                onChange={handleFileChange}
              />
              <Button variant="contained" component="span" fullWidth>
                Upload Profile Photo
              </Button>
            </label>
            {formData.photo && (
              <Avatar
                alt="Profile Picture"
                src={URL.createObjectURL(formData.photo)}
                sx={{ width: 100, height: 100, mt: 2 }}
              />
            )}
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Register;
