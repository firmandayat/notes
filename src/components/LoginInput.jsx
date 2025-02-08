import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { FaSpinner } from 'react-icons/fa';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    await login({ email, password });
    setLoading(false);
  };

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <form onSubmit={onSubmitHandler} className="login-input">
          <input
            id="email"
            name="email"
            type="email"
            placeholder={locale === 'en' ? 'Email' : 'Surel'}
            value={email}
            onChange={onEmailChange}
            autoComplete="current-email"
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder={locale === 'en' ? 'Password' : 'Sandi'}
            value={password}
            onChange={onPasswordChange}
            autoComplete="current-password"
          />
          <button className="login" disabled={loading}>
            {loading ? (
              <FaSpinner className="spinner" />
            ) : locale === 'en' ? (
              'Login'
            ) : (
              'Masuk'
            )}
          </button>
        </form>
      )}
    </LocaleConsumer>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
