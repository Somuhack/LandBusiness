import PageRouter from './router/PageRouter'
import { BrowserRouter } from 'react-router-dom'
const App = () => {
  return (
    <BrowserRouter><PageRouter/></BrowserRouter>
 
  )
}

export default App