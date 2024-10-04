
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./componet/Home"

import Navbar from './componet/Navbar';
import Dashbord from './adminComponets/Dashbord';
import Channel from './componet/Channel';
import Starts from './componet/Starts';
import AdminStars from './adminComponets/AdminStars'
import AdminTeraBox from './adminComponets/AdminTeraBox'
import AdminChannel from './adminComponets/AdminChannels'
import Indians from './componet/Indians';

import { SearchProvider } from './SearchContext';
import Hijabi from './componet/Hijabi';
import Popular from './componet/Popular';
import NewVideos from './componet/NewVideos';
import TopRate from './componet/TopRate';

function App() {
  


  return (
   <>

<SearchProvider>
   <Router>

   
    
    <Routes>
      
      <Route path='/' element={<Home/>}></Route>
        <Route path='/channels' element={<Channel/>}></Route>
      <Route path='/stars' element={<Starts/>}></Route>
      <Route path='/indian' element={<Indians/>}></Route>
       <Route path='/hijabi' element={<Hijabi/>}></Route>
      <Route path='/popularVideos' element={<Popular/>}></Route>
      <Route path='/newVideos' element={<NewVideos/>}></Route>
       <Route path='/toprated' element={<TopRate/>}></Route>
     {/* admin componets */}
     <Route path='/admin/aman' element={<Dashbord/>}></Route>
     <Route path='/admin/stars' element={<AdminStars/>}></Route>
     <Route path='/admin/terabox' element={<AdminTeraBox/>}></Route>
     <Route path='/admin/channels' element={<AdminChannel/>}></Route>
      



    </Routes>
   
   </Router>

   </SearchProvider>
   </>
  );
}

export default App;
