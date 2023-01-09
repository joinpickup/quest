import { Client } from "@notionhq/client";
import { isThisWeek, isToday } from "date-fns";
import { QuestQuestion } from "../model/quest";

const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN,
});

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results;
};

export async function getTodayQuest(): Promise<QuestQuestion> {
  const database = await getDatabase(process.env.NOTION_PAGE_ID as string);
  for (const page of database) {
    const id = (page as any)?.properties?.ID?.number;
    const status = (page as any)?.properties?.Status?.status?.name;
    const today = isToday(
      new Date(
        ((page as any)?.properties["Quest Day"]?.date?.start as string) ??
          "1900"
      )
    );
    const question = (page as any)?.properties?.Name?.title[0].plain_text;

    if (today && status == "Approved" && id && question) {
      return { id, quest: question };
    }
  }
  return { id: 0, quest: "No Quest today :( blame Andrew" };
}
