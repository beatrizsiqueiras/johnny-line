import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Flowchart from "./pages/Flow/Flowchart";
import About from "./pages/About/About";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Flowchart />}></Route>
                        <Route path='/about' element={<About />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
