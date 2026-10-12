import AppBar from "@mui/material/AppBar"; // Top blue bar of the site
import Toolbar from "@mui/material/Toolbar"; // Holds the buttons inside the bar
import Button from "@mui/material/Button"; // Clickable nav button
import Typography from "@mui/material/Typography"; // Text component
import { Link } from "react-router-dom"; // Client-side navigation (no page reload)

// Navbar shows on every page because we render it in App.js above <Routes>
function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Brand title on the left */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Intern Student Portal
        </Typography>

        {/* component={Link} makes the Button act like a router link */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/students">
          Students
        </Button>
        <Button color="inherit" component={Link} to="/add">
          Add Student
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
