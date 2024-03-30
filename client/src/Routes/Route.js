import {createBrowserRouter, useNavigate} from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Home from "../components/Home";
import Stay from "../components/Stay";
import CreateTrip from "../components/CreateTrip";
import Addexpensess from "../components/Addexpensess";
import Fuel from "../components/Fuel";
import Food from "../components/Food";
import Shooping from "../components/Shooping";
import Other from "../components/Other";


const Route = createBrowserRouter([
    // {
    //     path:'//',
    //     element: <Login/>
    // },
    {
        path:"/register",
        element: <Register/>
    },
    // {
    //     path:"/",
    //     element:<Home/>
    // },
    {
        path:"/createnewtrip",
        element:<CreateTrip/>
    },
    {
        path:"/",
        element:<Addexpensess/>
    },
    {
        path:"/stay",
        element:<Stay/>
    },
    {
        path:"/fuel",
        element:<Fuel/>
    },
    {
        path:"/food",
        element:<Food/>
    },
    {
        path:"/shopping",
        element:<Shooping/>
    },
    {
        path:"/other",
        element:<Other/>
    },

])

export default Route