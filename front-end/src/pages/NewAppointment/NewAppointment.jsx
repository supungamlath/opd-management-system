import React, { useState } from 'react'

function NewAppointment() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(password)
    }
    return (
        <div>
            <h1>New Appointment</h1>
            <div className='login-window'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='you@uom.lk' id="email" name="email" />
                    <label htmlFor='password'>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='***********' id="password" name="password" />
                    <button type="submit">Log In</button>
                </form>
                
            </div>
        </div>
    );
}

export default NewAppointment;