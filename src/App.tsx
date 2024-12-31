import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import CreateAccount from "./pages/CreateAccount";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import SharedMainPage from "./pages/SharedMainPage";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="signup" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />
        <Route
          index
          element={
            <PrivateRouter>
              <MainPage />
            </PrivateRouter>
          }
        />
        <Route path="share/:uid" element={<SharedMainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
