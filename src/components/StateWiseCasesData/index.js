import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CategoryWiseStateData from '../CategoryWiseStateData'
import ShowEachDistrictData from '../ShowEachDistrictData'
import ChartsData from '../ChartsData'
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

const monthNamesList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

class StateWiseCasesData extends Component {
  state = {
    isLoading: true,
    nameOfTheState: '',
    totalTestedData: 0,
    eachStateTotalData: [],
    date: '',
    activeTab: true,
    category: 'Confirmed',
    id: '',
    stateCode: '',
    dataArray: [],
  }

  componentDidMount() {
    this.getEachStateData()
  }

  getEachStateData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params

    const stateUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(stateUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const stateTestedData = data[stateCode].total.tested
      const stateObject = statesList.filter(
        each => each.state_code === stateCode,
      )
      const eachStateData = data[stateCode].total
      const stateName = stateObject[0].state_name

      const dateData = new Date(data[stateCode].meta.last_updated)

      const day = dateData.getDay()
      const month = dateData.getMonth() - 1
      const monthInStringFormat = monthNamesList[month]
      const year = dateData.getFullYear()

      const dateInStringFormat = `${monthInStringFormat} ${day} ${year}`

      this.setState({
        eachStateTotalData: eachStateData,
        isLoading: false,
        nameOfTheState: stateName,
        totalTestedData: stateTestedData,
        id: stateCode,
        dataArray: data,
        date: dateInStringFormat,
        stateCode,
      })
    } else {
      console.log('State Data Not Available')
    }
  }

  onGetCategory = categoryVal => {
    this.setState({category: categoryVal, activeTab: false})
  }

  getCategoryWiseData = () => {
    const {id, category, dataArray} = this.state
    const districtOutput = dataArray[id].districts
    const distNamesList = Object.keys(districtOutput)
    const categoryLower = category.toLowerCase()

    const catData = distNamesList.map(element => ({
      distName: element,
      value: districtOutput[element].total[categoryLower]
        ? districtOutput[element].total[categoryLower]
        : 0,
    }))

    catData.sort((a, b) => b.value - a.value)

    const activeCases = distNamesList.map(element => ({
      distName: element,
      value:
        districtOutput[element].total.confirmed -
        (districtOutput[element].total.recovered +
          districtOutput[element].total.deceased)
          ? districtOutput[element].total.confirmed -
            (districtOutput[element].total.recovered +
              districtOutput[element].total.deceased)
          : 0,
    }))
    activeCases.sort((a, b) => b.value - a.value)

    if (categoryLower === 'active') {
      return activeCases
    }
    return catData
  }

  renderStateData = () => {
    const {
      nameOfTheState,
      totalTestedData,
      eachStateTotalData,
      date,
      activeTab,
      category,
      stateCode,
    } = this.state

    const categoryData = this.getCategoryWiseData()

    return (
      <div className="state-data-container">
        <div className="state-name-and-tested-container">
          <div className="state-name-container">
            <h1 className="state-name-heading">{nameOfTheState}</h1>
          </div>

          <div className="tested-container">
            <p className="tested-title">Tested</p>
            <p className="tested-count">{totalTestedData}</p>
          </div>
        </div>
        <div>
          <p className="last-updated-text">{`Last updated on ${date}`}</p>
        </div>

        <div className="category-container">
          <div>
            <CategoryWiseStateData
              eachStateCategoryWiseDetails={eachStateTotalData}
              getCategoryDetails={this.onGetCategory}
              active={activeTab}
            />
          </div>
        </div>

        <div
          className="total-district-data-block"
          data-testid="lineChartsContainer"
        >
          <h1 className={`district-heading ${category}-color`}>
            Top Districts
          </h1>
          <div className="ul-parent-list">
            <div className="district-data-ul-list">
              <ul
                className="districts-container"
                data-testid="topDistrictsUnorderedList"
              >
                {categoryData.map(each => (
                  <ShowEachDistrictData
                    key={each.distName}
                    number={each.value}
                    name={each.distName}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="graphs-data" data-testid="lineChartsContainer">
            <ChartsData stateCode={stateCode} category={category} />
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader" data-testid="stateDetailsLoader">
      <Loader type="TailSpin" color="#0b69ff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg-container">
        <Header />
        <div className="container">
          {isLoading ? this.renderLoadingView() : this.renderStateData()}
        </div>
      </div>
    )
  }
}
export default StateWiseCasesData
