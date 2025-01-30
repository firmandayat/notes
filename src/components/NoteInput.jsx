import PropTypes from 'prop-types';
import React from 'react';
import { FaPlusCircle } from 'react-icons/fa';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      titleMaxLength: 50,
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

    try {
      await this.props.addNote({ title, body });
      this.setState({ title: '', body: '' });
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  }

  render() {
    return (
      <form className="note-input" onSubmit={this.onSubmitChangeEventHandler}>
        <p className="note-input__title__char-limit reveal">
          Limit Character: {this.state.titleMaxLength - this.state.title.length}
        </p>
        <input
          className="reveal"
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.onTitleChangeEventHandler}
          maxLength={this.state.titleMaxLength}
        />
        <input
          className="reveal"
          type="text"
          placeholder="Content"
          value={this.state.body}
          onChange={this.onBodyChangeEventHandler}
        />
        <button type="submit" className="note-input reveal">
          <FaPlusCircle />
          <span> Add New Note</span>
        </button>
      </form>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
