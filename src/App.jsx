import React, { useState } from "react";
import UserManagement from "./components/UserManagement";
import Dashboard from "./components/Dashboard";
import { Nav, Navbar, Container } from "react-bootstrap";

function App() {
    const [page, setPage] = useState("dashboard");
    const [totalUsers, setTotalUsers] = useState(0); // Khởi tạo totalUsers

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="#">Jewelry Auction Admin</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => setPage("dashboard")}>
                            Dashboard
                        </Nav.Link>
                        <Nav.Link onClick={() => setPage("users")}>
                            User Management
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            {page === "dashboard" && <Dashboard totalUsers={totalUsers} />}{" "}
            {/* Truyền totalUsers vào Dashboard */}
            {page === "users" && (
                <UserManagement setTotalUsers={setTotalUsers} />
            )}{" "}
            {/* Truyền setTotalUsers vào UserManagement */}
        </div>
    );
}

export default App;
