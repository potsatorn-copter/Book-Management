package routes

import (
	"book-management/controllers"

	"github.com/gofiber/fiber/v2"
)

func BookRoutes(app *fiber.App) {
	app.Get("/books", controllers.GetBooks)
	app.Get("/books/:id", controllers.GetBook)
	app.Post("/books", controllers.CreateBook)
	app.Put("/books/:id", controllers.UpdateBook)
	app.Delete("/books/:id", controllers.DeleteBook)
}
