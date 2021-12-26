import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./component/context/AuthContext";
import Admin from "./component/Dashboard/Admin";
import EnhancedTable from "./component/Dashboard/Table";
import TableHeading from "./component/Dashboard/TableHeading";
import Login from "./component/Login/Login/Login";
import Register from "./component/Login/Register/Register";
import PrivetRoute from "./component/PrivetRoute/PrivetRoute";
import ProductsUpload from "./component/ProductsUpload/ProductsUpload";
import Catalog from "./component/TextDashborad/Catalog/Catalog";

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
            <Route
              path="/"
              element={
                <>
                  {" "}
                  <TableHeading></TableHeading>
                  <EnhancedTable></EnhancedTable>
                </>
              }
            />
            <Route path="/dashboard/catalog" element={<Catalog />} />
            <Route path="/dashboard/upload" element={<ProductsUpload />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>not found page</h1>} />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  );
}

export default App;
