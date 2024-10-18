import { useEffect, useState } from 'react';
import { Container, Typography, Avatar, Box } from '@mui/material';

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); 
  const userdata = localStorage.getItem('user'); 
  const {id} = JSON.parse(userdata);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/v1/user/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`, 
          },
        });

        const data = await response.json();
        if (data.success) {
          setUser(data.data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchUserData();
  }, [id, token]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>; 
  }

  if (!user) {
    return <Typography variant="h6">User not found.</Typography>; 
  }

  return (
    <Container maxWidth="sm">
      <Box display="flex" alignItems="center" flexDirection="column" my={4}>
        {user.profilePictureUrl ? (
          <Avatar
            alt={user.username}
            src={user.profilePictureUrl}
            sx={{ width: 100, height: 100, mb: 2 }}
          />
        ) : (
          <Avatar sx={{ width: 100, height: 100, mb: 2 }}>
            {user.username.charAt(0).toUpperCase()} 
          </Avatar>
        )}
        <Typography variant="h5">{user.username}</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">Gender: {user.gender}</Typography>
        <Typography variant="body1">Bio: {user.bio || 'No bio available.'}</Typography>
        <Typography variant="body2" color="textSecondary">
          Joined: {new Date(user.createdAt).toLocaleDateString()} 
        </Typography>
      </Box>
    </Container>
  );
};

export default Account;
