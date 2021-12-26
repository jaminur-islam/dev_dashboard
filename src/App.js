import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./component/context/AuthContext";
import Admin from "./component/Dashboard/Admin";
import Login from "./component/Login/Login/Login";
import Register from "./component/Login/Register/Register";
import PrivetRoute from "./component/PrivetRoute/PrivetRoute";
import ProductsUpload from "./component/ProductsUpload/ProductsUpload";
import Catalog from "./component/TextDashborad/Catalog/Catalog";
import Order from "./component/TextDashborad/Order/Order";

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivetRoute>
                <Admin></Admin>
              </PrivetRoute>
            }
          >
            <Route path="/" element={<Order />} />
            <Route path="/dashboard/catalog" element={<Catalog />} />
            <Route path="/dashboard/upload" element={<ProductsUpload />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
