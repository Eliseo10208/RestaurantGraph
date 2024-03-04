import webhooksModels from "../models/webhooksModel";
import axios from "axios";

export async function WebhookController(event: string, data: string): Promise<void> {
  const list = await webhooksModels.find({ event: event });
  console.log(list);


  await Promise.all(list.map(async (webhook) => {
    try {
      await axios.post(webhook.url, {
        content: `Evento: ${event}, Data: ${data}`,
      });
      console.log(`Webhook enviado a ${webhook.url}`);
    } catch (error) {
      console.error(`Error al enviar el webhook a ${webhook.url}`, error);
    }
  }));
}
