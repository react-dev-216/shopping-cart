import React from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Button from './Button'
import { getProducts } from '../selectors'
import { selectProducts } from '../actions'
import '../styles/layouts/Products.scss'
import { plusSvg } from '../styles/svg'

const Products = props => {
  const { selectedTotalNum, products, selectProducts } = props
  return (
    <div className="products">
      <div className="products__header">
        <h1 className="products__title">Products</h1>
        <Link to="/checkout" className="products__cart">
          Cart {selectedTotalNum}
        </Link>
      </div>
      {
        products.map(el => (
          <div key={el.sku} className="products__row">
            <div className="products__row-name">{el.name}</div>
            <div className="products__row-price">${el.price}</div>
            <Button
              content={plusSvg}
              handleClickEvent={() => selectProducts(el, 'INC')}
            />
          </div>
        ))
      }
    </div>
  )
}

const mapStateToProps = state => ({
  products: getProducts(state)
})

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      selectProducts
    },
    dispatch
  )
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)

