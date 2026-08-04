import api from "./api";

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
}

const chatService = {
  async sendMessage(message: string): Promise<ChatResponse> {
    const { data } = await api.post<ChatResponse>("/chat", {
      message,
    });

    return data;
  },
};

export default chatService;