import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/HomePage";
import Stops from "./Pages/Stops";
import RoutesPage from "./Pages/Routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/stops" element={<Stops />} />
      <Route path="/routes" element={<RoutesPage />} />
    </Routes>
  );
}
export default App;