import React, { useState } from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import "./list.css"
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns';
import { DateRange } from 'react-date-range'
import Searchitem from "../../components/searchItem/Searchitem"
import useFetch from "../../hooks/useFetch";

const List = () => {

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `http://localhost:8800/api/studios?city=${destination}&min=${min || 0 }&max=${max || 999}`
  );
  
  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar/>
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Your's peference</label>
              <input type="text" placeholder={destination} />
            </div>
            <div className="lsItem">
              <label htmlFor="">Booking Dates</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
             {openDate && ( 
              <DateRange
                onChange={(item) => setDates([item.selection])}
                minDate={new Date()}
                ranges={dates}
              />
              )}
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="lsOptions">
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Min price <small>per day</small>
                </span>
                <input type="number" onChange={(e) => setMin(e.target.value)} className='lsOptionInput' />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Max price <small>per day</small>
                </span>
                <input type="number" onChange={(e) => setMax(e.target.value)} className='lsOptionInput' />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Person
                </span>
                <input type="number" min={1} className='lsOptionInput' placeholder={options.adult} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Assistance
                </span>
                <input type="number" min={0} className='lsOptionInput' placeholder={options.children} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Studio room
                </span>
                <input type="number" min={1} className='lsOptionInput' placeholder={options.room} />
              </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
          {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <Searchitem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List