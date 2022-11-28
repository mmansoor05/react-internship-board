// import logo from './logo.svg';
import './App.css';
import{ BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { useState } from "react"
import Header from './components/Header';
import Body from './components/Body';
import Table from './components/Table';
import Footer from './components/Footer';

function App() {
  const [active, setActive] = useState("card");

  return (
    <div className="App">
        <Header/>
      <button id="btn" className="btn-primary" onClick={() => setActive("card")}>Card</button>
      <button id="btn" className="btn-primary" onClick={() => setActive("table")}>Table</button>
      <div>
        {active === "card" && <Body/>}
        {active === "table" && <Table/>}
      </div> 
      <Footer/>
    </div>
  );
}

export default App;
