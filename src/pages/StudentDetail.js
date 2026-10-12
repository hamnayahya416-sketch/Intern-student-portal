import { useParams, Link } from "react-router-dom"; // useParams reads :id from the URL
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider"; // Thin line between rows
import Alert from "@mui/material/Alert"; // Warning box for "not found"

// StudentDetail receives the students list from App.js.
function StudentDetail({ students }) {
  // useParams returns an object like { id: "1712345678" } from /student/:id
  const { id } = useParams();

  // Find the student whose id matches the URL. Note: ids from the API are numbers,
  // so we compare with == (or convert with Number) to be safe.
  const student = students.find((s) => String(s.id) === String(id));

  // Conditional rendering: if no match, show the "not found" message
  if (!student) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="warning">Student not found</Alert>
        <Button component={Link} to="/students" sx={{ mt: 2 }}>
          Back to Students
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Student Details
        </Typography>

        {/* Divider separates each row visually */}
        <Stack spacing={2}>
          <Typography variant="h6">Name: {student.name}</Typography>
          <Divider />
          <Typography variant="body1">Email: {student.email}</Typography>
          <Divider />
          <Typography variant="body1">Course: {student.course}</Typography>
          <Divider />
          <Typography variant="body2" color="text.secondary">
            ID: {student.id}
          </Typography>
        </Stack>

        <Button component={Link} to="/students" sx={{ mt: 3 }}>
          Back to Students
        </Button>
      </Paper>
    </Container>
  );
}

export default StudentDetail;
