import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { Notifications, Search } from "@mui/icons-material";

const Navbar = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      alignItems="center" 
      padding="1rem 4%" 
      bgcolor="#020617" 
      borderBottom="1px solid #1e293b"
      position="sticky"
      top="0"
      zIndex="100"
    >
      <Typography fontWeight="bold" fontSize="1.5rem" color="white">
        Dev<span style={{ color: "#3b82f6" }}>Hub</span>
      </Typography>

      <Box display="flex" gap="1rem" alignItems="center">
        <IconButton sx={{ color: "white" }}><Search /></IconButton>
        <IconButton sx={{ color: "white" }}><Notifications /></IconButton>
        <Avatar src="/assets/user.jpg" sx={{ width: 32, height: 32 }} />
      </Box>
    </Box>
  );
};

export default Navbar;