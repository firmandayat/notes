import PropTypes from 'prop-types';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { LocaleConsumer } from '../contexts/LocaleContext';

function DeleteButton({ id, onDelete }) {
  return (
    <button className="note-item__delete-button" onClick={() => onDelete(id)}>
      <FaTrash />
      <LocaleConsumer>{({ locale }) => (<span>{locale === 'id' ? ' Delete' : ' Hapus'}</span>)}</LocaleConsumer>
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string,
  onDelete: PropTypes.func
};

export default DeleteButton;
