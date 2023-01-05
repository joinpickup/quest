import { Client } from "@notionhq/client"
import { isThisWeek, isToday } from "date-fns";


const notion = new Client({
  auth: process.env.NOTION_ACCESS_TOKEN
})

export const getDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results;
};

export async function getTodayQuestion(): Promise<string> {
  const database = await getDatabase(process.env.NOTION_PAGE_ID as string)
  for (const page of database) {
    const status = (page as any)?.properties?.Status?.status?.name
    const today = isThisWeek(new Date((page as any)?.properties?.Date?.date?.start as string ?? "1900"))
    const question = (page as any)?.properties?.Name?.title[0].plain_text
    if (today && status == "Today" && question) {
      return question
    }
  }
  return "No question today :( blame Andrew"
}
