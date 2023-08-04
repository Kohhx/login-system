import React from 'react'
import { MdLanguage } from "react-icons/md";
import { useTranslation } from 'react-i18next';

const Language = ({divClassNames, iconClassNames}) => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleLanguageSwitch = () => {
    if (i18n.language === "en") {
      changeLanguage("ch");
    } else {
      changeLanguage("en");
    }
  }

  return (
    <div className={divClassNames}>
     <MdLanguage onClick={handleLanguageSwitch} className={`text-2xl hover:scale-110 cursor-pointer transition-all ${iconClassNames}`}/>
    </div>
  )
}

export default Language
