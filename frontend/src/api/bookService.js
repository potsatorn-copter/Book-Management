import axios from "axios";

const API_URL = "http://localhost:8080/books";

export const getBooks = () => axios.get(API_URL);
export const getBook = (id) => axios.get(`${API_URL}/${id}`);
export const createBook = (data) => axios.post(API_URL, data);
export const updateBook = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteBook = async (id) => {await axios.delete(`${API_URL}/${id}`);};
