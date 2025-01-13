import { useState, useRef, useEffect } from 'react';
import '../styles/LanguageSelector.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="language-selector-container" ref={dropdownRef}>
        <div 
          className="language-selector" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="globe-icon">🌐</span>
          {/* Your existing language selector component */}
        </div>
        {isOpen && (
          <div className="dropdown-content">
            {/* Your dropdown items */}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header; 