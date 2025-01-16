import { useSelector } from 'react-redux';

function UserAvatar() {
  const { currentUser } = useSelector((state) => state.user);
  
  const getInitial = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="w-8 h-8 rounded-full bg-[#98E9E9] flex items-center justify-center">
      <span className="text-sm font-medium text-gray-700">
        {getInitial(currentUser?.name)}
      </span>
    </div>
  );
}

export default UserAvatar; 