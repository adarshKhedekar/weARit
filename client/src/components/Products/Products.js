import './Products.scss';
import PropTypes from 'prop-types';
import Product from './Product/Product';
import {useEffect, useContext} from 'react'
import { Context } from '../../utils/context';
function Products({title, products}) {
  const {popularProducts, setPopularProducts} = useContext(Context);
  useEffect(()=>{
    const getProducts = async() => {
      const response = await fetch('http://localhost:5000/product');
      const data = await response.json();
      console.log('popularporduct',data)
      setPopularProducts(data);
    }
    getProducts();
  },[setPopularProducts])

  const productsToRender = !products ? popularProducts : products;

  return (
    <div className='products-container'>
        <div className="sec-heading">{title}</div>
        <div className="products">
          {productsToRender?.map((products)=>{
            const { productName, productDescription, category, price, image } = products;
            const base64Image = image.data;
            // console.log(base64Image)
            return <Product key={products.id} productName={productName} price={price} image={base64Image} productDescription={productDescription} category={category}/> 
          })}
        </div>
      
    </div>
  )
}

Products.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.array
};

export default Products
