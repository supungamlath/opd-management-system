import React, { useState } from 'react'
import './addHP.scss'
import axios from 'axios'

function AddHP() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        // remove console log when done
        console.log(username)
        console.log(password)
        console.log(firstName)
        console.log(lastName)
        console.log(email)
        console.log(phone)
        console.log(role)

        // send to backend
        axios.post('/api/admin/register-professional', {
            username: username,
            password: password,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone_number: phone,
            role: role
        })

        // clear form
        setUsername('')
        setPassword('')
        setFirstName('')
        setLastName('')
        setEmail('')
        setPhone('')
        setRole('')

    }

    return (
        <div>
            <h1 className="heading">Add new Healthcare Professional</h1>
            <hr />
            <form className='login-form' onSubmit={handleSubmit}>
                <div className='in-line'>
                    <label htmlFor='name'>User Name</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='' id="username" name="username" />
                </div>
                <div className='in-line'>
                    <label htmlFor='password'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='***********' id="password" name="password" />
                </div>
                <div className='in-line'>
                    <label htmlFor='firstName'>First Name</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type='text' placeholder='' id="firstName" name="firstName" />
                </div>
                <div className='in-line'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} type='text' placeholder='' id="lastName" name="lastName" />
                </div>
                <div className='in-line'>
                    <label htmlFor='email'>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='' id="email" name="email" />
                </div>
                <div className='in-line'>
                    <label htmlFor='phone'>Phone</label>
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type='tel' placeholder='' id="phone" name="phone" />
                </div>
                <div className='in-line'>
                    <label htmlFor='role'>Role</label>
                    <select className='selectWindow' value={role} onChange={(e) => setRole(e.target.value)} id="role" name="role">
                        <option value="1">Doctor</option>
                        <option value="2">Nurse</option>
                        <option value="3">Pharmacist</option>
                        <option value="4">Radiologist</option>
                    </select>
                </div>
                <button type="submit" style={{ borderRadius: '0.5rem', backgroundColor: '#3b8dff', color: 'white', minWidth: 300, minHeight: 60 }}>Add new professional</button>
            </form>
        </div>
    )
}

export default AddHP