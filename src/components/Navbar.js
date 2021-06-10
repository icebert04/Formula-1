import React, { Component } from 'react';
import Identicon from 'identicon.js';
import photo from '../photo.png'

class Navbar extends Component {

  render() {
    return (
      <nav className=" navbar-color fixed-top flex-md-nowrap p-0 shadow">
      <div className="px-2">
        <a href="/">
          <img src={photo} width="100" height="auto" className="d-inline-block align-top" alt="Formula one logo" />
        </a>
      </div>
      <h2><b>Formula-1 Pledge to The Drivers</b></h2>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            { this.props.account
              ? <img
                className='ml-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;