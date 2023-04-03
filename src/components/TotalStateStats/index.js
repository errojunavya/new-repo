import {Link} from 'react-router-dom'
import './index.css'

const TotalStateStats = props => {
  const {stateDetails} = props
  const {
    stateName,
    confirmed,
    recovered,
    deceased,
    other,
    population,
    stateCode,
  } = stateDetails
  const active = confirmed - recovered - deceased - other

  return (
    <>
      <li className="list-all-cases ">
        <li className="states-container-home">
          <Link to={`/state/${stateCode}`} className="link-home">
            <p className="states-names-home">{stateName}</p>
          </Link>
        </li>
        <div className="home-columns">
          <p className="confirmed-home">{confirmed}</p>
        </div>
        <div className="home-columns">
          <p className="active-home">{active}</p>
        </div>
        <div className="home-columns">
          <p className="recovered-home">{recovered}</p>
        </div>
        <div className="home-columns">
          <p className="deceased-home">{deceased}</p>
        </div>
        <div className="home-columns">
          <p className="population-home">{population}</p>
        </div>
      </li>
    </>
  )
}

export default TotalStateStats
