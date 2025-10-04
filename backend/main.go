package main

import (
	"book-management/database"
	"book-management/models"
	"book-management/routes"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"   // ✅ เพิ่มบรรทัดนี้
	"github.com/gofiber/fiber/v2/middleware/logger" // ✅ เพิ่มบรรทัดนี้

	"github.com/joho/godotenv"
)

func main() {
	// Load ENV
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️  No .env file found, using defaults")
	}

	// Connect Database
	database.ConnectDB()
	database.DB.AutoMigrate(&models.Book{})

	app := fiber.New()

	// ✅ อนุญาตให้ React (5173) เรียกได้
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	app.Use(logger.New())

	// Routes
	routes.BookRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(app.Listen(":" + port))
}
