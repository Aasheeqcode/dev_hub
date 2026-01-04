import { Box, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Avatar } from "@mui/material";
import { 
  Home, 
  VideoCall, 
  Code, 
  EmojiEvents, 
  Forum, 
  Settings, 
  Logout 
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Feed", icon: <Home />, path: "/home" },
    { text: "DevStudio", icon: <Code />, path: "/devstudio" }, // Future feature
    { text: "Meetings", icon: <VideoCall />, path: "/meet" }, // Future feature
    { text: "Contests", icon: <EmojiEvents />, path: "/contests" }, // Future feature
    { text: "Forum", icon: <Forum />, path: "/forum" }, // Future feature
  ];

  return (
    <Box 
      bgcolor="#0f172a" 
      borderRadius="1rem" 
      p="1.5rem" 
      border="1px solid #1e293b"
      position="sticky"
      top="2rem"
    >
      {/* Mini Profile Summary */}
      <Box display="flex" alignItems="center" gap="1rem" mb="1.5rem">
        <Avatar src="/assets/user.jpg" sx={{ width: 50, height: 50 }} />
        <Box>
          <Typography fontWeight="bold" color="white">John Doe</Typography>
          <Typography fontSize="0.8rem" color="#94a3b8">Full Stack Dev</Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#1e293b", mb: "1rem" }} />

      {/* Navigation Menu */}
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            onClick={() => navigate(item.path)}
            sx={{ 
              borderRadius: "8px", 
              mb: "0.5rem", 
              "&:hover": { bgcolor: "#1e293b", color: "#3b82f6" } 
            }}
          >
            <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: "#1e293b", my: "1rem" }} />

      <List>
        <ListItem button sx={{ borderRadius: "8px", color: "#ef4444" }}> {/* Red for logout */}
          <ListItemIcon sx={{ color: "inherit" }}><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;