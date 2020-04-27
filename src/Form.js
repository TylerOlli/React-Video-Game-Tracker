import React, { Component } from "react";
import PropTypes from "prop-types";

class Form extends Component {
  state = {
    user: {
      firstName: "",
      lastName: "",
      username: "",
      gamesPlayed: "",
    },
    userExists: false,
  };

  contactExists = (currUsername) => {
    const users = this.props.users;
    for (let user of users) {
      if (user.username === currUsername) {
        return true;
      }
    }
    return false;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const userExists = this.contactExists(this.state.user.username);

    if (!userExists) {
      this.props.onAddUser(this.state.user);
    }

    this.setState(() => ({
      userExists,
    }));
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState((currState) => ({
      ...currState,
      user: {
        ...currState.user,
        [name]: value,
      },
    }));
  };

  isDisabled = () => {
    const { firstName, lastName, username } = this.state.user;
    return firstName === "" || lastName === "" || username === "";
  };

  render() {
    const { firstName, lastName, username, gamesPlayed } = this.state.user;

    return (
      <div className='user-container'>
        <h1>New User</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            name='firstName'
            placeholder='Enter First Name'
            value={firstName}
            onChange={this.handleInputChange}
          />
          <input
            type='text'
            name='lastName'
            placeholder='Enter Last Name'
            value={lastName}
            onChange={this.handleInputChange}
          />
          <input
            type='text'
            name='username'
            placeholder='Enter Username'
            value={username}
            onChange={this.handleInputChange}
          />
          <input
            type='number'
            name='gamesPlayed'
            placeholder='# of Games Played'
            value={gamesPlayed}
            onChange={this.handleInputChange}
          />
          <button disabled={this.isDisabled()}>Add User</button>
        </form>
        {this.state.userExists ? (
          <p className='error'>You cannot add a user that already exists.</p>
        ) : (
          ""
        )}
      </div>
    );
  }
}

Form.propTypes = {
  onAddUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default Form;
