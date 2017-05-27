import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

export class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }

  // increment() {
  //   this.setState({
  //     count: this.state.count + 1
  //   });
  // }
  //
  //   decrement() {
  //     this.setState({
  //       count: this.state.count - 1
  //     });
  //   }

  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({error: 'Password must be more than 8 characters long.'});
    }

    this.props.createUser({
      email,
      password
    }, (err) => {
      if (err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
    });
  }

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>

          {this.state.error
            ? <p>{this.state.error}</p>
            : undefined}

          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button">CreateAccount</button>
          </form>

        </div>
      </div>
    );
  }
}
{/* <p>{this.state.count}</p>
<button onClick={this.increment.bind(this)}>+1</button>
<button onClick={this.decrement.bind(this)}>-1</button> */
}

Signup.propTypes = {
  createUser: React.PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    createUser: Accounts.createUser
  };
}, Signup);
