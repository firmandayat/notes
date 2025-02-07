import PropTypes from 'prop-types';
import React from 'react';
import { FaArchive } from 'react-icons/fa';
import { LocaleConsumer } from '../contexts/LocaleContext';

function ArchivedButton({ id, onArchived, isArchived }) {
  return (
    <button
      className="note-item__archive-button"
      onClick={() => onArchived(id)}
    >
      <FaArchive />
      <LocaleConsumer>
        {({ locale }) => (
          <span>
            {isArchived
              ? locale === 'en'
                ? ' Unarchive'
                : ' Buka Arsip'
              : locale === 'en'
                ? ' Archive '
                : ' Arsip'}
          </span>
        )}
      </LocaleConsumer>
    </button>
  );
}

ArchivedButton.propTypes = {
  id: PropTypes.string,
  onArchived: PropTypes.func,
  isArchived: PropTypes.bool
};

export default ArchivedButton;
