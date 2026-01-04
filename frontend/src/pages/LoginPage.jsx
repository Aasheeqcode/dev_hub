import { Box, Button, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material"; // Run: npm install @mui/icons-material
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "../layouts/AuthLayout";

// Validation Schema
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    console.log("Logging in with:", values);
    // Add your API fetch logic here later
    navigate("/home"); 
  };

  // Custom styling for dark inputs
  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      backgroundColor: "#0f172a",
      borderRadius: "8px",
      "& fieldset": { borderColor: "#1e293b" },
      "&:hover fieldset": { borderColor: "#3b82f6" },
      "&.Mui-focused fieldset": { borderColor: "#3b82f6" },
    },
    "& .MuiInputLabel-root": { color: "#94a3b8" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#3b82f6" },
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Please enter your details to sign in.">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="1.5rem">
              
              {/* EMAIL */}
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={inputStyles}
              />

              {/* PASSWORD */}
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={inputStyles}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        sx={{ color: "#94a3b8" }}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* FORGOT PASSWORD */}
              <Box display="flex" justifyContent="flex-end">
                <Typography 
                    sx={{ color: "#3b82f6", cursor: "pointer", fontSize: "0.9rem" }}
                    onClick={() => navigate("/forgot-password")}
                >
                    Forgot Password?
                </Typography>
              </Box>

              {/* SUBMIT BUTTON */}
              <Button
                fullWidth
                type="submit"
                sx={{
                  p: "0.8rem",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#2563eb" },
                }}
              >
                Sign In
              </Button>

              {/* SOCIAL LOGIN */}
              <Button
                fullWidth
                startIcon={<Google />}
                sx={{
                  p: "0.8rem",
                  backgroundColor: "transparent",
                  border: "1px solid #1e293b",
                  color: "white",
                  textTransform: "none",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#1e293b" },
                }}
              >
                Sign in with Google
              </Button>

              {/* FOOTER */}
              <Typography textAlign="center" color="#94a3b8">
                Don't have an account?{" "}
                <span
                  style={{ color: "#3b82f6", cursor: "pointer", fontWeight: "600" }}
                  onClick={() => navigate("/register")}
                >
                  Sign up
                </span>
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default LoginPage;