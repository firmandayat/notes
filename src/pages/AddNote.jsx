import React from 'react';
import { addNote } from '../utils/network-data';
import NoteInput from '../components/NoteInput';
import { FaRegFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { LocaleConsumer } from '../contexts/LocaleContext';

function AddPage() {
  const navigate = useNavigate();

  async function onAddNoteHandler(note) {
    try {
      const { data } = await addNote(note);
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
          <FaRegFileAlt className="home" />
          <Link className="home" to="/">
            <LocaleConsumer>
              {({ locale }) => {
                return locale === 'en' ? 'My Notes' : 'Catatan Saya';
              }}
            </LocaleConsumer>
          </Link>
        </h1>
        <LocaleConsumer>{({ locale }) => (
          <h3 className="note-app__title">{ locale === 'en' ? 'Add Note' : 'Tambah Catatan'}</h3>
        )}
        </LocaleConsumer>
        <NoteInput addNote={onAddNoteHandler} />
      </div>
      <Footer />
    </div>
  );
}

export default AddPage;
