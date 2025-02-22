import PropTypes from 'prop-types';
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { LocaleConsumer } from '../contexts/LocaleContext';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      titleMaxLength: 50,
      isLoading: false,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitChangeEventHandler =
      this.onSubmitChangeEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState({ title: event.target.value });
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.value });
  }

  async onSubmitChangeEventHandler(event) {
    event.preventDefault();
    const { title, body } = this.state;

    if (!title.trim() || !body.trim()) {
      console.error('Title and body cannot be empty');
      return;
    }

    this.setState({ isLoading: true });

    try {
      await this.props.addNote({ title, body });
      this.setState({ title: '', body: '' });
    } catch (error) {
      console.error('Failed to add note:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <form className="note-input" onSubmit={this.onSubmitChangeEventHandler}>
        <LocaleConsumer>
          {({ locale }) => (
            <>
              <p className="note-input__title__char-limit reveal">
                {locale === 'en' ? 'Limit Character ' : 'Batas Input judul '}
                {this.state.titleMaxLength - this.state.title.length}
              </p>
              <input
                className="reveal"
                type="text"
                placeholder={locale === 'en' ? 'Title' : 'Judul'}
                value={this.state.title}
                onChange={this.onTitleChangeEventHandler}
                maxLength={this.state.titleMaxLength}
                disabled={this.state.isLoading}
              />
              <textarea
                className="reveal"
                type="text"
                placeholder={locale === 'en' ? 'Content' : 'Catatan'}
                value={this.state.body}
                onChange={this.onBodyChangeEventHandler}
                disabled={this.state.isLoading}
              />
              <button
                type="submit"
                className="note-input reveal"
                disabled={this.state.isLoading}
              >
                {this.state.isLoading ? (
                  <span>
                    {locale === 'en' ? 'Adding...' : 'Menambahkan...'}
                  </span>
                ) : (
                  <>
                    <FaPlusCircle />
                    <span>
                      {locale === 'en' ? ' Add Note' : ' Tambah Catatan'}
                    </span>
                  </>
                )}
              </button>
            </>
          )}
        </LocaleConsumer>
      </form>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
