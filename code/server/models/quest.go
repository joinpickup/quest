package models

func IsMessageStatus(s string) bool {
	return s == "queued" || s == "sent" || s == "failed"
}

type QuestMessage struct {
	Phone     string
	MemberID  int32  `json:"member_id"`
	PhoneHash string `json:"phone_hash"`
	Status    string `json:"status"`
}

type QuestPool struct {
	Remaining int32 `json:"remaining"`
}

type QuestStatus struct {
	CanMessage  bool   `json:"can_message"`
	Remaining   int32  `json:"remaining"`
	Message     string `json:"message"`
	PaymentLink string `json:"payment_link"`
}

type QuestMember struct {
	ID        int32  `json:"id"`
	PhoneHash string `json:"string"`
}

type VerificationBody struct {
	Valid bool `json:"valid"`
}
