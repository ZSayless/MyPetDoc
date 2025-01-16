import React from 'react';
import { useSelector } from 'react-redux';
import UserAvatar from './UserAvatar';

function NavBar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav>
      {/* ... other nav items ... */}
      <div className="flex items-center gap-2">
        <UserAvatar />
        <span className="hidden md:block">{currentUser?.name}</span>
      </div>
    </nav>
  );
}

export default NavBar; 