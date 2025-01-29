import React from 'react';
import { useParams } from 'react-router-dom';
import { getNote } from '../utils/local-data';
import { FaRegFileAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function NoteDetail() {
  const { id } = useParams(); // Mengambil parameter id dari URL
  const note = getNote(id); // Mengambil detail catatan berdasarkan id
  const { title, body, createdAt } = note; //destructuring

  return (
    <>
      <div className="add-note">
        <h1 className="note-app__header">
          <FaRegFileAlt />
          <Link className="home" to="/">
            My Notes
          </Link>
        </h1>
        <div className="wrap-detail">
          <h3 className="note-item__titlebar">Detail Note</h3>
          <h3 className="note-item__title-detail">{title}</h3>
          <p className="note-item__date">
            {new Date(createdAt).toLocaleDateString()}
          </p>
          <p className="note-item__body">{body}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NoteDetail;
