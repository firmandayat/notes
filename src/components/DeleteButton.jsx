import PropTypes from 'prop-types';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { LocaleConsumer } from '../contexts/LocaleContext';

function DeleteButton({ id, onDelete }) {
  const handleDelete = (locale) => {
    const confirmationMessage =
      locale === 'en'
        ? 'Are you sure you want to delete this note?'
        : 'Apakah Anda yakin ingin menghapus catatan ini?';

    const confirmation = window.confirm(confirmationMessage);
    if (confirmation) {
      onDelete(id);
    }
  };

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <button
          className="note-item__delete-button"
          onClick={() => handleDelete(locale)}
        >
          <FaTrash />
          <span>{locale === 'en' ? ' Delete' : ' Hapus'}</span>
        </button>
      )}
    </LocaleConsumer>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string,
  onDelete: PropTypes.func,
};

export default DeleteButton;
