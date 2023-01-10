import { VerifyBody } from "../model/quest";

export async function addMessage(phone: string) {
  const res = await fetch(`/api/proxy/quest/message?phone=${phone}`, {
    method: "POST",
  });

  if (res.status != 200) {
    return Promise.reject(await res.text());
  }
}

export async function sendOTP(phone: string, type: string) {
  const res = await fetch(`/api/proxy/quest/otp/send?phone=${phone}&type=${type}`, {
    method: "POST",
  });

  if (res.status != 200) {
    return Promise.reject(await res.text());
  }
}

export async function verifyOTP(phone: string, code: string, type: string) {
  let res = await fetch(
    `/api/proxy/quest/otp/verify?phone=${phone}&code=${code}`,
    {
      method: "POST",
    }
  );

  if (res.status != 200) {
    return Promise.reject(await res.text());
  }

  const body: VerifyBody = await res.json();
  if (!body.valid) {
    return Promise.reject("Incorrect code.");
  }

  if (type == "join") {
    res = await fetch(
      `/api/proxy/quest/join?phone=${phone}`,
      {
        method: "POST",
      }
    );

    if (res.status != 200) {
      return Promise.reject(await res.text());
    }
  } else {
    res = await fetch(
      `/api/proxy/quest/leave?phone=${phone}`,
      {
        method: "POST",
      }
    );

    if (res.status != 200) {
      return Promise.reject(await res.text());
    }
  }
}
