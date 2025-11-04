import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPosts from './pages/AllPosts';
// import AddArticle from "./pages/AddArticle";
import EditArticle from "./pages/EditArticle";
// import Preview from "./pages/Preview";
import Navbar from "./components/Navbar";

export default function AppRoutes() {
    return(
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<AllPosts />} />
                {/* <Route path="/add" element={<AddArticle />} /> */}
                <Route path="/edit/:id" element={<EditArticle />} />
                {/* <Route path="/preview" element={<Preview />} /> */}
            </Routes>
        </BrowserRouter>
    );
}