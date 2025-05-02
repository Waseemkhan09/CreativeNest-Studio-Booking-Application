import "./searchitem.css"
import { Link } from "react-router-dom";

const Searchitem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from centre</span>
        <span className="siSubtitle">Studio rooms with Air conditioning</span>
        <span className="isFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation</span>
        <span className="siCancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
      </div>
      <div className="siDetails">
      {item.rating ? (
       <div className="siRating">
         <span>Excellent</span>
         <button>{item.rating}</button>
       </div>
       ) : (
       <span>No ratings available</span>
      )}
        <div className="siDetailTexts">
          <span className="siprice">{item.cheapestPrice} Rs</span>
          <span className="siTaxOp">Inclusive of all taxes</span>
          <Link to={`/studios/${item._id}`}>
          <button className="siCheckBtn">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Searchitem