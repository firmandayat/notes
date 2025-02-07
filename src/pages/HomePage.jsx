import React from 'react';
import NoteList from '../components/NoteList';
import { getActiveNotes, addNote, deleteNote } from '../utils/network-data';
import {
  FaSearch,
  FaPlusCircle,
  FaRegFileAlt,
} from 'react-icons/fa';
import Footer from '../components/Footer';
import { Link, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LocaleConsumer } from '../contexts/LocaleContext';

function SearchPageWrapper({ logout, name }) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <NoteApp
      searchParams={searchParams}
      setSearchParams={setSearchParams}
      logout={logout}
      name={name}
    />
  );
}

class NoteApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      searchNote: props.searchParams.get('title') || '',
    };
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: data,
      };
    });

    if (typeof window !== 'undefined' && window.ScrollReveal) {
      window.ScrollReveal().reveal('.reveal', {
        duration: 1000,
        distance: '50px',
        origin: 'bottom',
        reset: true,
      });
      window.ScrollReveal().reveal('.reveal1', {
        duration: 2000,
        distance: '100px',
        origin: 'bottom',
        reset: true,
      });
    }
  }

  onDeleteHandler = async (id) => {
    try {
      await deleteNote(id);
      this.setState((prevState) => ({
        notes: prevState.notes.filter((note) => note.id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  onAddNoteHandler = async ({ title, body }) => {
    try {
      const { data } = await addNote({ title, body });
      this.setState((prevState) => ({ notes: [data, ...prevState.notes] }));
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  onArchiveHandler = (id) => {
    this.setState((prevState) => ({
      notes: prevState.notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      ),
    }));
  };

  onSearchHandler = (event) => {
    const searchNote = event.target.value;
    this.setState({ searchNote });
    this.props.setSearchParams({ title: searchNote });
  };

  render() {
    const { notes, searchNote } = this.state;

    const filteredNotes = (notes || []).filter((note) =>
      note.title.toLowerCase().includes(searchNote.toLowerCase())
    );
    const activeNotes = filteredNotes.filter((note) => !note.archived);
    const archivedNotes = filteredNotes.filter((note) => note.archived);

    return (
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

        <div className="note-app__search-wrapper">
          <FaSearch />
          <LocaleConsumer>
            {({ locale }) => (
              <input
                className="note-app__search"
                type="text"
                placeholder={locale === 'en' ? 'Search notes...' : 'Cari Catatan...'}
                value={searchNote}
                onChange={this.onSearchHandler}
              />
            )}
          </LocaleConsumer>
        </div>

        <button>
          <Link className="add" to="/notes/new">
            <FaPlusCircle />
            <LocaleConsumer>{({ locale }) => (
              <span> {locale === 'en' ? 'Note' : 'Catatan'}</span>
            )}
            </LocaleConsumer>
          </Link>
        </button>

        <section className="wrap">
          <LocaleConsumer>
            {({ locale }) => (
              <h3 className="note-app__title-item reveal">
                {locale === 'en' ? 'Actived Notes' : 'Catatan Aktif'}
              </h3>
            )}
          </LocaleConsumer>

          <NoteList
            notes={activeNotes}
            onDelete={this.onDeleteHandler}
            onArchived={this.onArchiveHandler}
          />

          <br />
          <br />
          <LocaleConsumer>{({ locale }) => (
            <h3 className="note-app__title-item-archived reveal">
              {locale === 'en' ? 'Archived Notes' : 'Arsip Catatan'}
            </h3>
          )}
          </LocaleConsumer>
          <NoteList
            notes={archivedNotes}
            onDelete={this.onDeleteHandler}
            onArchived={this.onArchiveHandler}
          />
        </section>

        <Footer />
      </div>
    );
  }
}

NoteApp.propTypes = {
  searchParams: PropTypes.shape({
    get: PropTypes.func.isRequired,
  }).isRequired,
  setSearchParams: PropTypes.func.isRequired,
  logout: PropTypes.func,
  name: PropTypes.string,
};

SearchPageWrapper.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
};

export default SearchPageWrapper;
