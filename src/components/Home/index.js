import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'

import Header from '../Header'
import Footer from '../Footer'

import TotalStateStats from '../TotalStateStats'

import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    isLoading: false,
    searchInput: '',
    totalActiveCases: 0,
    totalConfirmedCases: 0,
    totalRecoveredCases: 0,
    totalDeceasedCases: 0,
    statesListData: [],
  }

  componentDidMount() {
    this.getAllData()
  }

  getAllData = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      let nationalWideConfirmedCases = 0
      let nationalWideRecoveredCases = 0
      let nationalWideDeceasedCases = 0
      let nationalWideActiveCases = 0

      statesList.forEach(eachState => {
        if (data[eachState.state_code]) {
          const {total} = data[eachState.state_code]

          nationalWideConfirmedCases += total.confirmed ? total.confirmed : 0
          nationalWideRecoveredCases += total.recovered ? total.recovered : 0
          nationalWideDeceasedCases += total.deceased ? total.deceased : 0
        }
      })
      nationalWideActiveCases +=
        nationalWideConfirmedCases -
        (nationalWideRecoveredCases + nationalWideDeceasedCases)

      const states = statesList.map(eachState => ({
        stateName: eachState.state_name,
        stateCode: eachState.state_code,
        confirmed: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(each => data[each].total.confirmed),
        recovered: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(each => data[each].total.recovered),
        deceased: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(each => data[each].total.deceased),
        other: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(each => data[each].total.other),
        population: Object.keys(data)
          .filter(state => state === eachState.state_code)
          .map(each => data[each].meta.population),
      }))
      this.setState({
        isLoading: false,
        statesListData: states,
        totalActiveCases: nationalWideActiveCases,
        totalConfirmedCases: nationalWideConfirmedCases,
        totalRecoveredCases: nationalWideRecoveredCases,
        totalDeceasedCases: nationalWideDeceasedCases,
      })
    }
  }

  renderNationalWideStats = () => {
    const {
      totalActiveCases,
      totalConfirmedCases,
      totalRecoveredCases,
      totalDeceasedCases,
    } = this.state

    return (
      <div>
        <ul className="country-wide-stats">
          <li
            className="country-wide-list-item"
            data-testid="countryWideConfirmedCases"
          >
            <p className="stats-title red">Confirmed</p>
            <img
              className="stats-icon"
              src="https://res.cloudinary.com/dvcurljig/image/upload/v1639236573/Covid19DashBoard/confirmed_symbol.svg"
              alt="country wide confirmed cases pic"
            />
            <p className="stats-number">{totalConfirmedCases}</p>
          </li>
          <li
            className="country-wide-list-item"
            data-testid="countryWideActiveCases"
          >
            <p className="stats-title blue">Active</p>
            <img
              className="stats-icon"
              src="https://res.cloudinary.com/dvcurljig/image/upload/v1639237314/Covid19DashBoard/protection_1_x3f55t.svg"
              alt="country wide active cases pic"
            />
            <p className="stats-number blue">{totalActiveCases}</p>
          </li>
          <li
            className="country-wide-list-item"
            data-testid="countryWideRecoveredCases"
          >
            <p className="stats-title green">Recovered</p>
            <img
              className="stats-icon"
              src="https://res.cloudinary.com/dvcurljig/image/upload/v1639237381/Covid19DashBoard/recovered_1_ekfpqy.svg"
              alt="country wide recovered cases pic"
            />
            <p className="stats-number green">{totalRecoveredCases}</p>
          </li>
          <li
            className="country-wide-list-item"
            data-testid="countryWideDeceasedCases"
          >
            <p className="stats-title gray">Recovered</p>
            <img
              className="stats-icon"
              src="https://res.cloudinary.com/dvcurljig/image/upload/v1639237349/Covid19DashBoard/breathing_1_s7illv.svg"
              alt="country wide deceased cases pic"
            />
            <p className="stats-number gray">{totalDeceasedCases}</p>
          </li>
        </ul>
      </div>
    )
  }

  ascendingOrderOfStates = () => {
    const {statesListData} = this.state

    const sortedList = statesListData.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x > y ? 1 : -1
    })
    this.setState({statesListData: sortedList})
  }

  descendingOrderOfStates = () => {
    const {statesListData} = this.state

    const sortedList = statesListData.sort((a, b) => {
      const x = a.stateName.toUpperCase()
      const y = b.stateName.toUpperCase()
      return x < y ? 1 : -1
    })
    this.setState({statesListData: sortedList})
  }

  renderAllStatesList = () => {
    const {statesListData} = this.state

    return (
      <div className="all-states-table" data-testid="stateWiseCovidDataTable">
        <ul className="state-table-header-container">
          <li className="state-name-and-sorting-container">
            <p className="state-table-header-title">States/UT</p>
            <button
              className="order"
              data-testid="ascendingSort"
              type="button"
              onClick={this.ascendingOrderOfStates}
            >
              <FcGenericSortingAsc className="order-icon" />
            </button>
            <button
              className="order"
              data-testid="descendingSort"
              type="button"
              onClick={this.descendingOrderOfStates}
            >
              <FcGenericSortingDesc className="order-icon" />
            </button>
          </li>
          <li className="other-tables-bar">
            <p className="state-table-header-title">Confirmed</p>
          </li>
          <li className="other-tables-bar">
            <p className="state-table-header-title">Active</p>
          </li>
          <li className="other-tables-bar">
            <p className="state-table-header-title">Recovered</p>
          </li>
          <li className="other-tables-bar">
            <p className="state-table-header-title">Deceased</p>
          </li>
          <li className="other-tables-bar">
            <p className="state-table-header-title">Population</p>
          </li>
          <div className="state-wise-data-container">
            <ul className="states-data-tables">
              {statesListData.map(each => (
                <TotalStateStats key={each.stateCode} stateDetails={each} />
              ))}
            </ul>
          </div>
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="homeRouteLoader" className="loader">
      <Loader type="TailSpin" height={50} width={50} color="#0b69ff" />
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getFilterSearchResults = () => {
    const {searchItem} = this.state
    const searchResult = statesList.filter(data =>
      data.state_name.toLowerCase().includes(searchItem.toLowerCase()),
    )
    return searchResult
  }

  render() {
    const {isLoading, searchInput} = this.state
    const filterSearchResult = this.getFilterSearchResults()

    return (
      <div className="bg-container">
        <Header />
        <div className="home-container">
          <div className="search-container">
            <BsSearch className="search-icon" />
            <input
              type="search"
              value={searchInput}
              placeholder="Enter the State"
              className="search-bar"
              onChange={this.onChangeSearchInput}
            />
          </div>
          <div>
            {searchInput !== '' ? (
              <ul
                className="search-result-container"
                data-testid="searchResultsUnorderedList"
              >
                {filterSearchResult.map(option => (
                  <Link
                    to={`/search/${option.state_code}`}
                    className="link"
                    key={option.state_name}
                  >
                    <div className="option-item">
                      <div>
                        <h1 className="state-name">{option.state_name}</h1>
                      </div>
                      <div className="option-code-container">
                        <h1 className="state-code">{option.state_code}</h1>
                        <img
                          className="option-icon"
                          src="https://res.cloudinary.com/dffpcgabr/image/upload/v1628515237/icons/wpbmd0sz1wiebsfjtkb9.png"
                          alt="icon"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </ul>
            ) : null}
          </div>
          {isLoading ? (
            this.renderLoadingView()
          ) : (
            <div>
              <div className="country-stats">
                {this.renderNationalWideStats()}
              </div>
              <div className="state-table-list-container">
                {this.renderAllStatesList()}
              </div>
            </div>
          )}
          <Footer />
        </div>
      </div>
    )
  }
}
export default Home
