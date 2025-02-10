import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AddNote from '../pages/AddNote';
import DetailNote from '../pages/DetailNote';
import NotFoundPage from '../pages/NotFound';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import { getUserLogged, putAccessToken } from '../utils/network-data';
import { FaSignOutAlt } from 'react-icons/fa';
import { ThemeProvider } from '../contexts/ThemeContext';
import ToggleTheme from '../components/ToggleTheme';
import { LocaleProvider } from '../contexts/LocaleContext';
import ToggleLanguage from '../components/ToggleLanguage';
import { LocaleConsumer } from '../contexts/LocaleContext';

class NoteApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: false,
      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme,
          };
        });
      },
      localeContext: {
        locale: localStorage.getItem('locale') || 'en',
        toggleLocale: () => {
          this.setState((prevState) => {
            const newLanguage =
              prevState.localeContext.locale === 'id' ? 'en' : 'id';
            localStorage.setItem('locale', newLanguage);
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: newLanguage,
              },
            };
          });
        },
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.toggleTheme = this.toggleTheme.bind(this);
    this.toggleLocale = this.toggleLocale.bind(this);
  }

  async componentDidMount() {
    document.documentElement.setAttribute('data-theme', this.state.theme);
    document.documentElement.setAttribute('locale', this.state.locale);
    const { data } = await getUserLogged();
    this.setState({ authedUser: data });
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    this.setState({ authedUser: data });
  }

  onLogout() {
    this.setState({ authedUser: null });
    putAccessToken('');
  }

  toggleTheme() {
    this.setState((prevState) => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  }

  toggleLocale() {
    this.setState((prevState) => ({
      locale: prevState.locale === 'id' ? 'en' : 'id',
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      localStorage.setItem('theme', this.state.theme);
      document.documentElement.setAttribute('data-theme', this.state.theme);
    } else if (prevState.locale !== this.state.locale) {
      localStorage.setItem('locale', this.state.locale);
      document.documentElement.setAttribute('locale', this.state.locale);
    }
  }

  render() {
    if (this.state.initializing) {
      return null;
    }

    if (this.state.authedUser === null) {
      return (
        <LocaleProvider value={this.state.localeContext}>
          <ThemeProvider
            value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
          >
            <div className="contact-app">
              <header className="contact-app__header">
                <center>
                  <LocaleConsumer>
                    {({ locale }) => (
                      <h1 className="app">
                        {locale === 'en' ? 'Notes App' : 'Aplikasi Catatan'}
                      </h1>
                    )}
                  </LocaleConsumer>
                </center>
              </header>
              <main>
                <Routes>
                  <Route
                    path="/*"
                    element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                  />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>
            </div>
            <div className="note-header">
              <ToggleTheme />
              <ToggleLanguage />
            </div>
          </ThemeProvider>
        </LocaleProvider>
      );
    }

    const isAddNotePage = window.location.pathname === '/notes/new';

    return (
      <LocaleProvider value={this.state.localeContext}>
        <ThemeProvider
          value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}
        >
          <div className="note-app">
            {!isAddNotePage && (
              <button className="out" onClick={this.onLogout}>
                <FaSignOutAlt />
                <span> {this.state.authedUser.name}</span>
              </button>
            )}
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes/new" element={<AddNote />} />
                <Route path="/notes/:id" element={<DetailNote />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <ToggleTheme />
            <ToggleLanguage />
          </div>
        </ThemeProvider>
      </LocaleProvider>
    );
  }
}

export default NoteApp;
