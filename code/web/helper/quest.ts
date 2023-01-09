import { QuestMessage, VerifyBody } from "../model/quest";

export async function addMessage(message: QuestMessage) {
  const res = await fetch("/api/proxy/quest/message", {
    method: "POST",
    body: JSON.stringify(message),
  });

  if (res.status != 200) {
    return Promise.reject(await res.text());
  }
}

export async function sendOTP(phone: string) {
  const res = await fetch(`/api/proxy/quest/otp/send?phone=${phone}`, {
    method: "POST",
  });

  if (res.status != 200) {
    return Promise.reject(await res.text());
  }
}

export async function verifyOTP(phone: string, code: string) {
  const res = await fetch(`/api/proxy/quest/otp/send?phone=${phone}&code=${code}`, {
    method: "POST",
  });

  if (res.status != 200) {
    return Promise.reject(await res.text());
  }

  const body: VerifyBody = await res.json()
  if (!body.valid) {
    return Promise.reject("Incorrect code.");
  }
}