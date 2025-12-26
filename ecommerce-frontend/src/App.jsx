import {HomePage} from "./pages/HomePage";
import {CheckoutPage} from "./pages/checkout/CheckoutPage.jsx";
import {OrdersPage} from "./pages/OrdersPage.jsx";
import {TrackingPage} from "./pages/TrackingPage.jsx";
import {NotFoundPage} from "./pages/404.jsx";
import "./App.css";
import {Route, Routes} from "react-router";

function App() {
    return (
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="/checkout" element={<CheckoutPage/>}/>
            <Route path="/orders" element={<OrdersPage/>}/>
            <Route path="/tracking" element={<TrackingPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default App;
