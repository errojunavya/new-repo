import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {
    displaySmNavItems: false,
    activeHomeNav: true,
    activeAboutNav: false,
    activeVaccinationNav: false,
  }

  onClickNavBarIcon = () => {
    this.setState(prevState => ({
      displaySmNavItems: !prevState.displaySmNavItems,
    }))
  }

  onClickCloseNav = () => {
    this.setState(prevState => ({
      displaySmNavItems: !prevState.displaySmNavItems,
    }))
  }

  activeHomeNav = () => {
    this.setState({
      activeHomeNav: true,
      activeAboutNav: false,
      activeVaccinationNav: false,
    })
  }

  activeAboutNav = () => {
    this.setState({
      activeHomeNav: false,
      activeAboutNav: true,
      activeVaccinationNav: false,
    })
  }

  activeVaccinationNav = () => {
    this.setState({
      activeHomeNav: false,
      activeAboutNav: false,
      activeVaccinationNav: true,
    })
  }

  render() {
    const {
      displaySmNavItems,
      activeHomeNav,
      activeAboutNav,
      activeVaccinationNav,
    } = this.state
    const activeHomeClass =
      activeHomeNav === true ? 'active-tab-class-name' : ''
    const activeAboutClass =
      activeAboutNav === true ? 'active-tab-class-name' : ''
    const activeVaccinationClass =
      activeVaccinationNav === true ? 'active-tab-class-name' : ''

    return (
      <div className="header-container">
        <ul className="nav-bar-small-container">
          <Link to="/" className="nav-item-link">
            <li>
              <h1 className="logo-heading">
                COVID19<span className="log-span-india">INDIA</span>
              </h1>
            </li>
          </Link>
          <button
            type="button"
            onClick={this.onClickNavBarIcon}
            className="nav-bar-button"
          >
            <img
              src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521129/mini-project/nav-bar-icon-sm_uee2un.png"
              alt="nav-bar-icon"
              className="nav-bar-icon"
            />
          </button>
        </ul>
        {displaySmNavItems && (
          <div className="nav-small-icons-container">
            <ul className="nav-small-icons-list-container">
              <Link to="/" className="nav-item-link">
                <li
                  className={`nav-item ${activeHomeClass}`}
                  onClick={this.activeHomeNav}
                >
                  Home
                </li>
              </Link>
              <Link to="/about" className="nav-item-link">
                <li
                  onClick={this.activeAboutNav}
                  className={`nav-item ${activeAboutClass}`}
                >
                  About
                </li>
              </Link>
              <Link to="/vaccination" className="nav-item-link">
                <li
                  onClick={this.activeVaccinationNav}
                  className={`nav-item ${activeVaccinationClass}`}
                >
                  Vaccination
                </li>
              </Link>
            </ul>
            <button
              data-testid="close-nav-btn"
              className="close-nav-button"
              type="button"
              onClick={this.onClickCloseNav}
            >
              <img
                src="https://res.cloudinary.com/dnv6kesmt/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1636521128/mini-project/cross-icon_jezz2z.png"
                alt="close nav btn"
                className="close-nav-button"
              />
            </button>
          </div>
        )}
        <ul className="nav-bar-large-container">
          <Link to="/" className="nav-item-link">
            <li>
              <h1 className="logo-heading">
                COVID19<span className="log-span-india">INDIA</span>
              </h1>
            </li>
          </Link>
          <ul className="nav-controls">
            <Link to="/" className="nav-item-link">
              <li
                className={`nav-item ${activeHomeClass}`}
                onClick={this.activeHomeNav}
              >
                Home
              </li>
            </Link>

            <Link to="/about" className="nav-item-link">
              <li
                className={`nav-item ${activeAboutClass}`}
                onClick={this.activeAboutNav}
              >
                About
              </li>
            </Link>

            <Link to="/vaccination" className="nav-item-link">
              <li
                className={`nav-item ${activeVaccinationClass}`}
                onClick={this.activeVaccinationNav}
              >
                Vaccination
              </li>
            </Link>
          </ul>
        </ul>
      </div>
    )
  }
}
export default Header
