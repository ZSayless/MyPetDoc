import React from 'react';
import '../../styles/Modal.css';

const EditUserModal = ({ isOpen, onClose, user }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        {/* Nội dung form hiện tại của bạn */}
        <h2>Edit User</h2>
        <form>
          {/* ... các trường input ... */}
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
};

export default EditUserModal; 