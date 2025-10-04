package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Book struct {
	ID     string `json:"id" gorm:"type:uuid;primaryKey"`
	Title  string `json:"title"`
	Author string `json:"author"`
	gorm.Model
}

func (b *Book) BeforeCreate(tx *gorm.DB) (err error) {
	b.ID = uuid.New().String()
	return
}
