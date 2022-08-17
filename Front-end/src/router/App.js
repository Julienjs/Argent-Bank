import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Profil from "../pages/Profil";
import Transactions from "../pages/Transactions";
import Error from "../pages/Error";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/transaction/:id" element={<Transactions />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
