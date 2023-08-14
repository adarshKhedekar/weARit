import './Category.scss'
import eyeWear from '../../../assets/Category/eyeglass.jpg'
import mask from '../../../assets/Category/mask.png'
function Category() {
  return (
    <div className='shop-by-category'>
      <div className="categories">
        <div className="category">
            <img src={eyeWear} alt="" />
        </div>
        <div className="category">
            <img src={mask} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Category
