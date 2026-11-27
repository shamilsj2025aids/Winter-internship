import { useState } from 'react'
import { z } from 'zod'

const registerSchema = z.object({
    name: z.string().min(3, "Name must have min 3 letters"),
    email: z.string().email("Enter valid email"),
    password: z.string().min(8,"Password must have min 8")
})
const Register = () => {
    const[formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const handleChange=(e)=>{
        const {name, value} = e.target
        setFormData((currentData) => ({
            ...currentData,
            [name]: value
        }))
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const result = registerSchema.safeParse(formData)
        if(result.success){
            console.log("Validation successful:", result.data)
            console.log("Register form data:", formData)
        }
        else{
            console.log("Validation failed:", result.error.format())
            alert(result.error.issues[0].message);
        }
    }
  return (
    <div className="register-page">
        <h1>Register Form</h1>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input id="name" type="text" name="name" onChange={handleChange} value={formData.name}/><br/>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" name="email" onChange={handleChange} value={formData.email}/><br/>
            <label htmlFor="password">Password:</label>
            <input id="password" type="password" name="password" onChange={handleChange} value={formData.password}/><br/>
            <button
                className="rounded border border-gray-400 bg-gray-100 px-4 py-2 text-sm text-gray-900 hover:bg-gray-200"
                type="submit"
            >
                Register
            </button>
        </form>
    </div>
  )
}

export default Register
