import { API_ENDPOINTS, buildApiUrl } from "@/apiInstance";
import { cookies } from "next/headers";

const getChatResponse = async (message: string) => {
  try {
    const cookieStorage = await cookies();

    const url = new URL(buildApiUrl(API_ENDPOINTS.chat.getChatResponse));

    const result = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStorage.toString(),
      },
      body: JSON.stringify({ message }),
    });

    const data = await result.json();

    if (!data.success) {
      return {
        error: data.message || "Failed to generate chat response",
        data: null,
      };
    }
    
    return {
      message: data.message,
      data: data.data,
    };
  } catch {
    return {
      data: null,
      error: "Something went wrong while connecting to the AI assistant.",
    };
  }
};

export const ChatService = {
  getChatResponse,
};
