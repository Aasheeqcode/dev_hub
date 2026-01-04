import { Box, Typography } from "@mui/material";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <Box display="flex" width="100%" height="100vh" bgcolor="#020617">
      
      {/* LEFT SIDE - BRANDING (Hidden on mobile) */}
      <Box
        flex={1}
        display={{ xs: "none", md: "flex" }}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: "linear-gradient(135deg, #0f172a 0%, #020617 100%)",
          borderRight: "1px solid #1e293b",
          p: 4
        }}
      >
        <Box 
            component="img" 
            src="/assets/logo.png" // Make sure to add a logo image to public/assets or remove this line
            alt="DevHub Logo" 
            sx={{ width: "80px", mb: 2, display: "none" }} // Hidden for now if you don't have an img
        />
        <Typography variant="h2" fontWeight="bold" color="white" mb={1}>
          Dev<span style={{ color: "#3b82f6" }}>Hub</span>
        </Typography>
        <Typography variant="h5" color="#94a3b8" maxWidth="400px" textAlign="center">
          The ultimate community for developers to <br/>
          <span style={{ 
             background: "linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)", 
             WebkitBackgroundClip: "text", 
             WebkitTextFillColor: "transparent",
             fontWeight: "bold"
          }}>
            Code, Collaborate, and Compete.
          </span>
        </Typography>
      </Box>

      {/* RIGHT SIDE - FORM */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <Box width="100%" maxWidth="450px">
          <Typography variant="h3" fontWeight="bold" mb={1}>
            {title}
          </Typography>
          <Typography color="#94a3b8" mb={4}>
            {subtitle}
          </Typography>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;