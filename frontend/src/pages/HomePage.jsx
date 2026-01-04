import { Box, useMediaQuery } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Rightbar from "../components/Rightbar";
import Navbar from "../components/Navbar"; // We will create this next

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box bgcolor="#020617" minHeight="100vh" color="white">
      <Navbar />
      
      <Box
        width="100%"
        padding="2rem 4%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="space-between"
      >
        {/* LEFT COLUMN (Navigation) */}
        <Box flexBasis={isNonMobileScreens ? "22%" : undefined}>
          <Sidebar />
        </Box>

        {/* MIDDLE COLUMN (The Feed) */}
        <Box
          flexBasis={isNonMobileScreens ? "50%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Feed />
        </Box>

        {/* RIGHT COLUMN (Trending/Extras) */}
        {isNonMobileScreens && (
          <Box flexBasis="22%">
            <Rightbar />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;