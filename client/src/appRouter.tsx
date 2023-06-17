import { BrowserRouter, Routes, Route } from "react-router-dom";

// import component
import { URLEnum } from "./RouterEnum";
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ErrorPage from './pages/ErrorPage';
import Settings from './pages/Settings';
import Users from './pages/Users';
import Centers from './pages/Centers';
import OpenDemands from './pages/OpenDemands';
import Food from './pages/Food';
import ProductForm from './pages/forms/ProductForm';
import MainLayout from "./components/MainLayout";
import MyComponent from "./components/foodform";
import FoodDetail from "./pages/FoodDetail";
import DistributionPoint from "./pages/DistributionPoint";
import DistributionPointDetail from "./components/DistributionPointDetail";
import DistributionPointForm from "./pages/forms/DistributionPointForm";
import Demands from "./pages/Demands";
import DemandForm from "./pages/forms/DemandForm";
import Inventory from "./pages/Inventory";
import InventoryForm from "./pages/forms/InventoryForm";
import OpenDemandDetail from "./pages/OpenDemandDetail";
import CollectionPoint from "./pages/CollectionPoint";
import CollectionPointForm from "./pages/forms/CollectionPointForm";
import Transportation from "./pages/Transportation";
import Signup from "./pages/Signup";

export const routes =
<BrowserRouter>
    <Routes>
        <Route path = {URLEnum.BASE} element={<Home/>}/>
        <Route path = {URLEnum.LOGIN} element={<Login/>}/>
        <Route path = {URLEnum.SIGNUP} element={<Signup/>}/>
        <Route path = {URLEnum.HOME} element={ <MainLayout component={<Home />} /> } />
        <Route path = {URLEnum.DASHBOARD} element={ <MainLayout component={<Dashboard />} /> } />
        <Route path = {URLEnum.SETTINGS} element={ <MainLayout component={<Settings />} /> } />
        <Route path = {URLEnum.USERS} element={ <MainLayout component={<Users />} /> } />
        <Route path = {URLEnum.CENTERS} element={ <MainLayout component={<Centers />} /> } />
        <Route path = {URLEnum.DEMANDS} element={ <MainLayout component={<Demands />} /> } />
        <Route path = {URLEnum.DEMANDS_ADD} element={ <MainLayout component={<DemandForm />} /> } />
        <Route path = {URLEnum.OPEN_DEMANDS} element={ <MainLayout component={<OpenDemands />} /> } />
        <Route path = "/open-demands/:demandId" element={ <MainLayout component={<OpenDemandDetail />} /> } />
        <Route path = {URLEnum.FOOD} element={ <MainLayout component={<Food />} /> } />
        <Route path = {URLEnum.FOOD} element={ <MainLayout component={<Food />} /> } />
        <Route path = {URLEnum.FOOD_ADD} element={ <MainLayout component={<ProductForm />} /> } />
        <Route path = {URLEnum.DISTRIBUTION_POINT} element={ <MainLayout component={<DistributionPoint />} /> } />
        <Route path = {URLEnum.DISTRIBUTION_POINT_ADD} element={ <MainLayout component={<DistributionPointForm />} /> } />
        <Route path = {URLEnum.INVENTORY} element={ <MainLayout component={<Inventory />} /> } />
        <Route path = {URLEnum.INVENTORY_ADD} element={ <MainLayout component={<InventoryForm />} /> } />
        <Route path = {URLEnum.COLLECTION_POINT} element={ <MainLayout component={<CollectionPoint />} /> } />
        <Route path = {URLEnum.COLLECTION_POINT_ADD} element={ <MainLayout component={<CollectionPointForm />} /> } />
        <Route path = {URLEnum.TRANSPORTATION} element={ <MainLayout component={<Transportation />} /> } />
        <Route path= '*' element={<ErrorPage/>} />
    </Routes>
</BrowserRouter>