import { ErrorBoundary } from "react-error-boundary";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function FallbackUI({ resetErrorBoundary }) {
  const Navigate = useNavigate();

  const handleReset = () => {
    resetErrorBoundary();
    Navigate("/boards");
  };

  return (
    <Box
      sx={{
        display: "flex",
        role: "alert",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: "background.default",
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" sx={{ color: "text-secondary" }} gutterBottom>
        Oops!! Something went Wrong.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleReset}>
        Go Back to Home
      </Button>
    </Box>
  );
}

export default function SetErrorBoundary({ children }) {
  return (
    <ErrorBoundary FallbackComponent={FallbackUI}>{children}</ErrorBoundary>
  );
}
