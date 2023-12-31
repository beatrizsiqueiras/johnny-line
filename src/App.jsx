import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Flowchart from "./pages/Flow/Flowchart";
import Navbar from "./components/Navbar/Navbar";

function App() {
    return (
        <div className='App'>
            <BrowserRouter>
                <Navbar />
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Flowchart />}></Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
