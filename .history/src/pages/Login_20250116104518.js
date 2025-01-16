import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/userSlice';

function Login() {
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      // Redirect sau khi login thành công
      navigate('/admin');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // ... rest of the component
} 