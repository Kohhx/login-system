import React from "react";
import { useTranslation } from "react-i18next";
import Card from "../components/shared/Card";
import "./ManagerRestricted.css";

const ManagerRestricted = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)]">
      <h1 className="text-6xl mb-8 down-animate">{t('Welcome')}, {t('Manager')}</h1>
      <div className=" down-animate2 opacity-0">
        <Card>
          <div className="text-xl">
            <h1>{t('This is a secret announcement to all managers.')}</h1>
            <h1>
              {t('The managers retreat will be held in Hawaii from 9th Aug - 15th Aug.')}
            </h1>
            <h1>{t('Shh....')}.🤫</h1>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ManagerRestricted;
