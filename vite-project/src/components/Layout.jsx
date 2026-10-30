import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith('/admin');

    return (
        <div className="layout-container">
            {!isAdminPage && <Header />}
            <main style={!isAdminPage ? { paddingTop: '90px' } : {}}>
                <Outlet />
            </main>
            {!isAdminPage && <Footer />}
        </div>
    );
}
