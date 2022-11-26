import React, { useEffect, useState, useContext } from "react";
import { DarkLightContext } from "../../context/darkContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";
function ToggleLightDark() {
  const [dark, setDark] = useContext(DarkLightContext);
  function toggle() {
    if (localStorage.getItem("dark") === "true") {
      setDark(false);
      localStorage.setItem("dark", "false");
    } else {
      setDark(true);
      localStorage.setItem("dark", "true");
    }
  }
  return (
    <button onClick={toggle} className={"text-3xl transition-all"}>
      {dark ? (
        <MdDarkMode className="text-white" />
      ) : (
        <MdLightMode className="text-yellow-400" />
      )}
    </button>
  );
}

export default ToggleLightDark;
