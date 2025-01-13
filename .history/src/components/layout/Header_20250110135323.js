import { useState, useRef, useEffect } from 'react';

function Header() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      {/* ... other navbar items ... */}
      
      <div ref={servicesDropdownRef} className="services-dropdown">
        <button onClick={() => setIsServicesOpen(!isServicesOpen)}>
          Services
        </button>
        {isServicesOpen && (
          <div className="dropdown-menu">
            {/* Your services menu items */}
          </div>
        )}
      </div>

      {/* ... other navbar items ... */}
    </div>
  );
}

export default Header; 