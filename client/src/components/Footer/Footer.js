import { FaLocationArrow,FaMobileAlt, FaEnvelope} from 'react-icons/fa'
import Payment from '../../assets/payment.jpeg'
import './Footer.scss'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="col">
          <div className="title">About</div>
          <div className="text">
          Experience style and safety with WeARit! Try on our trendy collection of glasses and face masks virtually, finding the perfect fit for your unique look. Embrace fashion and protection effortlessly.
          </div>
        </div>
        <div className="col">
          <div className="title">Contact</div>
          <div className="c-item">
              <FaLocationArrow/>
              <div className="text">Ghartan pada No. 2, Dahisar East, Mumbai, 400068</div>
          </div>
          <div className="c-item">
              <FaMobileAlt/>
              <div className="text">Phone: 0046 2003 3415</div>
          </div>
          <div className="c-item">
              <FaEnvelope/>
              <div className="text">Email: store@wearit.com</div>
          </div>
        </div>
        <div className="col">
          <div className="title">Categories</div>
          <span className="text" onClick={() => navigate('/category/eye wear')}>Eye Wears</span>
          <span className="text" onClick={() => navigate('/category/face mask')}>Face Mask</span>
        </div>
        <div className="col">
          <div className="title">Pages</div>
          <span className="text" onClick={() => navigate('/')}>Home</span>
          <span className="text" onClick={() => navigate('/about')}>About</span>
          <span className="text">Privacy Policy</span>
          <span className="text">Returns</span>
          <span className="text">Terms & Conditions</span>
          <span className="text">Contact Us</span>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="bottom-bar-content">
          <div className="text">WEARIT 2023 CREATED BY ADK, PREMIUM E-COMMERCE SOLUTIONS.</div>
          <img src={Payment} alt="" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
