import { useEffect, useState } from 'react'
import axios from 'axios'

const usersUrl = 'https://jsonplaceholder.typicode.com/users'
const productsUrl = 'https://fakestoreapi.com/products'

export const Users = () => {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(usersUrl)
        setUsers(response.data)
      } catch (error) {
        console.error('Failed to load users:', error)
        setError('Could not load users.')
      }
    }

    getUsers()
  }, [])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(productsUrl)
        console.log('Products:', response.data)
        setProducts(response.data)
      } catch (error) {
        console.error('Failed to load products:', error)
        setError('Could not load products.')
      }
    }

    getProducts()
  }, [])

  const addUser = async () => {
    setError('')

    try {
      const response = await axios.post(usersUrl, {
        name: 'Test User',
        username: 'testuser',
        email: 'testuser@example.com',
      })

      console.log(response.data)
      setUsers((currentUsers) => [...currentUsers, response.data])
    } catch (error) {
      console.error('Failed to add user:', error)
      setError('Could not add user.')
    }
  }

  return (
    <section>
      <h2>Fake Store Products</h2>
      <button onClick={addUser} type="button">Add test user</button>
      {error && <p role="alert">{error}</p>}
      <table className="border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-400 p-2" scope="col">Product name</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border border-slate-400 p-2">{product.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Users</h2>
      <table className="border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="border border-slate-400 p-2" scope="col">Name</th>
            <th className="border border-slate-400 p-2" scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-slate-400 p-2">
                {user.name}
              </td>
              <td className="border border-slate-400 p-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
