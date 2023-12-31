import React, { useEffect, useState } from "react";
import { UserAPI } from "../api/UserAPI";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaArrowRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";

import "./Welcome.css";
import Signup from "../components/ProfileManage";
import Modal from "../components/shared/Modal";

const Welcome = () => {
  const { t } = useTranslation();
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    setLoading(true);
    UserAPI.getUserInfo().then((userData) => {
      setUserDetails(userData);
      setLoading(false);
    });
  }

  const getRoles = () => {
    const rolesArray = userDetails.roles?.map((role) => {
      return role.split("_")[1].toLowerCase();
    });
    if (rolesArray) {
      return rolesArray.join(", ");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)]">
      {loading ? (
        <div className="text-6xl">Loading</div>
      ) : (
        <>
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
              <Signup header="Edit User" type="edit" data={userDetails} loadUser={getUserInfo} handleModal={setIsUpdateModalOpen}/>
            </Modal>
          </CSSTransition>
          <Card classNames="relative">
            {userDetails && (
              <>
                <Button
                  name={t("Edit")}
                  classNames="w-[20%] absolute bottom-[40px] right-[40px]"
                  onClick={() => setIsUpdateModalOpen(true)}
                />
                <h1 className="text-5xl">
                  {t("Welcome")}, {userDetails.firstName} {userDetails.lastName}{" "}
                  <span>&#x1F44B;</span>
                </h1>
                <div className="mt-5">
                  <p className="text-xl mb-1">
                    <span className="font-bold">{t("First Name")}</span> :{" "}
                    {userDetails.firstName}
                  </p>
                  <p className="text-xl mb-1">
                    <span className="font-bold">{t("Last Name")}</span>:{" "}
                    {userDetails.lastName}
                  </p>
                  <p className="text-xl mb-1">
                    <span className="font-bold">{t("User Name")}</span> :{" "}
                    {userDetails.username}
                  </p>
                  <p className="text-xl mb-1">
                    {userDetails?.roles?.length > 1 ? (
                      <span className="font-bold">{t("Roles")}</span>
                    ) : (
                      <span className="font-bold">{t("Role")}</span>
                    )}
                    :<span> {getRoles()}</span>
                  </p>
                </div>
              </>
            )}
          </Card>
          {userDetails.roles?.includes("ROLE_MANAGER") && (
            <div className="flex gap-3 items-center mt-10 text-[3rem]">
              <FaArrowRight className="arrow-animate" />
              <Link to="/manager">Manager Site</Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Welcome;
