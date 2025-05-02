import "./lovestudio.css"
import useFetch from "../../hooks/useFetch";

const Lovestudio = () => {
  const { data, loading, error } = useFetch("http://localhost:8800/api/studios?featured=true");
  /*
  return (
    <div className="love">
      <div className="lsItem0">
      <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQWcA5DQLpQBo23rOdr2De65VZGz2rl73IB875t9HyVGj0_Kr2Uls87h5wymTmQ" alt="image" className="loveImg" />
      <span className="lsName">Photography Studio</span>
      <span className="lsCity">Mumbai</span>
      <span className="lsPrice">Starting from 1200 Rs</span>
      <div className="lsRating">
        <button>8.9</button>
        <span>Good enough</span>
      </div>
      </div>
      <div className="lsItem0">
      <img src="https://www.shutterstock.com/image-photo/closeup-operator-using-professional-camera-600nw-2284241581.jpg" alt="image" className="loveImg" />
      <span className="lsName">Videography Studio</span>
      <span className="lsCity">Nashik</span>
      <span className="lsPrice">Starting from 1450 Rs</span>
      <div className="lsRating">
        <button>9.0</button>
        <span>Excellent</span>
      </div>
      </div>
      <div className="lsItem0">
      <img src="https://lightroom-photoshop-tutorials.com/wp-content/uploads/2021/08/The-Complete-Journey-of-Studio-Photography.webp" alt="image" className="loveImg" />
      <span className="lsName">Photography Studio</span>
      <span className="lsCity">Pune</span>
      <span className="lsPrice">Starting from 1500 Rs</span>
      <div className="lsRating">
        <button>8.6</button>
        <span>Good</span>
      </div>
      </div>
      <div className="lsItem0">
      <img src="https://img.freepik.com/premium-photo/music-producer-hightech-sound-studio-concept-music-production-hightech-equipment-sound-engineering-creative-workflow-studio-setup_918839-172015.jpg" alt="image" className="loveImg" />
      <span className="lsName">Recording Studio</span>
      <span className="lsCity">Mumbai</span>
      <span className="lsPrice">Starting from 3000 Rs</span>
      <div className="lsRating">
        <button>9.2</button>
        <span>Excellent</span>
      </div>
      </div>
    </div>
  )
}
*/
return (
  <div className="love">
    {loading ? (
      "Loading"
    ) : (
      <>
        {data.map((item) => (
          <div className="lsItem0" key={item._id}>
            <img
              src={item.photos[0]}
              alt=""
              className="loveImg"
            />
            <span className="lsName">{item.name}</span>
            <span className="lsCity">{item.city}</span>
            <span className="lsPrice">Starting from {item.cheapestPrice} Rs</span>
            {item.rating && <div className="lsRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>}
          </div>
        ))}
      </>
    )}
  </div>
);
};

export default Lovestudio