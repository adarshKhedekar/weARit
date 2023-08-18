import './Category.scss'
import eyeWear from '../../../assets/Category/eyeglass.jpg'
import mask from '../../../assets/Category/mask.png'
import {useNavigate} from 'react-router-dom';
function Category() {
  const navigate = useNavigate();
  const handleEyeClick = () => {
    navigate('/category/eye wear');
  }

  const handleFaceClick = () => {
    navigate('/category/face mask');
  }
  return (
    <div className='shop-by-category' id='category'>
      <div className="sec-heading">Categories</div>
      <div className="categories">
        <div className="category" onClick={handleEyeClick}>
            <img src={eyeWear} alt=""/>
        </div>
        <div className="category" onClick={handleFaceClick}>
            <img src={mask} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Category
