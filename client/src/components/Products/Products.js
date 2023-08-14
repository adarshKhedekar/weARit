import './Products.scss';
import PropTypes from 'prop-types';
import Product from './Product/Product';
function Products({title}) {
  return (
    <div className='products-container'>
        <div className="sec-heading">{title}</div>
        <div className="products">
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
        </div>
      
    </div>
  )
}

Products.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Products
