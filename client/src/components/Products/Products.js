import "./Products.scss";
import PropTypes from "prop-types";
import Product from "./Product/Product";
import { useContext } from "react";
import { Context } from "../../utils/context";
function Products({ title, products }) {
  const { popularProducts } = useContext(Context);
  const mainProducts = popularProducts?.filter(
    (product) => product.popular === true
  );
  const productsToRender = !products ? mainProducts : products;

  return productsToRender ? (
    <div className="products-container">
      <div className="sec-heading">{title}</div>
      <div className="products">
        {productsToRender?.map((products) => {
          const { productName, productDescription, category, price, image } =
            products;
          const base64Image = image.data;
          // console.log(base64Image)
          return (
            <Product
              key={products.id}
              productName={productName}
              price={price}
              image={base64Image}
              productDescription={productDescription}
              category={category}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
}

Products.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.array,
};

export default Products;
