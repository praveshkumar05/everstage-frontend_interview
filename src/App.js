import CardCustom from "./component/card.js"
import { Delayed } from "./component/delayed.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = ()=>{
    return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path= '/' element = {<CardCustom/>}/>
          <Route path="/blogs/:id" element={<Delayed />} />
        </Routes>
      </BrowserRouter>
        
      </>
    )
}

export default App;