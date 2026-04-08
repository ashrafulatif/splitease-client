"use server";

import { ChatService } from "@/service/chat.service";

export const executeChatAction = async (message: string) => {
  const result = await ChatService.getChatResponse(message);
  return result;
};
