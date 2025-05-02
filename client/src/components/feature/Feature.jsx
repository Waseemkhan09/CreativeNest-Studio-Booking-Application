import "./feature.css"
import useFetch from "../../hooks/useFetch";

const Feature = () => {
  const { data, loading, error } = useFetch("http://localhost:8800/api/studios/countByCity?cities=mumbai,pune,banglore");

  return (
    <div className="feature">
      {loading ? (
        "Loading please wait"
      ) : (
        <><div className="featureItem">
        <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/cc7e228979287.560c66ace2191.jpg" alt="" className="featureImg" />
        <div className="featureTitle">
          <h1>Mumbai</h1>
          <h2>{data[0]} Studios</h2>
        </div>
      </div>
      <div className="featureItem">
        <img src="https://img.freepik.com/premium-photo/pune-mumbai-city-view_980700-19.jpg" alt="" className="featureImg" />
        <div className="featureTitle">
          <h1>Pune</h1>
          <h2>{data[1]} Studios</h2>
        </div>
      </div>
      <div className="featureItem">
        <img src="https://thumbs.dreamstime.com/b/painting-beautifully-captures-essence-bangalore-featuring-bustling-city-center-harmonious-mix-historic-323024333.jpg" alt="" className="featureImg" />
        <div className="featureTitle">
          <h1>Banglore</h1>
          <h2>{data[2]} Studios</h2>
        </div>
      </div>
      </>)}
    </div>
  )
}

export default Feature