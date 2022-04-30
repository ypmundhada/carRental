import './App.css';
import Axios from 'axios'
import {useEffect, useState} from "react";
import {Card,Button} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css"
import DatePicker from 'react-datepicker';
import LogIn from './login';
import moment from 'moment';
import TransactionPage from './Transaction';
import SearchBar from './Search';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <Link to="/logIn/">
            </Link>
          </ul>
          </nav>

        <Routes>
        <Route path='/' element={<LogIn/>}></Route>
        <Route path='/logIn/*' element={<LogIn/>}></Route>
        <Route path='/Search/*' element={<SearchBar/>}></Route>
        <Route path='/Transaction/*' element={<TransactionPage/>}></Route>
        </Routes>
      </div>
    </Router>
  )
  
  // const searchCar = () => {
  //   Axios.get("http://localhost:3001/searchCar").then((response) => {
  //     console.log(response);
  //   })
  // }
  // const getCarDetails = () => {
  //   Axios.get("http://localhost:3001/car").then((response) => {
  //     console.log(response);
  //   })
  // }
  
  // const [firstName,setfirstName]=useState("");
  // const [email,setEmail]=useState("");
  // const [lastName,setLastName]=useState("");
  // const [mobile,setMobile]=useState(0);
  // const [city,setCity]=useState("");
  // const addCustomer = (e) => {
  //   e.preventDefault();
  //   // console.log(firstName);
  //   Axios.post("http://localhost:3001/admin",{
  //     firstName:firstName,
  //     lastName:lastName,
  //     email:email,
  //     mobile:mobile,
  //     city:city
  //   }).then((response) => {
  //     console.log("done");
  //   })
  //   // navigate('/Search');
  // }
  // return(
  //   <form >
  //     <label>
  //       First Name:
  //       <input type="text" value={firstName} onChange={(event) => {
  //         setfirstName(event.target.value);
  //       }} />
  //     </label>
  //     <label>
  //       Last Name:
  //       <input type="text" value={lastName} onChange={(event) => {
  //         setLastName(event.target.value);
  //       }} />
  //     </label>
  //     <h3>fjsdk</h3>
  //     <label>
  //       Phone Number
  //       <input type="text" value={mobile} onChange={(event) => {
  //         setMobile(event.target.value);
  //       }} />
  //     </label>
  //     <label>
  //       City:
  //       <input type="text" value={city} onChange={(event) => {
  //         setCity(event.target.value);
  //       }} />
  //     </label>
  //     <label>
  //     Email:
  //     <input type="text" value={email} onChange={(event) => {
  //       setEmail(event.target.value);
  //     }} />
  //     </label>
  //     <button type="submit" onClick={addCustomer}>LogIn</button>
  //   </form>
  // );
  // here
  // const [carID,setCarID]=useState('');
  // const [carType,setCarType]=useState('');
  // const [carTrans,setCarTrans]=useState('');
  // const [carFuel,setCarFuel]=useState('');
  // const [carName,setCarName]=useState('');
  // const [carSeats,setCarSeats]=useState(0);
  // const [carBasePrice,setCarBasePrice]=useState('');
  // const [location,setLocation] = useState('');
  // const [searchCarList,setSearchCarList] = useState([]);
  // const [pickupDate,setPickupDt] = useState(new Date());
  // let pickDt = '';
  // const {state}=useLocation();
  // const {f_name,l_name}=state;
  // const navigate=useNavigate();



  // const getPrice = () => {
  //   Axios.get("http://localhost:3001/getPrice",{
  //     params:{
  //       car_id:carid,
  //       pickupDate:pickUpDate,
  //       dropDate:dropDate
  //     }
  //   }).then((response) => {
  //     console.log(response);
  //   })
  // }
  // const getSearchCarList = () => {
  //   Axios.get("http://localhost:3001/searchCar",{
  //     params:{
  //       carType:carType,
  //       carFuel:carFuel,
  //       carTrans:carTrans,
  //       carSeats:carSeats,
  //       location:location
  //     }
  //   }).then((response) => {
  //     console.log(response);
  //     // console.log(response.data.length);
  //     for(let i=0;i<response.data.length;i++){
  //       searchCarList.push(response.data[0][i]);
  //     }
  //     setSearchCarList(response.data[0]);
  //     // console.log(searchCarList);
  //   })
  // }
  // const handleDateChange = (date) => {
  //   date = moment(date).format('YYYY/MM/DD HH:mm:ss')
  //   // setPick(date);
  //   pickDt = date;
  //   // console.log(date);
  //   console.log(pickDt);
  //   // console.log(typeof(date));
  //   console.log(typeof(pickDt));
  // }
  // return (
  //   <div>
  //     <select value={location}  onChange={e=>setLocation(e.target.value)} >
  //                 <option value='Lucknow'>Lucknow</option>
  //                 <option value='Mumbai'>Mumbai</option>
  //                 <option value='Chennai'>Chennai</option>
  //     </select>
  //     <select value={carType}  onChange={e=>setCarType(e.target.value)} >
  //                 <option></option>
  //                 <option value='Hatchback'>Hatchback</option>
  //                 <option value='Sedan'>Sedan</option>
  //     </select>
  //     <select value={carFuel}  onChange={e=>setCarFuel(e.target.value)} >
  //                 <option></option>
  //                 <option value='Petrol'>Petrol</option>
  //                 <option value='Diesel'>Diesel</option>
  //     </select>
  //     <select value={carTrans}  onChange={e=>setCarTrans(e.target.value)} >
  //                 <option></option>
  //                 <option value='Automatic'>Automatic</option>
  //                 <option value='Manual'>Manual</option>
  //     </select>
  //     <select value={carSeats} onChange={e=>setCarSeats(e.target.value)} >
  //                 <option></option>
  //                 <option value='5'>5</option>
  //                 <option value='6'>6</option>
  //                 <option value='7'>7</option>
  //     </select>
  //     <button onClick={getSearchCarList}>Get Cars</button>
  //     {/* <DatePicker 
  //          selected={pickupDate}
  //          onChange={handleDateChange}
  //          minDate={new Date()}
  //          showTimeSelect
  //          timeFormat="HH:mm"
  //          timeIntervals={15}
  //          timeCaption="time"
  //          dateFormat="yyyy/MM/dd"
  //     /> */}
  //     {/* <h1>{pickupDate}</h1> */}
  //     {
  //       searchCarList.map((car) => (
  //         <div className = "car" key={car.car_ID}>
  //           <Card hoverable="true" style={{ width: '18rem' }}>
  //             <Card.Img variant="top" src="holder.js/100px180" />
  //             <Card.Body>
  //             <Card.Title>Card Title</Card.Title>
  //             <h2>{car.car_ID}</h2>
  //             <Card.Text>
  //             Some quick example text to build on the card title and make up the bulk of
  //             the card's content.
  //             </Card.Text>
  //             <Button variant="primary">Go somewhere</Button>
  //             </Card.Body>
  //           </Card>
  //         </div>
  //       ))
  //     }
  //   </div>
  // );
}
export default App;
