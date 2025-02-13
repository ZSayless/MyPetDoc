import axios from "axios";
import { store } from "../redux/store";
import { addContactMessage } from "../redux/slices/adminSlice";

const BASE_URL = process.env.REACT_APP_API_URL;
export const contactMessageService = {
  // Gửi contact message
  sendMessage: async (messageData) => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      // Gọi API với token trong header
      const response = await axios.post(`${BASE_URL}/contact-messages/create`, messageData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Tạo message object từ response API
      const newMessage = {
        id: response.data.id || Date.now(),
        ...messageData,
        status: "unread",
        createdAt: response.data.createdAt || new Date().toISOString(),
      };

      // Dispatch to Redux store
      store.dispatch(addContactMessage(newMessage));

      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
};
