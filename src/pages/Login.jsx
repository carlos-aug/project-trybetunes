import React from 'react';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputName: '',
      enableButton: true,
      loading: false,
    };
  }

  handleTextInputChange = ({ target }) => {
    const userName = target.value;
    const minCharactersInputName = 3;
    this.setState({
      inputName: userName,
    });
    if (userName.length >= minCharactersInputName) {
      this.setState({ enableButton: false });
    } else {
      this.setState({ enableButton: true });
    }
  }

  getUser = async () => {
    const { inputName } = this.state;
    const { history } = this.props;
    console.log(history);
    this.setState({ loading: true });
    await createUser({ name: inputName });
    history.push('/search');
  }

  render() {
    const { inputName, enableButton, loading } = this.state;
    return (
      <div data-testid="page-login">
        {loading && <Loading />}
        <label htmlFor="input-login">
          Login
          <input
            name="login"
            id="input-login"
            type="text"
            data-testid="login-name-input"
            onChange={ this.handleTextInputChange }
            value={ inputName }
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ enableButton }
          onClick={ this.getUser }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
