import React, {useState} from 'react'
import './App.css';
import axios from 'axios';

function App() {
  const[form,setForm]=useState({
  
  })
  const[errors,setErrors]=useState({})

   const isValidEmail =(email)=>{
    const valid= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.match(valid);
  }

  
  const validateMob=(mobile)=>{
    if(!mobile) return 'Mobile Number is Required';
    if(mobile.length<7 || mobile.length>15){
      return 'Enter a valid mobile number';
    }
    for(let p of mobile){
        if(!(p>='0' && p<='9')){
            return 'Enter a valid mobile number';
        }
    }
    return '';
  }
  const validate = ()=>{
    let err = {...errors};
    err.name = !form.name ? 'Name is Required':'';
    err.mobile = validateMob(form.phone);
    err.email = !form.email ? 'Email is Required' : (isValidEmail(form.email) ? '':'Enter a valid email' ); 
    return err;
  }
  const isValid =(errors)=>{
    let keys = Object.keys(errors);
    let count =keys.reduce((acc,curr)=>errors[curr] ?acc+1:acc,0);
    return count===0;
  }
  const handleChange = (e)=>{
    let {name,value}=e.target;
    setForm({
      ...form, 
      [name]:value
    })
  }
  const postData = async(data)=>{
    try{
      let response = await axios.post('http://localhost:5000/formdata',data)
     // console.log(response.data)
     if(response.status===200){
      alert('Your form is submitted')
      setForm({name:'',phone:'',email:''})
     }
    }catch(err){
      console.log(err)
      alert(err.message)
    }
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    let errors = validate();
    if(isValid(errors)){
        setErrors({});
        postData(form)
    }else{
      setErrors(errors);
    }
    //console.log(form)
  }
 
  
  return (
    <div className="flex justify-center bg-gray-900  items-center h-screen">
      <div className='border shadow-md bg-indigo-200  p-8 py-16 rounded-md'>
      <div  className="min-w-72  ">
        <h5 className='text-center text-xl font-semibold'>User Form</h5>
     
        
        <div className='my-4' >
          <label className='text-gray-600 my-1'>Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="block w-full px-4 py-2 my-1  rounded-md"
          />
          {errors && errors.name && <div className='text-xs text-red-500'>{errors.name}</div>}
        </div>
        <div className='my-4'>
        <label className='text-gray-600 my-1'>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="block w-full px-4 py-2 my-1 border rounded-md"
          />
           {errors && errors.email && <div className='text-xs text-red-500'>{errors.email}</div>}
        </div>
        <div className='my-4'>
        <label className='text-gray-600 my-1'>Mobile </label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Enter your Mobile Number"
          className="block w-full px-4 py-2 my-1 border rounded-md"
        />
         {errors && errors.mobile && <div className='text-xs text-red-500'>{errors.mobile}</div>}
        </div>
        <button type="submit" onClick={handleSubmit} className="bg-blue-500 w-full my-4 text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </div>
      </div>
    </div>
  );
}

export default App;
