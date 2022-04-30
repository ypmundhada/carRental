import React,{useState,useEffect} from "react";
import {useLocation,useNavigate} from 'react-router'
import {Card,Button} from 'react-bootstrap'
import Axios from 'axios';
import {GiCarSeat,GiGasPump} from "react-icons/gi";
import {FcEngineering} from "react-icons/fc";
import {VscAccount} from "react-icons/vsc";

function TransactionPage(){
    const {state}=useLocation();
    const {userDetails,car_id,pickDt,dropDt,cust_id} = state;
    const {f_name,l_name,email,mobile,city}=userDetails;
    const [disable,setDisable]=useState(false);
    const [carName,setCarName] = useState('');
    const [fuelType,setFuelType] = useState('');
    const [carType,setCarType] = useState('');
    const [transmission,setTransimission] = useState('');
    const [seats,setSeats] = useState('');
    const [weekDayC,setWeekDayC] = useState(0);
    const [weekEndC,setWeekEndC] = useState(0);
    const [totalC,setTotalC] = useState(0);
    const [numCars,setNumCars] = useState(0);
    const [paymentAmt,setPaymentAmt] = useState(0);
    const [trxnId,setTrxnId] = useState(null);
    // const [cust_id,setCustId] = useState(0);
    const navigate=useNavigate();
    const [imgSrc,setImgSrc]=useState('');
    function handleSignOutButton()
  {
    navigate('/logIn');
  }
    useEffect(() => {
        // Axios.get("http://localhost:3001/custId",{
        //     params:{
        //         email:email,
        //         mobile:mobile
        //     }
        // }).then((response) => {
        //     setCustId(response.data[0].custId);
        // })

        Axios.get("http://localhost:3001/car",{
            params:{
                car_id:car_id
            }
        }).then((response) => {
            // console.log(response.data[0][0]);
            setCarName(response.data[0][0].name);
            setCarType(response.data[0][0].carType);
            setFuelType(response.data[0][0].fuel_type);
            setTransimission(response.data[0][0].transmission);
            setSeats(response.data[0][0].seats);
        })
        Axios.get("http://localhost:3001/getPrice",{
            params:{
                car_id:car_id,
                pickDt:pickDt,
                dropDt:dropDt
            }
        }).then((response) => {
            setWeekDayC(response.data[1][0].weekdayCharges);
            setWeekEndC(response.data[1][0].weekendCharges);
            setTotalC(response.data[1][0].totalCost);
        })
        Axios.get("http://localhost:3001/carAvl",{
            params:{
                car_id:car_id,
                city:city
            }
        }).then((response) => {
            setNumCars(response.data[0].numCars);
            setNumCars((state) => {
                return state;
            });
            if(numCars===0){
                setDisable(true);
            }
        })

        switch(car_id) {
            case 100:
              setImgSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkR528mnkuazs_RlihF2BLdRUrA2QIGyF9ig&usqp=CAU");
              break;
            case 101:
              setImgSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPTXYOJCG-NmDxyu_Rzo6oO5OMgCdRWgTkkA&usqp=CAU");
              break;
            case 102:
              setImgSrc("https://media.istockphoto.com/photos/red-generic-sedan-car-isolated-on-white-background-3d-illustration-picture-id1189903200?k=20&m=1189903200&s=612x612&w=0&h=L2bus_XVwK5_yXI08X6RaprdFKF1U9YjpN_pVYPgS0o=");
              break;
            case 103:
              setImgSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1S-KiBHZbQDegLNp9tLw6hx2wjMIt0OGQ6g&usqp=CAU");
              break;
            case 104:
              setImgSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRutjHIfq823Gf-xa0JI5qRmHlH07Lyh_Vxgg&usqp=CAU");
              break;
            case 105:
              setImgSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw2JJ86pEHsL4dD9uifJXmmIgKDrkMcheK9w&usqp=CAU");
              break;
            case 106:
              setImgSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkg9rSSzMPEB09jLBnrxJG92_Z7vBgXd3OFA&usqp=CAU");
              break;
            case 107:
              setImgSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7b64sdxZUT_VPIiWevOQB1akBpYD6fT350A&usqp=CAU");
              break;
            case 108:
              setImgSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrwSTp-flzVkDlPSPuNMMlTZ0DIGJQVp1RJQ&usqp=CAU");
              break;
            case 109:
              setImgSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdoVsXFPzdmc1cSYZERF4l6xPqaC3B-I4fpw&usqp=CAU");
              break;
            case 110:
              setImgSrc("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTca6M8fjjSJ-RxjVE3c6sWnvzyZFaQMjhS5w&usqp=CAU");
              break;
          
        } 
    },[])
    function handlePayButtonClick()
    {
        
        Axios.post("http://localhost:3001/booking",{
            cust_id:cust_id,
            location:city,
            car_id:car_id,
            pickDt:pickDt,
            dropDt:dropDt,
            rentalCost:totalC
        }).then((response) => {
            console.log(response);
            if(response.data.message.errno == '1644'){
                alert("Sorry, no cars available, Please join the waitlist.");
                window.location.reload();
            } 
            else{
                alert("Payment Successful.");
            }
        }).catch((err) => {
            alert("Sorry, no cars available, Please join the waitlist.")
            console.log(err);
        })
    }
    function handleWaitButtonClick()
    {
        Axios.post("http://localhost:3001/waitlist",{
            cust_id:cust_id,
            location:city,
            car_id:car_id,
            pickDt:pickDt,
            dropDt:dropDt,
            rentalCost:totalC
        }).then((response) => {
            console.log("done");
        })
        alert("You are added to the waitlist, visit again to check your status.");
    }
    return(
        <div>
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
          } variant="secondary" onClick={handleSignOutButton}>Sign out</Button>
          </div>
      </div>
        <div style={styles.fullPage}>
        <div style={styles.carDetArea}>
        <div style={styles.cardContainer}>
        <h3>{carName}</h3>
        <div style={styles.carInfo}>
            <h6><GiGasPump/>{fuelType}</h6>
            <h6><FcEngineering/>{transmission}</h6>
            <h6><GiCarSeat/> {seats} Seater</h6>
        </div>
        <p style={{color:"#7a8a9b", fontSize:"12px"}}>Note: This image is for representation purpose only. The colour of the actual vehicle may differ.</p>
        <div style={styles.dates}>
        <p>Pick up Date: {pickDt}</p>
        <p>Drop Date: {dropDt}</p>
        </div>
        <div style={styles.guide}>
        <h6 style={{color:"a9a9a9"}}>Guidelines & Policies.</h6>
        <p style={{color:"#7a8a9b", fontSize:"15px"}}>Please carry your original driving license along with an additional ID proof when you come to pick up your vehicle.</p>
        <p style={{color:"#7a8a9b", fontSize:"15px"}}>Your license must be verified by our system before you start your trip or else your trip will be cancelled.</p>
        </div>
        </div>
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            width:"35%"
        }}>
        <div style={styles.image} >
            <img style={
                {
                    resizeMode:"contain", 
                    flex:"1",
                    width:"100%",
                    height:"250px"
                }
                    } src={imgSrc} />
        </div>
        </div>
        </div>


        <div style={styles.paymentArea}>
            <div style={{width:"100%"}}>
            <div style={{display:"flex",justifyContent:"center",padding:"5px",margin:"5px",borderBottom:"1px ridge grey"}}>
            <h5>Fare Details</h5>
            </div>
            <div style={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center",borderBottom:"1px ridge grey",padding:"5px",margin:"5px"}}>
                <div style={{display:"flex", flexDirection:"row",justifyContent:"space-around",alignItems:"center",width:"100%"}}>
                <p>WeekDay Charges</p>
                <p>{weekDayC}</p>
                </div>
                <div style={{display:"flex", flexDirection:"row",justifyContent:"space-around",alignItems:"center",width:"100%"}}>
                <p>WeekEnd Charges</p>
                <p>{weekEndC}</p>
                </div>
            </div>
            <div style={{display:"flex", flexDirection:"row",justifyContent:"space-around",alignItems:"center",padding:"5px",margin:"5px"}}>
            <p>Total Charges</p>
            <p>{totalC}</p>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
            <p style={{color:"#7a8a9b", fontSize:"15px"}}>This price is rounded off and is inclusive of GST.</p>
            </div>
            <div style={styles.buttons}>
        <Button disabled={!numCars} variant="primary" onClick={e=>handlePayButtonClick()}>Pay Now</Button>
        <Button disabled={numCars} variant="primary" onClick={e=>handleWaitButtonClick()}>Wait List</Button>
        </div>
            <></>
        </div>
        </div>
        </div>
        </div>
    );
}
export default TransactionPage;


const styles={
    topBar:{
        width:"100%",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        height:"50px",
        marginBottom:"10px",
        backgroundColor:"#f15d61"
        //border:"2px solid blue"
      },
    fullPage:{
        display:"flex",
        flexDirection:"row",
    },
    card:{
        width:'22rem',
        //border:"2px solid pink"
    },
    carDetArea:{
        display:"flex",
        flexDirection:"row",
        width:"65%",
        padding:"5px"
    },
    cardContainer:{
        padding:"2px",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        //border:"2px solid green",
        width:"65%"
        
    },
    carInfo:{
        margin:"10px",
        width:"100%",
        display:"flex",
        borderBottom:"1px ridge grey",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center"
    },
    dates:{
        margin:"10px",
        display:"flex",
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around",
        borderBottom:"1px ridge grey"
    },
    image:{
        aligSelf:"center",
        height:"65%",
        display:"flex",
        //border:"2px solid black",
        //width:"35%",
        justifyContent:"center",
        //boxShadow: "2px 2px 10px 2px #888888",
    },
    paymentArea:{
        //border:"2px solid purple",
        width:"35%",
        flexDirection:"column",
        display:"flex",
        flex:"1",
        alignItems:"center",
        boxShadow: "2px 2px 10px 2px #888888",
        borderRadius:"5px",
        marginRight:"10px"
    },
    guide:{
        margin:"10px",
        padding:"10px"
    },
    buttons:{
        display:"flex",
        justifyContent:"space-evenly",
        padding:"5px",
        margin:"5px",
    }
} 
