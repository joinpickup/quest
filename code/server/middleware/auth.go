package middleware

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/dgrijalva/jwt-go"
)

type Claims struct {
	jwt.StandardClaims
}

func ValidateToken(r *http.Request) (*Claims, error) {
	authHeader := strings.Split(r.Header.Get("Authorization"), " ")
	if len(authHeader) != 2 {
		return nil, fmt.Errorf("not a valid token")
	}

	token := authHeader[1]
	claims := &Claims{}
	tkn, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_STRING")), nil
	})
	if err != nil {
		return nil, err
	}

	if !tkn.Valid {
		return nil, fmt.Errorf("token is not valid")
	}

	return claims, err
}
