import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/BookList.css";

const API_URL = "http://localhost:8080/books"; // Backend API

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [theme, setTheme] = useState("light");

  // 📦 ดึงข้อมูลหนังสือทั้งหมด
  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL);
      setBooks(res.data);
    } catch (err) {
      console.error("❌ Error fetching books:", err);
    }
  };

  // ⚙️ เพิ่มหนังสือใหม่หรือแก้ไข
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await axios.put(`${API_URL}/${editingBook.id}`, { title, author });
      } else {
        await axios.post(API_URL, { title, author });
      }
      setTitle("");
      setAuthor("");
      setEditingBook(null);
      fetchBooks();
    } catch (err) {
      console.error("❌ Error saving book:", err);
    }
  };

  // ✏️ ดึงข้อมูลมาแก้ไข
  const handleEdit = (book) => {
    setEditingBook(book);
    setTitle(book.title);
    setAuthor(book.author);
  };

  // 🗑️ ลบหนังสือตาม UUID
  const handleDelete = async (id) => {
    console.log("🗑️ Deleting ID:", id);
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("❌ Error deleting book:", err);
    }
  };

  // 🌞🌙 Toggle Light / Dark Mode
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // เรียกครั้งแรก
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="app-container">
      {/* 🌞🌙 ปุ่มเปลี่ยนธีม */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <div className="content">
        {/* 📋 Book List */}
        <div className="card">
          <h2>📖 Book List</h2>
          {books.length === 0 ? (
            <p className="empty">No books found.</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book.id}>
                    <td>{index + 1}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(book)}
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(book.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* ➕ Add / Edit Book */}
        <div className="card">
          <h2>{editingBook ? "✏️ Edit Book" : "➕ Add New Book"}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <button type="submit">
              {editingBook ? "💾 Update" : "✅ Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookList;
