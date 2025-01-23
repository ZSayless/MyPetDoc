
import { store } from "../redux/store";
import { addContactMessage } from "../redux/slices/adminSlice";

export const contactService = {
  // Gửi contact message
  sendMessage: async (messageData) => {
    try {
      // const response = await api.post('/contact', messageData);
      // return response.data;

      // Mock API response
      const newMessage = {
        id: Date.now(),
        ...messageData,
        status: "unread",
        createdAt: new Date().toISOString(),
      };

      // Dispatch to Redux store
      store.dispatch(addContactMessage(newMessage));

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(newMessage);
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
      return store.getState().admin.contactMessages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },
};
