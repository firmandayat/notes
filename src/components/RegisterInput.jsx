import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { LocaleConsumer } from '../contexts/LocaleContext';
import { FaSpinner } from 'react-icons/fa';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await register({ name, email, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocaleConsumer>
      {({ locale }) => (
        <form onSubmit={onSubmitHandler} className="register-input">
          <input
            type="text"
            placeholder={locale === 'en' ? 'Name' : 'Nama'}
            value={name}
            onChange={onNameChange}
          />
          <input
            autoComplete="current-email"
            type="email"
            placeholder={locale === 'en' ? 'Email' : 'Surel'}
            value={email}
            onChange={onEmailChange}
          />
          <input
            type="password"
            placeholder={locale === 'en' ? 'Password' : 'Sandi'}
            autoComplete="current-password"
            value={password}
            onChange={onPasswordChange}
          />
          <button className="regis" disabled={loading}>
            {loading ? (
              <>
                <FaSpinner className="spinner" />{' '}
                {locale === 'en' ? 'Registering...' : 'Mendaftarkan...'}
              </>
            ) : locale === 'en' ? (
              'Register'
            ) : (
              'Daftar'
            )}
          </button>
        </form>
      )}
    </LocaleConsumer>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
