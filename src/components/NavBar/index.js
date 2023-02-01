import './index.css'

const NavBar = props => {
  const {logoutTriggered} = props

  return (
    <nav className="nav-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="nav-image-style"
        />
      </div>
      <div>
        <button type="button" onClick={logoutTriggered} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default NavBar
