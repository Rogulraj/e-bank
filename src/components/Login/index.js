import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

export default class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  formCard = async event => {
    event.preventDefault()
    const {username, password} = this.state
    console.log(username, password)

    const url = 'https://apis.ccbp.in/ebank/login'

    const userDetails = {user_id: username, pin: password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      this.setState({
        errorMsg: '',
      })

      const fetchData = await response.json()

      const jwtToken = fetchData.jwt_token

      Cookies.set('jwt_token', jwtToken, {expires: 1})
      const {history} = this.props
      history.replace('/')
    } else {
      const fetchData = await response.json()
      this.setState({
        errorMsg: fetchData.error_msg,
      })
    }
  }

  onChangeUserName = event => {
    const {value} = event.target
    this.setState({
      username: value,
    })
  }

  onChangePassword = event => {
    const {value} = event.target
    this.setState({
      password: value,
    })
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    console.log(errorMsg)
    return (
      <div className="login-main-container">
        <div className="login-content-card">
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="login-image"
            />
          </div>
          <form onSubmit={this.formCard} className="login-form">
            <h1>Welcome Back!</h1>
            <label htmlFor="user-name" className="user-name-label-text">
              User Id
            </label>
            <input
              type="text"
              id="user-name"
              placeholder="Enter User ID"
              className="user-name-field"
              onChange={this.onChangeUserName}
              value={username}
            />
            <br />
            <label htmlFor="PIN" className="pin-label-text">
              PIN
            </label>
            <input
              type="password"
              id="PIN"
              placeholder="Enter PIN"
              className="pin-field"
              onChange={this.onChangePassword}
              value={password}
            />
            <br />
            <button type="submit" className="submit-btn">
              Login
            </button>
            {errorMsg === '' ? '' : <p className="login-error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
