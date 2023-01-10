package dal

import (
	"crypto/rand"

	"github.com/joinpickup/middleware-go/database"
)

const otpChars = "1234567890"

func GenerateVerificationCode(length int) (string, error) {
	buffer := make([]byte, length)
	_, err := rand.Read(buffer)
	if err != nil {
		return "", err
	}

	otpCharsLength := len(otpChars)
	for i := 0; i < length; i++ {
		buffer[i] = otpChars[int(buffer[i])%otpCharsLength]
	}

	return string(buffer), nil
}

func InsertPhoneCode(phone string) (string, error) {
	code, _ := GenerateVerificationCode(6)

	// setup sql
	insertSQL := `
		insert into "phone_verification"(code, phone, valid)
		values ($1, $2, $3);
	`

	// setup sql
	updateSQL := `
		update "phone_verification"
		set valid = FALSE
		where phone = $1
	`

	// run it
	_, err := database.DB.Exec(updateSQL,
		phone,
	)
	if err != nil {
		return code, err
	}

	// run it
	_, err = database.DB.Exec(insertSQL,
		code,
		phone,
		true,
	)

	return code, err
}

func VerifyPhoneCode(phone string, code string) (bool, error) {
	var valid bool
	// setup and run sql
	selectSQL := `
		SELECT
			CASE WHEN EXISTS 
			(
				select phone, code, valid from "phone_verification"
				where phone = $1 and code = $2 and valid = true
			)
			THEN 'TRUE'
			ELSE 'FALSE'
		END
	`
	err := database.DB.QueryRow(selectSQL, phone, code).Scan(
		&valid,
	)
	if err != nil {
		return false, err
	}

	return valid, nil
}
