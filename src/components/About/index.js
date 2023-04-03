import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FaqItem from '../FaqItem'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class About extends Component {
  state = {
    faqsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getFaqsData()
  }

  getFaqsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const faqUrl = 'https://apis.ccbp.in/covid19-faqs'
    const options = {
      method: 'GET',
    }

    const response = await fetch(faqUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      this.setState({
        faqsList: data.faq,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderAboutData = () => {
    const {faqsList} = this.state
    return (
      <div className="about-route-container">
        <h1 className="heading">About</h1>
        <p className="para-1">Last update on Monday, Nov 15th 2021.</p>
        <p className="para-2">COVID-19 vaccines be ready for distribution</p>
        <ul className="faq-list-container" data-testid="faqsUnorderedList">
          {faqsList.map(eachFaq => (
            <FaqItem faqData={eachFaq} key={eachFaq.qno} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="aboutRouteLoader">
      <Loader type="Oval" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderDataBasedOnStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAboutData()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderDataBasedOnStatus()}
      </>
    )
  }
}

export default About
