import React, {Component,useState} from 'react';
import SearchBar from './Search';
import {Route,Link,Routes} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';
import { Button } from 'react-bootstrap';
import {VscAccount} from "react-icons/vsc"
export default function LogIn (props){
    const [firstName,setFirstName]=useState('');
    const [email,setEmail]=useState('');
    const [lastName,setLastName]=useState('');
    const [mobile,setMobile]=useState('');
    const [city,setCity]=useState('');
    const navigate=useNavigate();
    const [emailError,setEmailError]=useState('');
    const [validEmail,setValidEmail]=useState(0)
    const validateEmail = (e) => {
      var emailTemp = e.target.value
      // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.com+)*$/
      // ^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$
      if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(emailTemp)) {
        setEmailError('Valid Email :)');
        setEmail(emailTemp);
        setValidEmail(1);

      } else {
        setEmailError('Enter valid Email!');
        setEmail(emailTemp);
        setValidEmail(0);

      }
    }
 function handleClick(e)
  {
    e.preventDefault();
    Axios.post("http://localhost:3001/admin",{
        f_name:firstName,
        l_name:lastName,
        email:email,
        mobile:mobile,
        city:city
    }).then((response) => {
      console.log(response);
    });
    navigate('/Search',{
      state:{
      f_name:firstName,
      l_name:lastName,
      email:email,
      mobile:mobile,
      city:city
      }
    });
    //console.log(JSON.stringify({f_Name:firstName,l_name:lastName}));
  }

      return(
        <form style={styles.logPage}>
          <h3>Hello User!  <VscAccount/></h3>
          <h3>Enter every field to LogIn!</h3>
        <label style={styles.firstName}>
          <input placeholder="First Name" type="text" value={firstName} onChange={event=>setFirstName(event.target.value.replace(/[^a-zA-Z]/gi,''))} />
        </label>
        <label style={styles.lastName}>
          <input placeholder="Last Name" type="text" value={lastName} onChange={event=>setLastName(event.target.value.replace(/[^a-zA-Z]/gi,''))} />
        </label>
        <label style={styles.mobile}>
          <input placeholder="Mobile" type="number" value={mobile} onChange={event=> event.target.value<0?0:setMobile(event.target.value)} />
        </label>
        <label style={styles.city}>
          <select style={{width:"190px"}} value={city || ''}  onChange={e=>setCity(e.target.value || null)} >
                  <option value=''>City</option>
                  <option value='Mumbai'>Mumbai</option>
                  <option value='New Delhi'>New Delhi</option>
                  <option value='Chennai'>Chennai</option>
                  <option value='Kolkata'>Kolkata</option>
                  <option value='Mysore'>Mysore</option>
                  <option value='Bangalore'>Bangalore</option>
                  <option value='Pune'>Pune</option>
                  <option value='Agra'>Agra</option>
                  <option value='Trivandrum'>Trivandrum</option>
                  <option value='Coimbatore'>Coimbatore</option>
                  <option value='Ahemadabad'>Ahemadabad</option>
                  
      </select>
        </label>
        <div style={{display:"flex",flexDirection:"column"}}>
        <input placeholder="Email" type="text" value={email} onChange={e=>validateEmail(e)} />
        <span style={{
          fontWeight: 'normal',
          color: 'white',
        }}>{emailError}</span>
      </div>
        <Button style={styles.button} type="submit" disabled={!(firstName && lastName && mobile && email  && city &&validEmail)} onClick={handleClick}>LogIn</Button>
      </form>
      );
}

const styles={
  logPage:{
    margin:"auto",
    alignItems:"center",
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    border:"2px solid #f15d61",
    height:"450px",
    width:"500px",
    backgroundColor:"#f15d61",
    borderRadius:"5px",
  },
  
  firstName: {
    padding:"5px",
    margin: "5px",
    //border: "2px solid green",
  },
  lastName: {
    padding:"5px",
    margin: "5px",
    //border: "2px solid green",
  },
  email: {
    padding:"5px 5px",
    margin: "5px",
    //border: "2px solid green",
  },
  city: {
    padding:"5px",
    margin: "5px",
    //border: "2px solid green",
  },
  mobile:{
      padding:"5px",
      margin: "5px",
      //border: "2px solid green",
  },
  button:{
    padding:"5px",
    margin:"15px",
    backgroundColor:"#41b6ac",
    borderColor:"#41b6ac",
    buttonWidth:"20px"
  }
}