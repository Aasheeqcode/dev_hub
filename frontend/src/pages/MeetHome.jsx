import { Box, Typography, Button, Card, CardContent, Modal, TextField, IconButton } from "@mui/material";
import { VideoCall, Add, Keyboard, Close, ContentCopy } from "@mui/icons-material";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useMediaQuery } from "@mui/material";

const MeetHome = () => {
  const isNonMobile = useMediaQuery("(min-width:1000px)");
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);
  const [meetingLink] = useState("https://devhub.com/meet/" + Math.random().toString(36).substring(7));

  // Styles for the Modal Box
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    boxShadow: 24,
    p: 4,
    color: 'white',
    outline: 'none'
  };

  return (
    <Box bgcolor="#020617" minHeight="100vh" color="white">
      <Navbar />
      <Box display="flex" padding="2rem 4%" gap="2rem">
        {/* Sidebar only on large screens */}
        {isNonMobile && <Box flexBasis="22%"><Sidebar /></Box>}

        {/* MAIN CONTENT */}
        <Box flexBasis={isNonMobile ? "78%" : "100%"}>
            <Box textAlign="center" mb="4rem" mt="2rem">
                <Typography variant="h3" fontWeight="bold" mb="1rem">
                    Premium Video Meetings
                </Typography>
                <Typography color="#94a3b8" maxWidth="600px" mx="auto">
                    Collaborate with your team using high-quality video, screen sharing, and real-time code whiteboard.
                </Typography>
            </Box>

            <Box display="flex" gap="2rem" flexWrap="wrap" justifyContent="center">
                {/* CARD 1: CREATE MEETING */}
                <Card sx={{ width: "350px", bgcolor: "#0f172a", border: "1px solid #1e293b", borderRadius: "1rem", p: "1rem" }}>
                    <CardContent>
                        <Box bgcolor="#2563eb" width="50px" height="50px" borderRadius="12px" display="flex" alignItems="center" justifyContent="center" mb="1.5rem">
                            <VideoCall sx={{ color: "white", fontSize: "30px" }} />
                        </Box>
                        <Typography variant="h5" color="white" fontWeight="bold" mb="0.5rem">Create Meeting</Typography>
                        <Typography color="#94a3b8" mb="2rem" fontSize="0.9rem">Start an instant meeting or schedule one for later.</Typography>
                        <Button 
                            fullWidth variant="contained" 
                            onClick={() => setOpenCreate(true)}
                            sx={{ bgcolor: "#1e293b", "&:hover": { bgcolor: "#334155" } }}
                        >
                            <Add sx={{ mr: 1 }} /> New Meeting
                        </Button>
                    </CardContent>
                </Card>

                {/* CARD 2: JOIN MEETING */}
                <Card sx={{ width: "350px", bgcolor: "#0f172a", border: "1px solid #1e293b", borderRadius: "1rem", p: "1rem" }}>
                    <CardContent>
                        <Box bgcolor="#7c3aed" width="50px" height="50px" borderRadius="12px" display="flex" alignItems="center" justifyContent="center" mb="1.5rem">
                            <Keyboard sx={{ color: "white", fontSize: "30px" }} />
                        </Box>
                        <Typography variant="h5" color="white" fontWeight="bold" mb="0.5rem">Join Meeting</Typography>
                        <Typography color="#94a3b8" mb="2rem" fontSize="0.9rem">Enter a meeting code to join an existing session.</Typography>
                        <Button 
                            fullWidth variant="contained" 
                            onClick={() => setOpenJoin(true)}
                            sx={{ bgcolor: "#1e293b", "&:hover": { bgcolor: "#334155" } }}
                        >
                            Join with Code
                        </Button>
                    </CardContent>
                </Card>
            </Box>
        </Box>
      </Box>

      {/* --- MODALS --- */}
      
      {/* Create Meeting Modal */}
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <Box sx={modalStyle}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Meeting Ready</Typography>
                <IconButton onClick={() => setOpenCreate(false)} sx={{ color: "#94a3b8" }}><Close /></IconButton>
            </Box>
            <Typography fontSize="0.9rem" color="#94a3b8" mb={2}>Share this link with others you want in the meeting.</Typography>
            <Box bgcolor="#0f172a" p="0.8rem" borderRadius="8px" display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography color="#3b82f6">{meetingLink}</Typography>
                <IconButton size="small" sx={{ color: "white" }} onClick={() => navigator.clipboard.writeText(meetingLink)}>
                    <ContentCopy fontSize="small" />
                </IconButton>
            </Box>
            <Button fullWidth variant="contained" sx={{ bgcolor: "#2563eb" }}>Start Meeting Now</Button>
        </Box>
      </Modal>

      {/* Join Meeting Modal */}
      <Modal open={openJoin} onClose={() => setOpenJoin(false)}>
        <Box sx={modalStyle}>
            <Typography variant="h6" mb={2}>Join Meeting</Typography>
            <TextField 
                fullWidth placeholder="Enter meeting code" 
                sx={{ 
                    mb: 3, 
                    bgcolor: "#0f172a", 
                    input: { color: "white" },
                    "& fieldset": { borderColor: "#334155" }
                }} 
            />
            <Button fullWidth variant="contained" sx={{ bgcolor: "#2563eb" }}>Join</Button>
        </Box>
      </Modal>

    </Box>
  );
};

export default MeetHome;