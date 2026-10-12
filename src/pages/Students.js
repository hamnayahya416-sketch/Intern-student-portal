import { useState } from "react"; // Hook for the search box value
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField"; // Search input
import Stack from "@mui/material/Stack"; // Vertical spacing between cards
import Alert from "@mui/material/Alert"; // Error message box
import CircularProgress from "@mui/material/CircularProgress"; // Spinning loader
import Box from "@mui/material/Box"; // Simple layout box
import StudentCard from "../components/StudentCard"; // One card per student

// Students receives the list + delete function from App.js via props.
function Students({ students, loading, error, onDelete }) {
  // searchText is the value typed in the search box
  const [searchText, setSearchText] = useState("");

  // BONUS: filter students by name, case-insensitive
  // "john" should match "John Doe". toLowerCase() makes both sides lowercase.
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Students
      </Typography>

      {/* Search box: value + onChange = controlled input */}
      <TextField
        fullWidth
        label="Search by name"
        variant="outlined"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Conditional rendering: show spinner while loading */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Conditional rendering: show error if the fetch failed */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Conditional rendering: empty list message (only when nothing to show) */}
      {!loading && !error && filteredStudents.length === 0 && (
        <Alert severity="info">No students yet</Alert>
      )}

      <Stack spacing={2}>
        {/* Map array -> one StudentCard per student */}
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} onDelete={onDelete} />
        ))}
      </Stack>
    </Container>
  );
}

export default Students;
