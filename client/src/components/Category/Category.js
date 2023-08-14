import './Category.scss'
import Products from '../Products/Products';
function Category() {
  return (
    <div className='category-main-content'>
      <div className="layout">
        <Products title={'Glasses'}/>
      </div>
    </div>
  )
}

export default Category
