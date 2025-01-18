import { useTranslation } from 'react-i18next';

function EditNameModal({ onClose }) {
  const { t } = useTranslation();
  
  return (
    <div className="modal">
      <h2>{t('setting.modal.editName.title')}</h2>
      <input 
        type="text" 
        placeholder={t('setting.modal.editName.placeholder')}
      />
      <div className="buttons">
        <button onClick={onClose}>
          {t('setting.modal.editName.cancel')}
        </button>
        <button>
          {t('setting.modal.editName.save')}
        </button>
      </div>
    </div>
  );
}

export default EditNameModal;
