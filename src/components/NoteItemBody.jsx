import React from 'react';
import DeleteButton from './DeleteButton';
import ArchivedButton from './ArchivedButton';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function NoteItemBody({
  title,
  createdAt,
  body,
  id,
  onDelete,
  onArchived,
  archived,
}) {
  return (
    <>
      <br />
      <h3 className="note-item__title">
        <Link className="link" to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__date">{createdAt}</p>
      <p className="note-item__body">{body}</p>
      <br />
      <div className="note-item__button">
        <ArchivedButton id={id} onArchived={onArchived} isArchived={archived} />
        <DeleteButton id={id} onDelete={onDelete} />
      </div>
    </>
  );
}

NoteItemBody.propTypes = {
  title: PropTypes.string,
  createdAt: PropTypes.string,
  body: PropTypes.string,
  id: PropTypes.string,
  onDelete: PropTypes.func,
  onArchived: PropTypes.func,
  archived: PropTypes.bool,
};

export default NoteItemBody;
