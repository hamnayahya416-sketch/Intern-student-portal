import Card from "@mui/material/Card"; // The box around one student
import CardContent from "@mui/material/CardContent"; // Padding + content area inside the card
import CardActions from "@mui/material/CardActions"; // Row for the buttons
import Typography from "@mui/material/Typography"; // Text
import Button from "@mui/material/Button"; // Buttons
import Stack from "@mui/material/Stack"; // Vertical spacing helper
import Chip from "@mui/material/Chip"; // Small pill that shows the course
import { Link } from "react-router-dom"; // For "View Details"

// StudentCard is a "dumb" component: it only displays data given to it.
// props: student (object) and onDelete (function) come from the Students page.
function StudentCard({ student, onDelete }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h6">{student.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {student.email}
          </Typography>
          {/* label="Course" adds a small text label before the course name */}
          <Chip label={student.course} color="primary" variant="outlined" />
        </Stack>
      </CardContent>

      <CardActions>
        {/* to={`/student/${student.id}`} builds a dynamic URL like /student/1712345678 */}
        <Button size="small" component={Link} to={`/student/${student.id}`}>
          View Details
        </Button>
        {/* onClick calls the delete function from App.js with this student's id */}
        <Button size="small" color="error" onClick={() => onDelete(student.id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default StudentCard;
