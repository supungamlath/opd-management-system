import React, { useState } from 'react'
import './newAppointment.scss'

function NewAppointment() {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [doctor, setDoctor] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        // remove console log when done
        console.log(doctor)
        console.log(date)
        console.log(time)
    }
    return (
        <div className='all'>
            <h1 className='title'>New Appointment</h1>
            <div className='login-window'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <div className='in-line'>
                        <label htmlFor='doctor'>Doctor</label>
                        <select  className = 'selectWindow'value={doctor} onChange={(e) => setDoctor(e.target.value)} id="doctor" name="doctor">
                            <option value="doctor1">Doctor 1</option>
                            <option value="doctor2">Doctor 2</option>
                            <option value="doctor3">Doctor 3</option>
                        </select>
                    </div>
                    <div className='in-line'>
                        <label htmlFor='date'>Date</label>
                        <input value={date} onChange={(e) => setDate(e.target.value)} type='date' placeholder='dd/mm/yyyy' id="date" name="date" />
                    </div>
                    <div className='in-line'>
                        <label htmlFor='time'>Time</label>
                        <input value={time} onChange={(e) => setTime(e.target.value)} type='time' placeholder='***********' id="time" name="time" />
                    </div>
                    <button type="submit" style={{ borderRadius: '0.5rem', backgroundColor: '#3b8dff', color: 'white', minWidth: 300, minHeight: 60 }}>confirm edit</button>
                </form>

            </div>
        </div>
    );
}

export default NewAppointment;