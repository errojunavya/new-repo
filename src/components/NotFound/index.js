import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-card-content">
      <img
        src="https://res.cloudinary.com/dnv6kesmt/image/upload/v1636521130/mini-project/notfound_wxbwda.png"
        alt="not-found-pic"
        className="not-found-image"
      />
      <h1 className="heading">PAGE NOT FOUND</h1>
      <p className="description">
        we are sorry, the page you requested could not be found
      </p>
      <Link to="/">
        <button type="button" className="navigate-to-home-route-button">
          Home
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
