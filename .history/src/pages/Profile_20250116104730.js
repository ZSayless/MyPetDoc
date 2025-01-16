import { useSelector } from 'react-redux';

function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <h1>{currentUser.name}</h1>
      <p>{currentUser.bio}</p>
      <div className="user-info">
        <p>{currentUser.email}</p>
        <p>{currentUser.phone}</p>
        <p>{currentUser.location}</p>
        <p>Joined {currentUser.joinDate}</p>
      </div>
    </div>
  );
} 