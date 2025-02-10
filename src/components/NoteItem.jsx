import React, { useState, useEffect } from 'react';
import NoteItemBody from './NoteItemBody';
import { showFormattedDate } from '../utils/index';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';


function NoteItem({
  title,
  createdAt,
  body,
  id,
  onDelete,
  onArchived,
  archived,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <h2 className="load"><FaSpinner /> Loading...</h2>;
  }

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
  archived: PropTypes.bool,
};

export default NoteItem;
