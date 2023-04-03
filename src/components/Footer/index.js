import {VscGithubAlt} from 'react-icons/vsc'
import {FiInstagram} from 'react-icons/fi'
import {FaTwitter} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-container">
    <h1 className="heading">
      COVID19<span className="india">INDIA</span>
    </h1>
    <p className="para">we stand with everyone fighting on the front lines</p>
    <div className="social-icons-container">
      <VscGithubAlt className="icon" />
      <FiInstagram className="icon" />
      <FaTwitter className="icon" />
    </div>
  </div>
)

export default Footer
