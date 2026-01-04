import { Box, Typography, List, ListItem, ListItemText, Chip } from "@mui/material";

const Rightbar = () => {
  return (
    <Box>
      {/* Upcoming Contests */}
      <Box 
        bgcolor="#0f172a" 
        borderRadius="1rem" 
        p="1.5rem" 
        mb="2rem" 
        border="1px solid #1e293b"
      >
        <Typography variant="h6" fontWeight="bold" mb="1rem">Upcoming Contests</Typography>
        <List disablePadding>
          <ListItem disablePadding sx={{ mb: 1 }}>
            <Box>
              <Typography fontWeight="bold" color="#3b82f6">Global Hackathon '24</Typography>
              <Typography fontSize="0.8rem" color="#94a3b8">Starts in 2 hours</Typography>
            </Box>
          </ListItem>
          <ListItem disablePadding>
            <Box>
              <Typography fontWeight="bold" color="#a855f7">React Challenge</Typography>
              <Typography fontSize="0.8rem" color="#94a3b8">Tomorrow, 10:00 AM</Typography>
            </Box>
          </ListItem>
        </List>
      </Box>

      {/* Trending Tags */}
      <Box 
        bgcolor="#0f172a" 
        borderRadius="1rem" 
        p="1.5rem" 
        border="1px solid #1e293b"
      >
        <Typography variant="h6" fontWeight="bold" mb="1rem">Trending Topics</Typography>
        <Box display="flex" gap="0.5rem" flexWrap="wrap">
          <Chip label="#Javascript" sx={{ bgcolor: "#1e293b", color: "white" }} />
          <Chip label="#AIWrapper" sx={{ bgcolor: "#1e293b", color: "white" }} />
          <Chip label="#Web3" sx={{ bgcolor: "#1e293b", color: "white" }} />
          <Chip label="#Python" sx={{ bgcolor: "#1e293b", color: "white" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Rightbar;