import Navbar from "../../components/navbar/Navbar"
import Header from "../../components/header/Header"
import Feature from "../../components/feature/Feature"
import Typelist from "../../components/typelist/Typelist"
import Lovestudio from "../../components/lovestudio/Lovestudio"
import MailList from "../../components/MailList/MailList"
import Footer from "../../components/footer/Footer"
import "./home.css"

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
         <Feature/>
         <h1 className="homeTitle">Browse by Studio type</h1>
         <Typelist/>
         <h1 className="homeTitle">Studios Previous users loved</h1>
         <Lovestudio/>
         <MailList/>
         <Footer/>
      </div>
    </div>
  )
}

export default Home