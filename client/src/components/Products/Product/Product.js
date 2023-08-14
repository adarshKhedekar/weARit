import './Product.scss'
function Product() {
  return (
    <div className='product-card'>
      <div className="thumbnail">
        <img src='../Slider/image5.jpg' alt=""/>
      </div>
      <div className="prod-details">
        <span className="name">Product name</span>
        <span className="price">&#8377;499</span>
      </div>
    </div>
  )
}

export default Product
