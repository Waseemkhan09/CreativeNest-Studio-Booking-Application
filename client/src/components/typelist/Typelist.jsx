import "./typelist.css"
import useFetch from "../../hooks/useFetch";
/*
const Typelist = () => {

  return (
    <div className="tlist">
      <div className="tlistItem">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQmYc5XAvV2thzMkwd3n67FPo6B0wXBRu0NA&s" alt="" className="plistImg" />
        <div className="plistTitle">
          <h1>Photography</h1>
          <h2>233 studios</h2>
        </div>
      </div>
      <div className="tlistItem">
        <img src="https://i.pinimg.com/736x/ce/83/b1/ce83b1b90a784a690a3aef9cfbc4be8f.jpg" alt="" className="plistImg" />
        <div className="plistTitle">
          <h1>Film & Video</h1>
          <h2>314 studios</h2>
        </div>
      </div>
      <div className="tlistItem">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrIp8fS4VRMyIBlv5aXveRCitchi9grTlenQ&s" alt="" className="plistImg" />
        <div className="plistTitle">
          <h1>Sound & Recording</h1>
          <h2>178 studios</h2>
        </div>
      </div>
      <div className="tlistItem">
        <img src="https://img.freepik.com/premium-photo/photo-contemporary-art-studio-creative-backdrop_611870-48431.jpg" alt="" className="plistImg" />
        <div className="plistTitle">
          <h1>Art & Creative</h1>
          <h2>265 studios</h2>
        </div>
      </div>
      <div className="tlistItem">
        <img src="https://images.pexels.com/photos/3467377/pexels-photo-3467377.jpeg?cs=srgb&dl=pexels-johnny-edgardo-guzman-258690-3467377.jpg&fm=jpg" alt="" className="plistImg" />
        <div className="plistTitle">
          <h1>Dance & Rehearsal</h1>
          <h2>190 studios</h2>
        </div>
      </div>
    </div>
  )
}

export default Typelist
*/
const Typelist = () => {
  const { data, loading, error } = useFetch("http://localhost:8800/api/studios/countByType");

  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQmYc5XAvV2thzMkwd3n67FPo6B0wXBRu0NA&s",
    "https://i.pinimg.com/736x/ce/83/b1/ce83b1b90a784a690a3aef9cfbc4be8f.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrIp8fS4VRMyIBlv5aXveRCitchi9grTlenQ&s",
    "https://img.freepik.com/premium-photo/photo-contemporary-art-studio-creative-backdrop_611870-48431.jpg",
    "https://images.pexels.com/photos/3467377/pexels-photo-3467377.jpeg?cs=srgb&dl=pexels-johnny-edgardo-guzman-258690-3467377.jpg&fm=jpg",
  ];
  return (
    <div className="tlist">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="tlistItem" key={i}>
                <img
                  src={img}
                  alt=""
                  className="plistImg"
                />
                <div className="plistTitle">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Typelist;