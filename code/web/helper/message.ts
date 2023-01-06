import { QuestMessage } from "../model/quest";

export async function addMessage(message: QuestMessage) {
    await fetch("/api/proxy/quest/message", {
        method: "POST",
        body: JSON.stringify(message)
    })
}