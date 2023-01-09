import { NextApiRequest, NextApiResponse } from "next";
import { getTodayQuest } from "../../lib/notion";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "GET") {
    const quest = await getTodayQuest();
    response.send(quest);
    return;
  } else {
    response.setHeader("Allow", "GET");
    response.status(405).end("Method Not Allowed");
    return;
  }
}
