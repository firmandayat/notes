import React from 'react';
import { addNote } from '../utils/network-data';
import NoteInput from '../components/NoteInput';
import { FaRegFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';

function AddPage() {
  const navigate = useNavigate();

  async function onAddNoteHandler(title, body) {
    try {
      const { data } = await addNote({ title, body });
      console.log('Note added successfully:', data);
      navigate('/');
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  }

  return (
    <div className="add-note">
      <div className="note-app">
        <h1 className="note-app__header">
          <FaRegFileAlt />
          <Link className="home" to="/">
            My Notes
          </Link>
        </h1>
        <h3 className="note-app__title">Add Note</h3>
        <NoteInput addNote={onAddNoteHandler} />{' '}
      </div>
      <Footer />
    </div>
  );
}

AddPage.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default AddPage;
