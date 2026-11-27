import { useEffect, useState } from 'react'
import axios from 'axios'

const productsUrl = 'https://fakestoreapi.com/products'

export default function Products({ productId, onNavigate }) {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(productId ? `${productsUrl}/${productId}` : productsUrl)
      .then((response) => setProducts(Array.isArray(response.data) ? response.data : [response.data]))
      .catch((requestError) => {
        console.error('Failed to load products:', requestError)
        setError('Could not load products.')
      })
      .finally(() => setLoading(false))
  }, [productId])

  return (
    <section className="products-page">
      {productId && (
        <a className="back-link" href="/products" onClick={(event) => onNavigate(event, '/products')}>
          Back to products
        </a>
      )}
      <h1>{productId ? `Product ${productId}` : 'Products'}</h1>
      {error && <p className="page-error" role="alert">{error}</p>}
      {loading && <p className="page-message" role="status">Loading products...</p>}
      {!loading && !error && products.length === 0 && <p className="page-message">No products found.</p>}
      <ul className={`products-list ${productId ? 'single-product' : ''}`}>
        {products.map((product) => (
          <li className="product-item" key={product.id}>
            {productId ? (
              <>
                <img src={product.image} alt={product.title} />
                <h2>{product.title}</h2>
                <p>{product.description}</p>
              </>
            ) : (
              <a href={`/products/${product.id}`} onClick={(event) => onNavigate(event, `/products/${product.id}`)}>
                <img src={product.image} alt={product.title} />
                <h2>{product.title}</h2>
              </a>
            )}
            <strong>${product.price.toFixed(2)}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}
