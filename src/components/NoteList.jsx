import React from 'react';
import NoteItem from './NoteItem';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';

function NoteList({ notes, onDelete, onArchived }) {
  return (
    <div className="notes-list reveal1">
      {notes.length > 0 ? (
        notes.map((note) => (
          <NoteItem
            key={note.id}
            id={note.id}
            onDelete={onDelete}
            onArchived={onArchived}
            {...note}
          />
        ))
      ) : (
        <LocaleConsumer>
          {({ locale }) => (
            <h3 className="notes-list__empty-message reveal">
              {locale === 'en' ? 'Empty notes' : 'Tidak ada catatan'}
            </h3>
          )}
        </LocaleConsumer>
      )}
    </div>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  onArchived: PropTypes.func,
};

export default NoteList;
