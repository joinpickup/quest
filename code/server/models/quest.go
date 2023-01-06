package models

func IsMessageStatus(s string) bool {
	return s == "queued" || s == "sent" || s == "failed"
}

type QuestMessage struct {
	Fingerprint string `json:"fingerprint"`
	Phone       string `json:"phone"`
	Quest       string `json:"quest"`
	Status      string `json:"status"`
}

type QuestPool struct {
	Remaining int32 `json:"remaining"`
}

type QuestStatus struct {
	CanMessage bool   `json:"can_message"`
	Remaining  int32  `json:"remaining"`
	Message    string `json:"message"`
}
