import { QuestMessage } from "../model/quest";

export async function addMessage(message: QuestMessage) {
    const res = await fetch("/api/proxy/quest/message", {
        method: "POST",
        body: JSON.stringify(message)
    })

    if (res.status != 200) {
        return Promise.reject(await res.text())
    }
}