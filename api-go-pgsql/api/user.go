package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type postUserRequest struct {
	Name    string `json:"name" binding:"required"`
	Email   string `json:"email" binding:"required"`
	Subject string `json:"subject"`
	Message string `json:"message"`
}

func (server *Server) createUser(ctx *gin.Context) {
	var req postUserRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusUnprocessableEntity, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, req)

}
