import {Component} from 'react'

import Cookies from 'js-cookie'

import NavBar from '../NavBar'

import './index.css'

export default class Home extends Component {
  logoutTriggered = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  render() {
    return (
      <div className="home-container">
        <NavBar logoutTriggered={this.logoutTriggered} />
        <div className="home-card">
          <h1 className="home-heading-text">
            Your Flexibility, Our Excellence
          </h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="home-image-style"
          />
        </div>
      </div>
    )
  }
}
