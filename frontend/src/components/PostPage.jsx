import  { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Avatar } from '@mui/material';
import axios from 'axios';

const PostPage = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('text', text);
    if (image) {
      formData.append('image', image); // Append the image file
    }

    try {
      const token = localStorage.getItem('token'); 
      const response = await axios.post('http://localhost:5001/api/v1/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      });
      console.log('Post created:', response.data);
      setText('');
      setImage(null);
      setImagePreview('');
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create a Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="What's on your mind?"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <Box my={2}>
          {imagePreview && (
            <Avatar
              alt="Image Preview"
              src={imagePreview}
              sx={{ width: 100, height: 100, mb: 2 }}
            />
          )}
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="upload-image"
          />
          <label htmlFor="upload-image">
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label>
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Post
        </Button>
      </form>
    </Container>
  );
};

export default PostPage;
