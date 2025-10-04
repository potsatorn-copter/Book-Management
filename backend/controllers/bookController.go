package controllers

import (
	"book-management/database"
	"book-management/models"

	"github.com/gofiber/fiber/v2"
)

// 📘 Get all books
func GetBooks(c *fiber.Ctx) error {
	var books []models.Book
	database.DB.Find(&books)
	return c.JSON(books)
}

// 📗 Get single book by UUID
func GetBook(c *fiber.Ctx) error {
	id := c.Params("id")
	var book models.Book

	// ใช้เงื่อนไข "id = ?" สำหรับ UUID (string)
	if err := database.DB.First(&book, "id = ?", id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Book not found"})
	}

	return c.JSON(book)
}

// 📘 Create a new book
func CreateBook(c *fiber.Ctx) error {
	book := new(models.Book)

	if err := c.BodyParser(book); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	if err := database.DB.Create(&book).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to create book"})
	}

	return c.Status(201).JSON(book)
}

// ✏️ Update existing book
func UpdateBook(c *fiber.Ctx) error {
	id := c.Params("id")
	var book models.Book

	if err := database.DB.First(&book, "id = ?", id).Error; err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Book not found"})
	}

	update := new(models.Book)
	if err := c.BodyParser(update); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	book.Title = update.Title
	book.Author = update.Author

	if err := database.DB.Save(&book).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to update book"})
	}

	return c.JSON(book)
}

// 🗑️ Delete book by UUID
func DeleteBook(c *fiber.Ctx) error {
	id := c.Params("id")

	if err := database.DB.Delete(&models.Book{}, "id = ?", id).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to delete book"})
	}

	return c.SendStatus(204)
}
