import './App.css';
import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar.jsx';
import ProcessedInvoices from './pages/ProcessedInvoices/ProcessedInvoices.jsx';
import FailedInvoices from './pages/FailedInvoices/FailedInvoices.jsx';
import ItemsManagement from './pages/ItemsManagement/ItemsManagement.jsx';
import Branches from "./pages/Branches/Branches.jsx";

function App() {
    const location = useLocation();

    return (
        <div>
            {location.pathname !== '/' && <Navbar />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/processed-invoices" element={<ProcessedInvoices />} />
                <Route path="/failed-invoices" element={<FailedInvoices />} />
                <Route path="/items-management" element={<ItemsManagement />} />
                <Route path="/branches" element={<Branches />} />
            </Routes>
        </div>
    );
}

export default App;
