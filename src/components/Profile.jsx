import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Container, Typography, Paper, Box, Avatar, Button } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Retrieve logged-in user data
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove user data from localStorage
    navigate("/"); // Redirect to WelcomePage
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          textAlign: "center",
          borderRadius: 3,
          boxShadow: 3,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main" }}>
            {user?.username ? user.username[0].toUpperCase() : "U"}
          </Avatar>
          <Typography variant="h4" fontWeight="bold">
            Profile
          </Typography>
          <Typography variant="h6">
            Username: <strong>{user?.username || "Not Available"}</strong>
          </Typography>
          <Typography variant="h6">
            Email: <strong>{user?.email || "Not Available"}</strong>
          </Typography>

          {/* Logout Button */}
          <Button
            variant="contained"
            color="error"
            sx={{ marginTop: 2, width: "100%" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;
