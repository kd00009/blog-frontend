import "./App.css";
import AllRoutes from "./Routes/AllRoutes";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <AllRoutes />
    </>
  );
}

export default App;
