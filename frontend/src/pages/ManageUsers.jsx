import React, { useEffect, useState } from "react";
import { UserAPI } from "../api/UserAPI";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { useTranslation } from "react-i18next";

import "./ManageUser.css";
import Modal from "../components/shared/Modal";
import Signup from "../components/ProfileManage";

const ManageUsers = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [user, setUser] = useState({});

  const getAllUsers = () => {
    UserAPI.getAllUsers().then((data) => {
      setUsers(data);
    });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDeleteUser = (id) => {
    UserAPI.deleteUser(id).then(() => {
      toast.success("User deleted successfully");
      getAllUsers();
    });
  };

  return (
    <div className="w-[80%] mx-auto mt-8">
      <h1 className="text-5xl font-bold mb-6">{t("Manage All Users")}</h1>
      <div className="rounded shadow-lg">
        <table className="table-auto w-full user-table">
          <thead className="text-left bg-black text-white">
            <tr>
              <th>{t("No.")}</th>
              <th>{t("First Name")}</th>
              <th>{t("Last Name")}</th>
              <th>{t("User Name")}</th>
              <th>{t("Role")}</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <>
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.username}</td>
                  <td>
                    {user.roles
                      .map((role) => role.split("_")[1].toLowerCase())
                      .join(", ")}
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setUser(user);
                        setIsUpdateModalOpen(true);
                      }}
                      className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <FaUserEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>

      <CSSTransition
        in={isUpdateModalOpen}
        timeout={250}
        classNames="fadedown" // Classes for css transition in index.css
        unmountOnExit
      >
        <Modal isOpen={true} closeModal={() => setIsUpdateModalOpen(false)}>
          <MdCancel
            className="absolute top-[-10px] right-[-10px] text-3xl cursor-pointer"
            onClick={() => setIsUpdateModalOpen(false)}
          />
          <Signup
            header="Profile"
            type="editManager"
            data={user}
            handleModal={setIsUpdateModalOpen}
            loadUser={getAllUsers}
          />
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default ManageUsers;
