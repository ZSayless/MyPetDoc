import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/slices/authSlice';

const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // Kiểm tra lỗi 401 Unauthorized
      if (error.response && error.response.status === 401) {
        // Kiểm tra nếu là lỗi token hết hạn
        if (error.response.data?.message?.includes('expired')) {
          // Dispatch action logout
          store.dispatch(logout());
          
          // Chuyển hướng về trang chủ
          window.location.href = '/';
          
          // Hiển thị thông báo
          alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
        }
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors; 