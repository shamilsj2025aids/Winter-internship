import { useEffect, useState } from 'react'
import Register from '../hooks/Register.jsx'
import Products from '../pages/Products.jsx'
import { Users } from '../hooks/Users.jsx'
import Navbar from './components/ui/Navbar.jsx'
import './App.css'

function App() {
  const [path, setPath] = useState(() => window.location.pathname)
  const productMatch = path.match(/^\/products\/(\d+)\/?$/)
  const isProductsPage = path === '/products' || Boolean(productMatch)
  const pagePath = isProductsPage ? '/products' : '/register'

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  function navigate(event, nextPath) {
    event.preventDefault()
    window.history.pushState({}, '', nextPath)
    setPath(nextPath)
  }

  return (
    <div className="simple-app">
      <Navbar activePath={pagePath} onNavigate={navigate} />
      <main className="simple-content">
        {isProductsPage
          ? <Products key={path} productId={productMatch ? productMatch[1] : null} onNavigate={navigate} />
          : <><Register /><Users /></>}
      </main>
    </div>
  )
}

export default App
