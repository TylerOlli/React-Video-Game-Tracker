import React, { Component } from "react";
import PropTypes from "prop-types";
import User from "./User";

class UserList extends Component {
  state = {
    showGamesPlayed: true,
  };

  toggleGamesPlayedPanel = () => {
    this.setState((oldState) => ({
      showGamesPlayed: !oldState.showGamesPlayed,
    }));
  };

  render() {
    const { showGamesPlayed } = this.state;
    const { users } = this.props;

    const gamesPlayedButton = (
      <div className='button-container'>
        <button className='smallButton' onClick={this.toggleGamesPlayedPanel}>
          {showGamesPlayed ? "Hide " : "Show "} # of Games Played
        </button>
      </div>
    );

    return (
      <div className='users-container'>
        {users && users.length > 0 ? <h1>Users</h1> : ""}
        {users && users.length > 0 ? gamesPlayedButton : ""}
        <ol className='user-list'>
          {users.map((user) => (
            <User
              key={user.username}
              user={user}
              showGamesPlayed={showGamesPlayed}
              gamesPlayed={user.gamesPlayed}
            />
          ))}
        </ol>
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};

export default UserList;
