import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

// NotFound is shown when the URL does not match any route (the "*" route).
function NotFound() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h2" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Page not found
        </Typography>
        <Button variant="contained" component={Link} to="/" sx={{ mt: 2 }}>
          Go Home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFound;
