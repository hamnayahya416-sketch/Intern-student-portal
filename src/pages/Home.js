import Container from "@mui/material/Container"; // Centers content with max width
import Typography from "@mui/material/Typography"; // Text
import Button from "@mui/material/Button"; // Buttons
import Stack from "@mui/material/Stack"; // Vertical layout helper
import Paper from "@mui/material/Paper"; // Simple raised box
import { Link } from "react-router-dom"; // Router links

// Home receives "students" as a prop so it can show how many students exist.
function Home({ students }) {
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      {/* Paper gives a nice card-like background */}
      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Intern Student Portal
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          A simple portal to manage students. You currently have{" "}
          {/* students.length = number of items in the array */}
          <strong>{students.length}</strong> student(s) registered.
        </Typography>

        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" component={Link} to="/students">
            View Students
          </Button>
          <Button variant="outlined" component={Link} to="/add">
            Add Student
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Home;
