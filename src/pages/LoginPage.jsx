import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { login } from '../utils/network-data';
import { LocaleConsumer } from '../contexts/LocaleContext';
import Footer from '../components/Footer';

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <section className="login-page">
      <LoginInput login={onLogin} />
      <center>
        <LocaleConsumer>
          {({ locale }) => (
            <p>
              {locale === 'en' ? 'Do not have an account?' : 'Belum punya akun?'}
              <Link className='link' to="/register">
                {locale === 'en' ? ' Register' : ' Daftar'}
              </Link>
            </p>
          )}
        </LocaleConsumer>
      </center>
      <Footer/>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
