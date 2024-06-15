import { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Pagination, Input } from "antd";
import { fetchUsers, updateUser, addUser, deleteUser } from "@api/UserApi.js";
import { useSelector } from "react-redux";

const { Item: FormItem } = Form;
const { Column } = Table;
const { confirm } = Modal;

export const UserList = ({ setTotalUsers }) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);
    const [showEdit, setShowEdit] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        idCard: "",
        phoneNumber: "",
    });
  
    useEffect(() => {
        const getUsers = async () => {
            try {
                const users = await fetchUsers();
                setUsers(users);
                setTotalUsers(users.length); // Pass the number of users via props
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        getUsers();
    }, [setTotalUsers]);

    const handleShowEdit = (user) => {
        setEditUser(user);
        setShowEdit(true);
    };

    const handleShowAdd = () => {
        setNewUser({ name: "", email: "", idCard: "", phoneNumber: "" });
        setShowAdd(true);
    };

    const handleCloseEdit = () => setShowEdit(false);
    const handleCloseAdd = () => setShowAdd(false);

    const handleSaveEdit = async () => {
        try {
            await updateUser(editUser);
            setUsers(users.map((user) => (user.id === editUser.id ? editUser : user)));
            handleCloseEdit();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleSaveAdd = async () => {
        try {
            const addedUser = await addUser(newUser);
            setUsers([addedUser, ...users]); // Add new user to the beginning of the list
            setTotalUsers(users.length + 1); // Update the total number of users
            setCurrentPage(1); // Set current page to 1 to show the new user
            handleCloseAdd();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const showDeleteConfirm = (userId, userName) => {
        confirm({
            title: `Do you want to delete ${userName}?`,
            content: "This action cannot be undone.",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
                handleDelete(userId);
            },
        });
    };

    const handleDelete = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers(users.filter((user) => user.id !== userId));
            setTotalUsers(users.length - 1); // Update the total number of users
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    };

    const handleChangeAdd = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Get current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Button type="primary" onClick={handleShowAdd} className="mb-4">
                Add User
            </Button>
            <Table dataSource={currentUsers} rowKey="id" pagination={false} className="mb-4">
                <Column title="ID" dataIndex="id" key="id" />
                <Column title="Name" dataIndex="name" key="name" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="IdCard" dataIndex="IdCard" key="IdCard" />
                <Column title="Phone Number" dataIndex="phoneNumber" key="phoneNumber" />
                <Column
                    title="Actions"
                    key="actions"
                    render={(text, user) => (
                        <span>
                            <Button
                                type="primary"
                                onClick={() => handleShowEdit(user)}
                                className="mr-2"
                            >
                                Edit
                            </Button>
                            <Button
                                type="primary"
                                danger
                                onClick={() => showDeleteConfirm(user.id, user.name)}
                            >
                                Delete
                            </Button>
                        </span>
                    )}
                />
            </Table>

            <div className="d-flex justify-content-center">
                <Pagination
                    current={currentPage}
                    total={users.length}
                    pageSize={usersPerPage}
                    onChange={paginate}
                />
            </div>

            <Modal
                title="Edit User"
                visible={showEdit}
                onCancel={handleCloseEdit}
                onOk={handleSaveEdit}
            >
                <Form layout="vertical">
                    <FormItem label="Name">
                        <Input
                            type="text"
                            name="name"
                            value={editUser?.name || ""}
                            onChange={handleChangeEdit}
                        />
                    </FormItem>
                    <FormItem label="Email">
                        <Input
                            type="email"
                            name="email"
                            value={editUser?.email || ""}
                            onChange={handleChangeEdit}
                        />
                    </FormItem>
                    <FormItem label="IdCard">
                        <Input
                            type="text"
                            name="idCard"
                            value={editUser?.idCard || ""}
                            onChange={handleChangeEdit}
                        />
                    </FormItem>
                    <FormItem label="Phone Number">
                        <Input
                            type="text"
                            name="phoneNumber"
                            value={editUser?.phoneNumber || ""}
                            onChange={handleChangeEdit}
                        />
                    </FormItem>
                </Form>
            </Modal>

            <Modal
                title="Add User"
                visible={showAdd}
                onCancel={handleCloseAdd}
                onOk={handleSaveAdd}
            >
                <Form layout="vertical">
                    <FormItem label="Name">
                        <Input
                            type="text"
                            name="name"
                            value={newUser.name}
                            onChange={handleChangeAdd}
                        />
                    </FormItem>
                    <FormItem label="Email">
                        <Input
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleChangeAdd}
                        />
                    </FormItem>
                    <FormItem label="IdCard">
                        <Input
                            type="text"
                            name="idCard"
                            value={newUser.idCard}
                            onChange={handleChangeAdd}
                        />
                    </FormItem>
                    <FormItem label="Phone Number">
                        <Input
                            type="text"
                            name="phoneNumber"
                            value={newUser.phoneNumber}
                            onChange={handleChangeAdd}
                        />
                    </FormItem>
                </Form>
            </Modal>
        </div>
    );
};
