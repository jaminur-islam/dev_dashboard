import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContext from "./component/context/AuthContext";
import Login from "./component/Login/Login/Login";
import Register from "./component/Login/Register/Register";
import PrivetRoute from "./component/PrivetRoute/PrivetRoute";
import AdminDashboard from "./component/Dashboard/Dashboard/AdminDashboard";
import TableHeading from "./component/Dashboard/OrderTable/TableHeading";
import EnhancedTable from "./component/Dashboard/OrderTable/Table";
import ProductsUpload from "./component/Dashboard/ProductsUpload/ProductsUpload";
import Catalog from "./component/Dashboard/Catalog/Catalog";
import ManageProducts from "./component/Dashboard/ManageProducts/ManageProducts";
import UpdateProduct from "./component/Dashboard/UpdateProduct/UpdateProduct";

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivetRoute>
                <AdminDashboard></AdminDashboard>
              </PrivetRoute>
            }
          >
            <Route
              path="/"
              element={
                <>
                  <TableHeading></TableHeading>
                  <EnhancedTable></EnhancedTable>
                </>
              }
            />
            <Route path="/dashboard/catalog" element={<Catalog />} />

            <Route
              path="/dashboard/productManage"
              element={<ManageProducts />}
            />
            <Route
              path="/dashboard/productManage/:id"
              element={<UpdateProduct />}
            />
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
