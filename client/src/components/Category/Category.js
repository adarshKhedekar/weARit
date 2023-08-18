import './Category.scss'
import Products from '../Products/Products';
import { useParams } from "react-router-dom";
import { Context } from '../../utils/context';
import { useContext } from 'react';
function Category() {
  const {id} = useParams();
  const {popularProducts} = useContext(Context);
  const categorizedProducts = popularProducts?.filter((item) => item.category === id);
  
  return (
    <div className='category-main-content'>
      <div className="layout">
        <Products title={id} products={categorizedProducts}/>
      </div>
    </div>
  )
}

export default Category
