import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaTrash, FaSpinner } from 'react-icons/fa';
import { LocaleConsumer } from '../contexts/LocaleContext';

function DeleteButton({ id, onDelete }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (locale) => {
    const confirmationMessage =
      locale === 'en'
        ? 'Are you sure you want to delete this note?'
        : 'Apakah Anda yakin ingin menghapus catatan ini?';

    const confirmation = window.confirm(confirmationMessage);
    if (confirmation) {
      setLoading(true);
      await onDelete(id);
      setLoading(false);
    }
  };

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <button
          className="note-item__delete-button"
          onClick={() => handleDelete(locale)}
          disabled={loading}
        >
          {loading ? <FaSpinner className="loading-icon" /> : <FaTrash />}
          <span>{locale === 'en' ? ' Delete' : ' Hapus'}</span>
        </button>
      )}
    </LocaleConsumer>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteButton;
