import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

const registerSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 chars").required("Password is required"),
});

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    console.log("Registering with:", values);
    navigate("/login");
  };

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
    <AuthLayout title="Create Account" subtitle="Join the DevHub community today.">
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={registerSchema}
        onSubmit={handleRegister}
      >
        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap="1.5rem">
              
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                error={Boolean(touched.name) && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={inputStyles}
              />

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

              <TextField
                fullWidth
                label="Password"
                type="password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={inputStyles}
              />

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
                Sign Up
              </Button>

              <Typography textAlign="center" color="#94a3b8">
                Already have an account?{" "}
                <span
                  style={{ color: "#3b82f6", cursor: "pointer", fontWeight: "600" }}
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </span>
              </Typography>
            </Box>
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default RegisterPage;