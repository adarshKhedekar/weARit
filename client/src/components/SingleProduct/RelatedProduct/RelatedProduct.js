import './RelatedProduct.scss'
import Products from '../../Products/Products'
import PropTypes from 'prop-types';
import { Context } from '../../../utils/context';
import { useContext } from 'react';
function RelatedProduct({category, productName}) {
  const {popularProducts} = useContext(Context);
  const relatedProducts = popularProducts?.filter((items) => (items.category === category && items.productName !== productName))
  return (
    <div className='related-products'>
      <Products title={'related Product'} products={relatedProducts}/>
    </div>
  )
}

RelatedProduct.propTypes = {
  category: PropTypes.string.isRequired,
  productName: PropTypes.string.isRequired
}

export default RelatedProduct
