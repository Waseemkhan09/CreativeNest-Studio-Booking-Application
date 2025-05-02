import "./studio.css"
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark, faLocation } from "@fortawesome/free-solid-svg-icons"
import MailList from "../../components/MailList/MailList"
import Footer from "../../components/footer/Footer"
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons/faCircleArrowLeft"
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons/faCircleArrowRight"
import { useState, useContext } from 'react';
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";

const Studio = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const { data, loading, error } = useFetch(`http://localhost:8800/api/studios/find/${id}`);

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

/*
  const photos = [
    {
      src: "https://i.pinimg.com/236x/4c/2d/f5/4c2df539de719f980f5a5030525428ee.jpg"
    },
    {
      src: "https://i.pinimg.com/236x/39/15/82/391582d69cd942bc72a7a241bc327ffe.jpg"
    },
    {
      src: "https://i.pinimg.com/236x/d9/f2/64/d9f264a0d2695961edef79d67e40795b.jpg"
    },
    {
      src: "https://i.pinimg.com/236x/73/63/66/7363666f622fc11469a337dc8c7c4d29.jpg"
    },
    {
      src: "https://i.pinimg.com/236x/0a/b2/85/0ab2850c40ede55b8d33dec1111c230d.jpg"
    },
    {
      src: "https://i.pinimg.com/236x/a5/93/65/a59365084e9aed6548b3813e15c27fc1.jpg"
    },
  ];
*/

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  }

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else{
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  return (
    <div>
      <Navbar/>
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
      <div className="hotelContainer">
        {open && <div className="slider">
           <FontAwesomeIcon icon={faCircleXmark}  className="close" onClick={()=>setOpen(false)} />
           <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")} />
           <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
           </div>
           <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")} />
        </div>}
        <div className="hotelWrapper">
        <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocation}/>
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location - {data.distance} m from centre
          </span>
          <span className="hotelPrice"> 
             Book a studio for over ₹{data.cheapestPrice} and get access to all equipments for your session
          </span>
          <div className="hotelImg">
          {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImage"
                  />
                </div>
              ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsText">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">{data.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days} Days creative session</h1>
              <span>Located in the heart of {data.city}, this studio boasts an excellent location rating of 9.8, making it ideal for your next photoshoot.</span>
              <h2>
                <b>{days * data.cheapestPrice * options.room} Rs</b>({days}{" "}
                  Days)
              </h2>
              <button>Reserve or book now!</button>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
      </div>
       )}
    </div>
  )
}

export default Studio