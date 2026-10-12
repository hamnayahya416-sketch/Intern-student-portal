import { useState } from "react"; // Hook for form fields
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField"; // Input fields
import Button from "@mui/material/Button"; // Submit button
import Stack from "@mui/material/Stack"; // Vertical spacing
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert"; // Warning box
import { useNavigate } from "react-router-dom"; // Hook to change page after submit

// AddStudent receives "onAdd" (the addStudent function) from App.js.
function AddStudent({ onAdd }) {
  // Three pieces of state, one per input field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [formError, setFormError] = useState(""); // Shows a message if fields are empty

  // useNavigate gives us a function to programmatically change the URL
  const navigate = useNavigate();

  // event.preventDefault() stops the browser from reloading the page
  const handleSubmit = (event) => {
    event.preventDefault();

    // Simple validation: all fields are required
    if (!name || !email || !course) {
      setFormError("Please fill in all fields");
      return;
    }

    // Date.now() returns a unique timestamp number -> used as the id
    const newStudent = { id: Date.now(), name, email, course };

    // Call the function from App.js that updates the state in App.js
    onAdd(newStudent);

    // After adding, go to the Students list page
    navigate("/students");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Student
        </Typography>

        {/* noValidate stops browser popup, we do our own check */}
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            {formError && <Alert severity="warning">{formError}</Alert>}

            {/* value + onChange = "controlled component": React owns the input value */}
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Course"
              variant="outlined"
              value={course}
              onChange={(event) => setCourse(event.target.value)}
            />

            <Button type="submit" variant="contained" size="large">
              Add Student
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default AddStudent;
