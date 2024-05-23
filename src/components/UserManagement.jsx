// src/components/UserManagement.jsx
import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Pagination } from "react-bootstrap";
import { fetchUsers, updateUser } from "../services/api/api.js";

const UserManagement = ({ setTotalUsers }) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [show, setShow] = useState(false);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const users = await fetchUsers();
                setUsers(users);
                setTotalUsers(users.length); // Truyền số lượng người dùng qua props
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        getUsers();
    }, [setTotalUsers]);

    const handleShow = (user) => {
        setEditUser(user);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleSave = async () => {
        try {
            await updateUser(editUser);
            setUsers(
                users.map((user) => (user.id === editUser.id ? editUser : user))
            );
            handleClose();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    };

    // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h2 className="mb-4">User Management</h2>
            <Table striped bordered hover responsive className="mb-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>IdCard</th>
                        <th>Phone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(currentUsers) &&
                        currentUsers.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.IdCard}</td>
                                <td>{user.phoneNumber}</td>
                                <td>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleShow(user)}
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>

            <div className="d-flex justify-content-center">
                <Pagination>
                    {Array.from(
                        { length: Math.ceil(users.length / usersPerPage) },
                        (_, index) => (
                            <Pagination.Item
                                key={index + 1}
                                active={index + 1 === currentPage}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </Pagination.Item>
                        )
                    )}
                </Pagination>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editUser?.name || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={editUser?.email || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>IdCard</Form.Label>
                            <Form.Control
                                type="text"
                                name="idCard"
                                value={editUser?.idCard || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={editUser?.phoneNumber || ""}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default UserManagement;
