import BookList from "./components/BookList";

function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>📚 Book Management</h1>
      <BookList />
    </div>
  );
}

export default App;
