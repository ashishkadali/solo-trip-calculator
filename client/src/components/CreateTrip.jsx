import React, { useEffect, useState } from 'react';
import '../css/createtrip.css';
import { createNewTripApi } from '../API/Postapi';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
    const navigator = useNavigate()
  const [formData, setFormData] = useState({
    tripName: null,
    from: null,
    destination: null,
    budget: null,
    transport: 'car',
    days: null,
    email: ''
  });

  useEffect(()=>{
    setFormData(prevState => ({
        ...prevState,
        ["email"]: "ashishkadali7@gmail.com"
      }));
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if(formData.)
    // You can perform any further actions here, like sending the data to a server
    console.log(formData);
    createNewTripApi(formData).then((res)=>{
        navigator('/');
    }).catch((err)=>{
        console.log(err)
    })
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit}>
      <label htmlFor="tripName">Trip Name:</label>
      <input type="text" id="tripName" name="tripName" value={formData.tripName} onChange={handleChange} required />

      <label htmlFor="from">From:</label>
      <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} required />

      <label htmlFor="destination">Destination:</label>
      <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} required />

      <label htmlFor="budget">Budget:</label>
      <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} required />

      <label htmlFor="transport">Transport:</label>
      <select id="transport" name="transport" value={formData.transport} onChange={handleChange} required>
        <option value="car">Car</option>
        <option value="train">Train</option>
        <option value="plane">Plane</option>
      </select>

      <label htmlFor="days">Days:</label>
      <input type="number" id="days" name="days" value={formData.days} onChange={handleChange} required />

      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={formData.email}  required />

      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default CreateTrip;
