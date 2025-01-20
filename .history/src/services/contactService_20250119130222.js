import api from "./api";

export const contactService = {
  // Gửi contact message
  sendMessage: async (messageData) => {
    try {
      // const response = await api.post('/contact', messageData);
      // return response.data;
      
      // Mock API response
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            id: Date.now(),
            ...messageData,
            status: 'new',
            createdAt: new Date().toISOString()
          });
        }, 500);
      });
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },

  // Lấy danh sách messages (cho admin)
  getMessages: async () => {
    try {
      // const response = await api.get('/contact');
      // return response.data;
      return mockMessages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }
};

const mockMessages = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe", 
    email: "john@example.com",
    subject: "Question about services",
    message: "Hi, I would like to know more about your vaccination services.",
    status: "new",
    createdAt: "2024-03-15T10:30:00Z"
  },
  // ... other mock messages
]; 