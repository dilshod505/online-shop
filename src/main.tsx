import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainHeader from "./components/main-header.tsx";
import Cart from "./pages/Cart.tsx";
import Footer from "./components/footer.tsx";
import Favourites from "./pages/Favourites.tsx";
import {ReducerContextProvider} from "./use-context/reducer-context.tsx";
import Categories from "./pages/categories/categories.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CategoryId from "./pages/categories/category-id.tsx";
import New from "./pages/New.tsx";
import Suppliers from "./pages/Suppliers.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ReducerContextProvider>
                <MainHeader/>
                <Routes>
                    <Route path={'/'} element={<App/>}/>
                    <Route path={'/cart'} element={<Cart/>}/>
                    <Route path={'/new'} element={<New/>}/>
                    <Route path={'/suppliers'} element={<Suppliers/>}/>
                    <Route path={'/favourites'} element={<Favourites/>}/>
                    <Route path={'/categories'} element={<Categories/>}/>
                    <Route path={'/categories/:slug'} element={<CategoryId/>}/>
                </Routes>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />

                <Footer/>
            </ReducerContextProvider>
        </BrowserRouter>
    </StrictMode>,
)
