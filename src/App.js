import FurnitureManager from "./components/furniture-manager";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/home"
import { Link } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="store-management-header" >
          <div>
            <Link to="/">
              <i className="fas fa-2x fa-home float-right"></i>
            </Link>
          </div>
          <div className="circle">
            <span className="font-weight-bold">W</span>
          </div>
          <div className="row">
            <div className="col-12 text-center">
              <i className="heading-font"> Furniture Store Management By Tania Jebin</i>
            </div>
          </div>
          <div className="divider"></div>
          <div className="divider-green"></div>
          <div className="divider-blue "></div>
        </div>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/furnitures">
          <FurnitureManager />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;