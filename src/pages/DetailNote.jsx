import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNote } from '../utils/network-data';
import { FaRegFileAlt, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NotFoundPage from './NotFound';
import { LocaleConsumer } from '../contexts/LocaleContext';

function NoteDetail() {
  const { id } = useParams(); // Mengambil parameter id dari URL
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNote() {
      try {
        const { data } = await getNote(id);
        setNote(data);
      } catch (err) {
        setError(err.message || 'Note not found or an error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

  if (loading) {
    return (
      <center>
        <h2 className="loading">
          <FaSpinner />  Loading note...
        </h2>
      </center>
    );
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!note) {
    return (
      <p className="error-message">
        <NotFoundPage />
      </p>
    );
  }

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <>
          <div className="add-note">
            <h1 className="note-app__header">
              <FaRegFileAlt className="home" />
              <Link className="home" to="/">
                {locale === 'en' ? 'My Notes' : 'Catatan Saya'}
              </Link>
            </h1>
            <div className="wrap-detail">
              <h3 className="note-item__titlebar">
                {locale === 'en' ? 'Detail Note' : 'Rincian Catatan'}
              </h3>
              <h3 className="note-item__title-detail">{note.title}</h3>
              <p className="note-item__date">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>
              <p className="note-item__body">{note.body}</p>
            </div>
          </div>
          <Footer />
        </>
      )}
    </LocaleConsumer>
  );
}

export default NoteDetail;
