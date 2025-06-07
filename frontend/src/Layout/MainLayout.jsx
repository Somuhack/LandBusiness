import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const MainLayout = ({children}) => {
  return (
   <>
   <Navbar/>
   {children}
   <footer style={{position:"relative",top:"150px"}} >
    <Footer/>
   </footer>
   </>
  )
}

export default MainLayout