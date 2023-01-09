export interface QuestMessage {
  fingerprint: string;
  phone: string;
  quest: string;
  status: string;
}

export interface QuestStatus {
  can_message: boolean;
  remaining: number;
  message: string;
  payment_link: string;
}

export interface QuestQuestion {
  quest: string;
  id: number;
}

export interface VerifyBody {
  valid: boolean;
}
