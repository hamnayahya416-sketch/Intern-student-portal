# EXPLANATION - Intern Student Portal

This file explains the project in simple English so you can study it and answer questions from your instructor.

---

## 1. What each file does

### `src/App.js` - The brain of the app
- Holds the **students list in state** (`useState`). This is the single source of truth.
- Runs a **fetch on load** (`useEffect` + Axios) from `https://jsonplaceholder.typicode.com/users` and maps each user to `{ id, name, email, course }`.
- Keeps `loading` and `error` states so the UI can show a spinner or an error message.
- Defines two functions:
  - `addStudent(newStudent)` - adds a student using `[...students, newStudent]` (creates a NEW array, never mutates).
  - `deleteStudent(id)` - removes a student using `filter()`.
- Sets up **all routes** with `HashRouter`, `Routes`, `Route`. The `*` route catches unknown URLs and shows the 404 page. We use `HashRouter` (not `BrowserRouter`) so the app works when hosted on GitHub Pages, where refreshing a page like `/#/students` would otherwise show a 404.
- Renders `Navbar` above the routes so it appears on every page.

### `src/index.js` - The entry point
- CRA generated this file. It finds `<div id="root">` in `public/index.html` and renders the `<App />` component inside it. You rarely need to change it.

### `src/components/Navbar.js` - The top menu
- Uses MUI `AppBar`, `Toolbar`, `Button`.
- Each button uses `component={Link} to="/..."` so clicking navigates with React Router **without reloading the page**.

### `src/components/StudentCard.js` - One student card
- A "presentational" (dumb) component: it only **displays** data given to it.
- Receives `student` (object) and `onDelete` (function) via props.
- "View Details" links to `/student/<id>`. "Delete" calls `onDelete(student.id)`.

### `src/pages/Home.js` - Welcome page
- Shows a welcome message and how many students exist (`students.length`).
- Has buttons that link to `/students` and `/add`.

### `src/pages/Students.js` - The list page
- Receives `students`, `loading`, `error`, `onDelete` from App.js.
- Has a **search TextField** (bonus): `useState` stores what you type, and `filter()` keeps only students whose name contains the search text (case-insensitive via `toLowerCase()`).
- **Conditional rendering**:
  - `loading` -> spinner
  - `error` -> red error box
  - empty list -> "No students yet"
  - otherwise -> one `StudentCard` per student

### `src/pages/AddStudent.js` - The form page
- Three `useState` hooks store `name`, `email`, `course`.
- On submit: `event.preventDefault()` stops the page reload, checks that all fields are filled, creates `{ id: Date.now(), name, email, course }`, calls `onAdd(newStudent)`, then `navigate("/students")`.

### `src/pages/StudentDetail.js` - One student's details
- `useParams()` reads `:id` from the URL (e.g. `/student/1712345678`).
- `students.find(...)` looks for a matching student.
- If found -> show details. If not -> show "Student not found".

### `src/pages/NotFound.js` - The 404 page
- Shown when the URL matches no route. Has a "Go Home" button.

---

## 2. How data flows (very important!)

```
App.js (holds students state)
   |
   |--- props: students, loading, error, onDelete ---> Students.js
   |                                                     |
   |                                                     |--- props: student, onDelete ---> StudentCard.js
   |
   |--- props: onAdd ---> AddStudent.js   (calls onAdd -> updates state in App.js)
   |
   |--- props: students ---> StudentDetail.js
   |
   |--- props: students ---> Home.js
```

**Rules to remember:**
1. State lives in **App.js** because many pages need the same data.
2. Data goes **down** to pages as **props** (like sending arguments to a function).
3. When a child needs to **change** state (add/delete), the parent passes a **function** down (`onAdd`, `onDelete`). The child calls it, and App.js updates its state. React then re-renders everything automatically.

**Why `[...students, newStudent]` and not `push`?**
`push` changes the old array silently, and React may not notice. Spreading creates a **new array**, so React sees a change and re-renders the page. Same idea with `filter()` for delete.

---

## 3. Why each hook is used

| Hook | Where | Why |
|------|-------|-----|
| `useState` | App.js | To store the students list, loading, and error so the UI updates when they change. |
| `useState` | Students.js | To remember what the user typed in the search box. |
| `useState` | AddStudent.js | To remember the values of the three form inputs. |
| `useEffect` | App.js | To fetch data from the API **once** when the app starts (the empty `[]` array means "run only on mount"). |
| `useParams` | StudentDetail.js | To read the `:id` part of the URL, so one page can show any student. |
| `useNavigate` | AddStudent.js | To programmatically move the user to `/students` after a successful add (like a `return redirect()`). |

---

## 4. Checklist - confirm the app runs

1. `npm install` finished with no errors.
2. `npm run build` prints **"Compiled successfully"** with no errors or warnings.
3. `npm start` opens http://localhost:3000 - the blue navbar appears.
4. Home shows "You currently have 10 student(s)" (10 = users from the API, if internet works).
5. Students page shows 10 cards after a short spinner. Search "Leanne" shows 1 result.
6. Add Student: fill the 3 fields, submit -> you land on /students with the new card on top.
7. Click "View Details" -> URL becomes `/student/<id>` and details show.
8. Click "Delete" -> the card disappears.
9. Delete every student -> "No students yet" appears.
10. Visit http://localhost:3000/anything-else -> 404 page appears.
11. Turn off internet, reload -> red error "Could not load students from the API" appears.

---

## 5. Five questions your instructor might ask (with answers)

**Q1: Why is the state in App.js and not in the Students page?**
A: Because more than one page needs the same data. Home shows the count, Students shows the list, and AddStudent adds to it. Putting the state in the closest common parent (App.js) and passing it down as props is called **"lifting state up"** and avoids duplicating data.

**Q2: What is the difference between `useState` and `useEffect`?**
A: `useState` **stores** a value that can change and triggers a re-render when you update it. `useEffect` **runs extra code** at specific times - for example, fetching data once after the component first appears. The `[]` second argument means "run only once".

**Q3: Why do we use `[...students, newStudent]` instead of `students.push(newStudent)`?**
A: React only re-renders when state is **replaced with a new value**, not when the old value is mutated. `push` mutates the existing array, so React may not update the screen. The spread operator `[...]` creates a brand-new array, so React sees the change.

**Q4: What does `useParams` do, and why is the route written `/student/:id`?**
A: The colon `:` tells React Router that `id` is a **dynamic placeholder**. `useParams()` returns an object like `{ id: "1712345678" }` taken from the URL, so the same page can display any student - we just `find()` the student whose id matches.

**Q5: What is the difference between a controlled and an uncontrolled input?**
A: A **controlled** input (what we use) stores its value in React state with `value={...}` + `onChange={...}`. React is always the boss of the value. An uncontrolled input lets the DOM hold the value and you read it only on submit with a `ref`. Controlled inputs are easier to validate and clear.

**Bonus Q6: What happens when I click a navbar button - does the page reload?**
A: No. `component={Link} to="/students"` uses the History API to change the URL and React swaps only the page component. The whole app does not reload, so the state in App.js (like your added students) is kept safe.

**Bonus Q7: Why do we compare ids with `String(s.id) === String(id)` on the detail page?**
A: The API returns numeric ids, but `useParams()` always gives a string. Converting both sides to strings makes the comparison reliable no matter which type the id is.
