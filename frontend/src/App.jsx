import React, { useEffect, useState } from 'react';
import { Container, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import { FaRegHeart, FaHeart, FaComment } from 'react-icons/fa'; // Importing heart icons
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUserId = localStorage.getItem('userId'); // Assuming you have saved userId in local storage

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/v1/post'); // Adjust the URL as needed
        setPosts(response.data); // Assuming the response structure is { success: true, data: [posts] }
      } catch (error) {
        setError('Error fetching posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLikePost = (postId) => {
    // Handle the like functionality here
    console.log(`Liked post with ID: ${postId}`);
  };

  if (loading) return <Typography>Loading posts...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md"> {/* Use a medium width for better visibility */}
      {posts.map((post) => {
        const isLiked = post.likes.includes(currentUserId); // Check if the current user has liked the post
        return (
          <Card key={post._id} sx={{ marginBottom: 2 }}> {/* Add margin for spacing between cards */}
            {post.imageUrl && (
              <CardMedia
                component="img"
                height="400" // Set a fixed height for all images
                image={`http://localhost:5001${post.imageUrl}`} // Adjust the image URL as needed
                alt="Post image"
                sx={{ objectFit: 'cover' }} // Maintain aspect ratio and cover the area
              />
            )}
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.text}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Posted by: {post.author.username}
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleLikePost(post._id)}>
                    {isLiked ? (
                      <FaHeart size={20} color="red" /> // Filled heart if liked
                    ) : (
                      <FaRegHeart size={20} /> // Empty heart if not liked
                    )}
                  </IconButton>
                  <Typography variant="body2" sx={{ marginLeft: '4px' }}>
                    {post.likes.length} {/* Display number of likes */}
                  </Typography>
                </div>
                <IconButton>
                  <FaComment size={20} /> {/* Comment icon */}
                </IconButton>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </Container>
  );
};

export default App;
