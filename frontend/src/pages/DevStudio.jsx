import { Box, Typography, IconButton } from "@mui/material";
import { PlayArrow, Share, Folder, Terminal } from "@mui/icons-material";
import Navbar from "../components/Navbar";

const DevStudio = () => {
  return (
    <Box height="100vh" display="flex" flexDirection="column" bgcolor="#020617" color="white">
        <Navbar />
        
        <Box display="flex" flex={1} overflow="hidden">
            {/* LEFT SIDEBAR: FILE EXPLORER */}
            <Box width="250px" borderRight="1px solid #1e293b" p="1rem" bgcolor="#0f172a" display={{ xs: "none", md: "block" }}>
                <Typography variant="caption" color="#94a3b8" fontWeight="bold">EXPLORER</Typography>
                <Box mt="1rem" pl="0.5rem">
                    <Typography display="flex" alignItems="center" gap="0.5rem" fontSize="0.9rem" mb="0.5rem">
                        <Folder sx={{ color: "#fbbf24", fontSize: "1.2rem" }} /> src
                    </Typography>
                    <Box pl="1.5rem" borderLeft="1px solid #334155">
                        <Typography fontSize="0.9rem" mb="0.5rem" color="#94a3b8">index.css</Typography>
                        <Typography fontSize="0.9rem" mb="0.5rem" color="#3b82f6" bgcolor="#1e293b" p="2px 5px" borderRadius="4px">App.jsx</Typography>
                        <Typography fontSize="0.9rem" mb="0.5rem" color="#94a3b8">main.jsx</Typography>
                    </Box>
                </Box>
            </Box>

            {/* CENTER: EDITOR */}
            <Box flex={1} display="flex" flexDirection="column">
                {/* Editor Tabs */}
                <Box display="flex" bgcolor="#0f172a" borderBottom="1px solid #1e293b">
                    <Box px="1.5rem" py="0.5rem" bgcolor="#020617" borderTop="2px solid #3b82f6" borderRight="1px solid #1e293b" fontSize="0.9rem">
                        App.jsx
                    </Box>
                </Box>

                {/* Editor Content (Mockup) */}
                <Box flex={1} p="1.5rem" fontFamily="monospace" fontSize="15px" sx={{ overflowY: "auto" }}>
                    <div style={{ color: "#c084fc" }}>import <span style={{ color: "white" }}>React</span> from <span style={{ color: "#4ade80" }}>'react'</span>;</div>
                    <br />
                    <div style={{ color: "#3b82f6" }}>function <span style={{ color: "#fbbf24" }}>App</span>() {"{"}</div>
                    <div style={{ paddingLeft: "2rem", color: "white" }}>return (</div>
                    <div style={{ paddingLeft: "4rem", color: "#f472b6" }}>&lt;div className=<span style={{ color: "#4ade80" }}>"container"</span>&gt;</div>
                    <div style={{ paddingLeft: "6rem", color: "white" }}>&lt;h1&gt;Welcome to DevStudio&lt;/h1&gt;</div>
                    <div style={{ paddingLeft: "4rem", color: "#f472b6" }}>&lt;/div&gt;</div>
                    <div style={{ paddingLeft: "2rem", color: "white" }}>);</div>
                    <div style={{ color: "#3b82f6" }}>{"}"}</div>
                </Box>

                {/* Bottom Panel: Terminal */}
                <Box height="150px" bgcolor="#0f172a" borderTop="1px solid #1e293b" p="1rem">
                    <Box display="flex" justifyContent="space-between" mb="0.5rem">
                        <Box display="flex" gap="0.5rem" alignItems="center">
                            <Terminal fontSize="small" sx={{ color: "#94a3b8" }} />
                            <Typography variant="caption" color="#94a3b8">TERMINAL</Typography>
                        </Box>
                        <Box>
                            <IconButton size="small" sx={{ color: "#4ade80", bgcolor: "rgba(74, 222, 128, 0.1)", mr: 1 }}><PlayArrow fontSize="small" /></IconButton>
                        </Box>
                    </Box>
                    <Typography fontFamily="monospace" fontSize="0.8rem" color="#94a3b8">
                        <span style={{ color: "#4ade80" }}>user@devhub:~$</span> npm start<br/>
                        <span style={{ color: "#3b82f6" }}>INFO</span> Starting development server...<br/>
                        <span style={{ color: "#fbbf24" }}>READY</span> Server running at http://localhost:3000
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Box>
  );
};

export default DevStudio;