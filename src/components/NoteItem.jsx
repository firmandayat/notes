import React from 'react';
import NoteItemBody from './NoteItemBody';
import { showFormattedDate } from '../utils/index';
import PropTypes from 'prop-types';

function NoteItem({
  title,
  createdAt,
  body,
  id,
  onDelete,
  onArchived,
  archived,
}) {
  return (
    <div className="note-item">
      <NoteItemBody
        title={title}
        createdAt={showFormattedDate(createdAt)}
        body={body}
        id={id}
        onDelete={onDelete}
        onArchived={onArchived}
        archived={archived}
      />
    </div>
  );
}

NoteItem.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.string,
  onDelete: PropTypes.func,
  onArchived: PropTypes.func,
  archived: PropTypes.bool
};

export default NoteItem;
