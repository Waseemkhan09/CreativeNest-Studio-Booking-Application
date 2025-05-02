import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./header.css"
import { faCamera, faHandshakeAngle, faHotel, faMicrophone, faPerson, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react';
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from "date-fns"
import { useNavigate } from 'react-router-dom';
import { SearchContext } from "../../context/SearchContext";
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

const Header = ({type}) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room:1,
  })

  const navigate = useNavigate()
  const { user } = useContext(AuthContext);

  const handleOption =(name, operation) => {
    setOptions((prev) =>{
      return {
        ...prev,
        [name] : operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/studio", { state: { destination, dates, options } });
  };

  return (
    <div className={type === "list" ? "header listmode" : "header"}>
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
      <div className="headerList">
        <div className="headerListItem active">
          <FontAwesomeIcon icon={faMicrophone} />
          <span>Studio</span>
        </div>
        <div className="headerListItem">
          <FontAwesomeIcon icon={faHotel} />
          <span>Accommodation</span>
        </div>
        <div className="headerListItem">
          <FontAwesomeIcon icon={faCamera} />
          <span>Equipment Rentals</span>
        </div>
        <div className="headerListItem">
          <FontAwesomeIcon icon={faUsers} />
          <span>Workshops & Events</span>
        </div>
        <div className="headerListItem">
          <FontAwesomeIcon icon={faHandshakeAngle} />
          <span>Production Assistance</span>
        </div>
       </div>
       { type !== "list" &&
         <>
        <h1 className="headerTitle">Find the Perfect Studio for Your Next Creative Project!</h1>
       <p className="headerDesc">Stand out from the crowd—unlock exclusive studio access with CreativeNest today!</p>
       {!user && <button className="headerBtn">Sign in / Register</button>}
       <div className="headerSearch">
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faMicrophone} className="headerIcon" />
          <input type="text" placeholder='Pick a Studio for you' className='headerSearchInput' onChange={e=>setDestination(e.target.value)}/>
        </div>
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
          <span onClick={()=>setOpenDate(!openDate)} className="headerSearchText">{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
          {openDate && <DateRange
            editableDateInputs={true}
            onChange={(item) => setDates([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dates}
            className="date"
            minDate={new Date()}
          />}
        </div>
        <div className="headerSearchItem">
          <FontAwesomeIcon icon={faPerson} className="headerIcon" />
          <span onClick={()=>setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} Person . ${options.children} Assistance . ${options.room} room`}</span>
        </div>
        {openOptions && <div className="options">
          <div className="optionItem">
            <span className="optionText">Person</span>
            <div className="optionCounter">
            <button disabled={options.adult <= 1} className="optionCounterButton" onClick={()=>handleOption("adult", "d")}>-</button>
            <span className="optionCounterNumber">{options.adult}</span>
            <button className="optionCounterButton" onClick={()=>handleOption("adult", "i")}>+</button>
            </div>
          </div>
          <div className="optionItem">
            <span className="optionText">Assistance</span>
            <div className="optionCounter">
            <button disabled={options.children <= 0} className="optionCounterButton" onClick={()=>handleOption("children", "d")}>-</button>
            <span className="optionCounterNumber">{options.children}</span>
            <button className="optionCounterButton" onClick={()=>handleOption("children", "i")}>+</button>
            </div>
          </div>
          <div className="optionItem">
            <span className="optionText">room</span>
            <div className="optionCounter">
            <button disabled={options.room <= 1} className="optionCounterButton" onClick={()=>handleOption("room", "d")}>-</button>
            <span className="optionCounterNumber">{options.room}</span>
            <button className="optionCounterButton" onClick={()=>handleOption("room", "i")}>+</button>
            </div>
          </div>
        </div>}
        <div className="headerSearchItem">
          <button className="headerBtn1" onClick={handleSearch}>Search</button>
        </div>
       </div></>}
      </div>
    </div>
  )
}

export default Header