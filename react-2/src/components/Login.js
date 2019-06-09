import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { register, login } from "../services/loginService";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleEmailInput = e => {
    this.setState({
      username: e.target.value
    });
  };
  handlePasswordInput = e => {
    this.setState({
      password: e.target.value
    });
  };
  handleRegister = e => {
    e.preventDefault();

    try {
      const user = register({
        username: this.state.username,
        password: this.state.password
      });
      if (user) {
        const logged = login({
          username: this.state.username,
          password: this.state.password
        });
        if (logged) {
          this.props.history.push("/");
        }
      }
    } catch (err) {
      alert(err);
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    try {
      const logged = login({
        username: this.state.username,
        password: this.state.password
      });
      if (logged) {
        this.props.history.push(`/`);
      }
    } catch (err) {
      alert(err);
    }
  };

  render = () => (
    <form className="form-signin">
      <div className="text-center mb-4">
        <h1 className="h3 mb-3 font-weight-normal">Login / Register</h1>
      </div>

      <div className="form-label-group">
        <label htmlFor="inputEmail">Username</label>
        <input
          name="username"
          onChange={this.handleEmailInput}
          value={this.state.username}
          className="form-control"
          placeholder="Username"
          required
        />
      </div>

      <div className="form-label-group mt-2">
        <label htmlFor="inputPassword">Password</label>
        <input
          name="password"
          onChange={this.handlePasswordInput}
          value={this.password}
          type="password"
          className="form-control"
          placeholder="Password"
          required
        />
      </div>

      <div className="mt-5">
        <button
          onClick={this.handleSubmit}
          className="login btn btn-lg btn-primary btn-block"
          type="submit"
        >
          Login
        </button>
        <button
          onClick={this.handleRegister}
          className="register btn btn-lg btn-secondary btn-block"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default withRouter(Login);
