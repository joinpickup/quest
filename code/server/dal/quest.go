package dal

import (
	"github.com/joinpickup/middleware-go/database"
	"github.com/joinpickup/quest-server/models"
)

func GetQuestPool() (*models.QuestPool, error) {
	var pool models.QuestPool

	// setup and run sql
	selectSQL := `
		select remaining from quest_pool;
	`
	err := database.DB.QueryRow(selectSQL).Scan(
		&pool.Remaining,
	)

	if err != nil {
		return nil, err
	}

	return &pool, nil
}

func GetMessage(phone string) (*models.QuestMessage, error) {
	var message models.QuestMessage

	// setup and run sql
	selectSQL := `
		select distinct phone, quest, status from "quest_message"
		where phone = $1
	`
	err := database.DB.QueryRow(selectSQL, phone).Scan(
		&message.PhoneHash,
		&message.Quest,
		&message.Status,
	)

	if err != nil {
		return nil, err
	}

	return &message, nil
}

func AddMessage(message models.QuestMessage) error {
	// insert message
	insertSQL := `
		insert into "quest_message" ("fingerprint", "phone", "quest", "status")
		values ($1, $2, $3, $4)
	`
	_, err := database.DB.Exec(insertSQL, message.Fingerprint, message.PhoneHash, message.Quest, message.Status)
	if err != nil {
		return err
	}

	// reduce
	updateSQL := `
		update "quest_pool"
		set remaining = remaining - 1
	`
	_, err = database.DB.Exec(updateSQL)
	return err
}

func ResetPool() error {
	// reduce
	updateSQL := `
		update "quest_pool"
		set remaining = 50
	`
	_, err := database.DB.Exec(updateSQL)
	return err
}

func AddMessagesToPool(amount int32) error {
	// reduce
	updateSQL := `
		update "quest_pool"
		set remaining = remaining + $1
	`
	_, err := database.DB.Exec(updateSQL, amount)
	return err
}

func GetMessages() ([]models.QuestMessage, error) {
	var messages []models.QuestMessage
	selectSQL := `
		select fingerprint, phone, quest, status from "quest_message"
		where status = 'queued'
	`
	rows, err := database.DB.Query(selectSQL)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var message models.QuestMessage

		// get row
		err := rows.Scan(
			&message.Fingerprint,
			&message.PhoneHash,
			&message.Quest,
			&message.Status,
		)
		if err != nil {
			return nil, err
		}

		// add row to roles
		messages = append(messages, message)
	}
	return messages, nil
}

func PurgeMessages() error {
	deleteSQL := `
		delete from "quest_message"
	`
	_, err := database.DB.Exec(deleteSQL)
	return err
}

func MarkMessageStatus(status string, message models.QuestMessage) error {
	insertSQL := `
		update "quest_message"
		set status = $1
		where phone = $2
	`
	_, err := database.DB.Exec(insertSQL, status, message.PhoneHash)
	return err
}

func WhiteListPhone(phone_hash string) error {
	// insert message
	insertSQL := `
		insert into "quest_whitelist" ("phone_hash")
		values ($1)
	`
	_, err := database.DB.Exec(insertSQL, phone_hash)
	return err
}
