import React, {Component,useEffect,useState} from 'react';
import {Route,Link,Routes} from 'react-router-dom' ;
import {useNavigate,useLocation} from 'react-router-dom';
import {Card,Button} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Axios from 'axios';
import {Grid} from "@material-ui/core";
import {VscAccount} from "react-icons/vsc";

function SearchBar(props)
{
  const {state}=useLocation();
  const {f_name,l_name,email,mobile,city}=state;

  const [carID,setCarID]=useState('');
  const [carType,setCarType]=useState(null);
  const [carTrans,setCarTrans]=useState(null);
  const [carFuel,setCarFuel]=useState(null);
  const [carName,setCarName]=useState('');
  const [carSeats,setCarSeats]=useState(null);
  const [carBasePrice,setCarBasePrice]=useState('');
  const [pickupDate,setPickUpDt]=useState(new Date());
  const [pickDt,setPickDt] = useState('');
  const [dropDate,setDropDt]=useState(new Date());
  const [dropDt,setDDt] = useState('');
  const [searchCarList,setSearchCarList]=useState([]);
  const [carDetails,setCarDetails] = useState();
  const [cust_id,setCustId] = useState(0);
  const [waitList,setWaitList]=useState([]);
  const [validDate,setValidDate]=useState(false);
  const [prevTrnx,setPrevTrnx]=useState([]);

  const navigate=useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:3001/custId",{
            params:{
                email:email,
                mobile:mobile
            }
    }).then((response) => {
            setCustId(response.data[0].custId);
    })
  },[])
  const getSearchCarList = () => {
    // console.log(JSON.stringify({f_name:f_name,l_name:l_name,email:email,mobile:mobile,city:city}));
    // console.log(carFuel);
    // console.log(city);
    // console.log(carSeats);
    // console.log(carTrans);
    // console.log(pickDt);
    // console.log(dropDt);
    // console.log(searchCarList);
    setWaitList([]);
    Axios.get("http://localhost:3001/searchCar",{
      params:{
        carType:carType,
        carFuel:carFuel,
        carTrans:carTrans,
        carSeats:carSeats,
        location:city
      }
    }).then((response) => {
      // console.log(response);
      for(let i=0;i<response.data.length;i++){
        searchCarList.push(response.data[0][i]);
      }
      setSearchCarList(response.data[0]);
      // console.log(searchCarList);
    })
  }
  function handleSignOutButton()
  {
    navigate('/logIn');
  }
  const handleShowWaitList = () => {
    setSearchCarList([]);
    Axios.get("http://localhost:3001/dispWaitList",{
      params:{
        cust_id:cust_id
      }
    }).then((response) => {
      console.log(response);
      for(let i=0;i<response.data.length;i++){
        waitList.push(response.data[0][i]);
      }
      setWaitList(response.data[0]);
    })
  }
  const handlePDateChange = (date) => {
    setPickUpDt(date);
    date = moment(date).format('YYYY/MM/DD HH:mm:ss')
    setPickDt(date);
    setValidDate(false);
    let pkDt = moment(date)
    let dpDt = moment(dropDate);
    let diff = dpDt.diff(pkDt);
    if(diff>0) setValidDate(true);
  }
  const handleDDateChange = (date) => {
    setDropDt(date);
    date = moment(date).format('YYYY/MM/DD HH:mm:ss')
    setDDt(date);
    setValidDate(false);
    let pkDt = moment(pickupDate)
    let dpDt = moment(date);
    let diff = dpDt.diff(pkDt);
    if(diff>0) setValidDate(true);
  }
  const handleCardButton = (carID,e) => {
    navigate('/Transaction',{
      state:{
        userDetails:state,
        car_id:carID,
        pickDt:pickDt,
        dropDt:dropDt,
        cust_id:cust_id
      }
    });
  }
  return (
    <div style={styles.CarSearch}>
      <div style={styles.topBar}>
        <div style={{display:"flex",width:"50%",justifyContent:"center"}}>
          <h4>Welcome to Car Rentalz</h4>
        </div>
        <div style={
          {
            display:"flex",
            flexDirection:"row",
            width:"50%",
            justifyContent:"space-around"
            }}>
        <p style={
          {
            paddingRight:"10px",
            fontSize:"20px",
             }
             }>Hello {f_name}!<VscAccount/></p>
             
        

             <Button size="25px" style={
        {
          alignSelf:"center"
          }
          } variant="secondary" onClick={handleShowWaitList}>Show Wait List</Button>

      <Button size="25px" style={
        {
          alignSelf:"center"
          }
          } variant="secondary" onClick={handleSignOutButton}>Sign out</Button>
          </div>
      </div>


      <Grid container style={styles.topPane}>
      <Grid item>
      <label>
        Car Type:
      <select style={{}} value={carType || ''}  onChange={e=>setCarType(e.target.value || null)} >
                  <option value=''>Any</option>
                  <option value='Hatchback'>Hatchback</option>
                  <option value='Sedan'>Sedan</option>
                  <option value='Suv'>SUV</option>
                  <option value='Mini Suv'>Mini SUV</option>
                  
      </select>
      </label>
      </Grid>
      <Grid item>
      <label>
        Fuel Type:
      <select value={carFuel || ''}  onChange={e=>setCarFuel(e.target.value || null)} >
                  <option value=''>Any</option>
                  <option value='Petrol'>Petrol</option>
                  <option value='Diesel'>Diesel</option>
      </select>
      </label>
      </Grid>
      <Grid item>
      <label>
        Transmission Type:
      <select value={carTrans || ''}  onChange={e=>setCarTrans(e.target.value || null)} >
                  <option value=''>Any</option>
                  <option value='Automatic'>Automatic</option>
                  <option value='Manual'>Manual</option>
      </select>
      </label>
      </Grid>
      <Grid item>
      <label>
        Number of Seats:
      <select value={carSeats || ''} onChange={e=>setCarSeats(e.target.value || null)} >
                  <option value=''>Any</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
      </select>
      </label>
      </Grid>

      <Grid item>
        PickupDate:
      <DatePicker 
           selected={pickupDate}
           onChange={handlePDateChange}
           minDate={new Date()}
           showTimeSelect
           timeFormat="HH:mm"
           timeIntervals={15}
           timeCaption="time"
           dateFormat="yyyy/MM/dd"
      />
      </Grid>
      <Grid item>
        DropDate:
      <DatePicker 
           selected={dropDate}
           onChange={handleDDateChange}
           minDate={pickupDate}
           showTimeSelect
           timeFormat="HH:mm"
           timeIntervals={15}
           timeCaption="time"
           dateFormat="yyyy/MM/dd"
      /> </Grid>

      <Grid item><Button style={styles.buttonCD} disabled={!(pickDt && dropDt && validDate)} variant="primary" onClick = {getSearchCarList}>Get Car data</Button></Grid>

      </Grid>
      <Grid style={styles.bottomPane} container spacing={4} justifyContent={'center'}>
      {
        searchCarList.map((car) => (
          <Grid item xs={12} sm={6} md={4}>
          <div className = "car" key={car.car_ID}>
            <Card className='card' style={{ 
              width: '22rem',
              //border:"2px solid black",
              boxShadow:"2px 4px 8px 2px rgba(0,0,0,0.2)",
              transition:"0.3 s",
              padding:"5px"
              }}>


            {(function() {
            switch(car.car_ID) {
              case 100:
                return <Card.Img className="cardImage" key={100} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkR528mnkuazs_RlihF2BLdRUrA2QIGyF9ig&usqp=CAU"/>;
              case 101:
                return <Card.Img className="cardImage" key={101} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPTXYOJCG-NmDxyu_Rzo6oO5OMgCdRWgTkkA&usqp=CAU"/>;
              case 102:
                return <Card.Img className="cardImage" key={102} variant="top" src="https://media.istockphoto.com/photos/red-generic-sedan-car-isolated-on-white-background-3d-illustration-picture-id1189903200?k=20&m=1189903200&s=612x612&w=0&h=L2bus_XVwK5_yXI08X6RaprdFKF1U9YjpN_pVYPgS0o="/>;
              case 103:
                return <Card.Img className="cardImage" key={103} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1S-KiBHZbQDegLNp9tLw6hx2wjMIt0OGQ6g&usqp=CAU"/>;
              case 104:
                return <Card.Img className="cardImage" key={104} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRutjHIfq823Gf-xa0JI5qRmHlH07Lyh_Vxgg&usqp=CAU"/>;
              case 105:
                return <Card.Img className="cardImage" key={105} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw2JJ86pEHsL4dD9uifJXmmIgKDrkMcheK9w&usqp=CAU"/>;
              case 106:
                return <Card.Img className="cardImage" key={106} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkg9rSSzMPEB09jLBnrxJG92_Z7vBgXd3OFA&usqp=CAU"/>;
              case 107:
                return <Card.Img className="cardImage" key={107} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7b64sdxZUT_VPIiWevOQB1akBpYD6fT350A&usqp=CAU"/>;
              case 108:
                return <Card.Img className="cardImage" key={108} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrwSTp-flzVkDlPSPuNMMlTZ0DIGJQVp1RJQ&usqp=CAU"/>;
              case 109:
                return <Card.Img className="cardImage" key={109} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdoVsXFPzdmc1cSYZERF4l6xPqaC3B-I4fpw&usqp=CAU"/>;
              case 110:
                return <Card.Img classname="cardImage" key={110} variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTca6M8fjjSJ-RxjVE3c6sWnvzyZFaQMjhS5w&usqp=CAU"/>;
            
          } 
        })()}

              <Card.Body className="cardBody">
              <h4>Car Id Number: {car.car_ID}</h4>
              <div style={{display:"flex", justifyContent:"center",paddingTop:"10px"}}>
              <Button variant="secondary" onClick={(e) => {
                handleCardButton(car.car_ID,e) }}>Get More Details</Button>
                </div>
              </Card.Body>
            </Card>

          </div>
          </Grid>
        ))
      }
      </Grid>
{/* cust_id,location,car_id,pickDt,dropDt,rentalCost */}
      <Grid style={styles.bottomTranxPane} container spacing={4} justifyContent={'center'}>
      {
        waitList.map((trnx) => (
          <Grid item xs={12} sm={6} md={4}>
          <div className = "car" >
            <Card className='card' style={{ 
              width: '22rem',
              //border:"2px solid black",
              boxShadow:"2px 4px 8px 2px rgba(0,0,0,0.2)",
              transition:"0.3 s",
              padding:"5px"
              }}>



              <Card.Body className="cardTrnxBody">
              <h4>Location: {trnx.location}</h4>
              <h4>Car Name: {trnx.car}</h4>
              <h4>Pick up date: {moment(trnx.pickupDate).format("DD-MM-YYYY HH:mm:ss")}</h4>
              <h4>Drop date: {moment(trnx.dropDate).format("DD-MM-YYYY HH:mm:ss")}</h4>
              <h4>Car Available: {trnx.carAvl}</h4>
              <div style={{display:"flex", justifyContent:"center",paddingTop:"10px"}}>
                </div>
              </Card.Body>
            </Card>

          </div>
          </Grid>
        ))
      }
      </Grid>





    </div>
  );
}
export default SearchBar;
const styles={
  CarSearch:{
    flexDirection:"column",
    justifyContent:"space-around",
    alignItems:"flex-start",
    //border:"2px solid black"
  },
  topBar:{
    width:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    height:"50px",
    //border:"2px solid blue"
  },
  topPane:{
    height: "100px",
    maxHeight:"200px",
    margin:"auto",
    alignItems:"center",
    display:"flex",
    justifyContent:"space-around",
    flexDirection:"row",
    //border:"2px solid green",
    backgroundColor:"#f15d61",
    borderRadius:"5px"
  },
   bottomPane:{
     //border:"2px solid pink",
     marginTop:"2px",
     marginLeft:"2px",
  //   margin:"auto",
  //   alignItems:"center",
  //   display:"flex",
  //   justifyContent:"space-between",
  //   flexDirection:"row",
   },
   bottomTranxPane:{
    //border:"2px solid pink",
    marginTop:"2px",
    marginLeft:"2px",
 //   margin:"auto",
 //   alignItems:"center",
 //   display:"flex",
 //   justifyContent:"space-between",
 //   flexDirection:"row",
  },
  buttonCD:{
    backgroundColor:"#41b6ac",
    borderColor:"#41b6ac",
  },
  // card.hover :{
  //   transform: scale(1.03),
  //   box-shadow: 0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02),
  // }
}