import PropTypes from 'prop-types';
import React from 'react';
import { FaArchive } from 'react-icons/fa';

function ArchivedButton({ id, onArchived, isArchived }) {
  return (
    <button
      className="note-item__archive-button"
      onClick={() => onArchived(id)}
    >
      <FaArchive />
      <span> {isArchived ? 'Unarchive' : 'Archive'}</span>
    </button>
  );
}

ArchivedButton.propTypes = {
  id: PropTypes.string,
  onArchived: PropTypes.func,
  isArchived: PropTypes.bool
};

export default ArchivedButton;
