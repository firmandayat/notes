import React from 'react';
import { FaRegFileAlt, FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function NotFoundPage() {
  return (
    <div className="add-note">
      <h1 className="note-app__header">
        <FaRegFileAlt />
        <Link className="home" to="/">
          My Notes
        </Link>
      </h1>
      <div className="wrap-not-found">
        <div>
          <i className="circle">
            <FaExclamationCircle />
          </i><br></br>
          <h2 className="text">Oops! The page you are looking for does not exist</h2>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
