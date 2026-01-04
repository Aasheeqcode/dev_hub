import { Box, Typography, InputBase, IconButton, Card, CardContent, Avatar, Chip } from "@mui/material";
import { Image, Code, Send, FavoriteBorder, ChatBubbleOutline, Share } from "@mui/icons-material";

const Feed = () => {
  return (
    <Box>
      {/* CREATE POST WIDGET */}
      <Box 
        bgcolor="#0f172a" 
        p="1.5rem" 
        borderRadius="1rem" 
        mb="2rem" 
        border="1px solid #1e293b"
      >
        <Box display="flex" gap="1rem" mb="1rem">
          <Avatar src="/assets/user.jpg" />
          <InputBase
            placeholder="Start a discussion or share a snippet..."
            sx={{
              width: "100%",
              bgcolor: "#1e293b",
              borderRadius: "2rem",
              padding: "0.5rem 1.5rem",
              color: "white",
            }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" px="1rem">
          <Box display="flex" gap="1rem">
            <Box display="flex" alignItems="center" gap="0.5rem" sx={{ cursor: "pointer", color: "#3b82f6" }}>
              <Image fontSize="small" /> <Typography fontSize="0.9rem">Media</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="0.5rem" sx={{ cursor: "pointer", color: "#a855f7" }}>
              <Code fontSize="small" /> <Typography fontSize="0.9rem">Snippet</Typography>
            </Box>
          </Box>
          <IconButton sx={{ bgcolor: "#3b82f6", color: "white", "&:hover": { bgcolor: "#2563eb" } }}>
            <Send fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* SAMPLE POSTS (Static Data for now) */}
      {[1, 2].map((post) => (
        <Card key={post} sx={{ bgcolor: "#0f172a", borderRadius: "1rem", border: "1px solid #1e293b", mb: "2rem" }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
              <Avatar src="/assets/user.jpg" />
              <Box>
                <Typography color="white" fontWeight="bold">Sarah Smith</Typography>
                <Typography color="#94a3b8" fontSize="0.8rem">2 hours ago</Typography>
              </Box>
            </Box>

            <Typography color="#cbd5e1" mb="1rem">
              Just figured out how to center a div in 2024! Here is the magic CSS snippet 🚀
            </Typography>

            {/* CODE SNIPPET BLOCK */}
            <Box 
              bgcolor="#020617" 
              p="1rem" 
              borderRadius="8px" 
              fontFamily="monospace" 
              color="#4ade80" 
              mb="1rem"
              border="1px solid #1e293b"
            >
              display: grid;<br />
              place-items: center;
            </Box>

            <Box display="flex" gap="1.5rem" color="#94a3b8">
              <Box display="flex" gap="0.5rem" alignItems="center" sx={{ cursor: "pointer", "&:hover": { color: "#ef4444" } }}>
                <FavoriteBorder /> <Typography>124</Typography>
              </Box>
              <Box display="flex" gap="0.5rem" alignItems="center" sx={{ cursor: "pointer", "&:hover": { color: "#3b82f6" } }}>
                <ChatBubbleOutline /> <Typography>18</Typography>
              </Box>
              <Box display="flex" gap="0.5rem" alignItems="center" sx={{ cursor: "pointer", "&:hover": { color: "#fff" } }}>
                <Share />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Feed;