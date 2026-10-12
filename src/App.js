import { useState, useEffect } from "react"; // Hooks: state + run code on mount
import { HashRouter, Routes, Route } from "react-router-dom"; // HashRouter works on GitHub Pages
import axios from "axios"; // HTTP client for the API call
import Container from "@mui/material/Container";
import Navbar from "./components/Navbar"; // Top navigation bar
import Home from "./pages/Home";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import StudentDetail from "./pages/StudentDetail";
import NotFound from "./pages/NotFound";

function App() {
  // THE SINGLE SOURCE OF TRUTH: the students list lives here in App.js
  // and is passed down to pages as props.
  const [students, setStudents] = useState([]);

  // BONUS: loading + error states for the API fetch
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // useEffect runs after the component first renders (like componentDidMount)
  useEffect(() => {
    // axios.get returns a Promise; .then() runs when the data arrives
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // Map API users to our student shape: id, name, email, course
        const apiStudents = response.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          course: "Imported from API", // jsonplaceholder has no course field
        }));
        setStudents(apiStudents); // Update state -> page re-renders with data
        setLoading(false);
      })
      .catch(() => {
        // .catch() runs if the request fails (no internet, server down, ...)
        setError("Could not load students from the API");
        setLoading(false);
      });
  }, []); // Empty array [] = run only once when the app starts

  // Add a student: NEVER use push (mutates state), always spread into a NEW array
  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  // Delete a student: filter() returns a NEW array without the deleted student
  const deleteStudent = (idToDelete) => {
    setStudents(students.filter((student) => student.id !== idToDelete));
  };

  return (
    // HashRouter uses URLs like site.com/#/students.
    // It works on GitHub Pages (BrowserRouter would 404 on refresh).
    <HashRouter>
      {/* Navbar is outside <Routes> so it shows on every page */}
      <Navbar />

      <Container>
        <Routes>
          {/* Each path maps to one page component */}
          <Route path="/" element={<Home students={students} />} />
          <Route
            path="/students"
            element={
              <Students
                students={students}
                loading={loading}
                error={error}
                onDelete={deleteStudent}
              />
            }
          />
          <Route path="/add" element={<AddStudent onAdd={addStudent} />} />
          <Route
            path="/student/:id"
            element={<StudentDetail students={students} />}
          />
          {/* "*" matches any URL that nothing else matched -> 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
