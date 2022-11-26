import react, { createContext, useState, useEffect } from "react";

export const DarkLightContext = createContext<any>([false, () => null]);

export default function DarkLightTheme(props: any) {
  return (
    <DarkLightContext.Provider value={props.value}>
      {props.children}
    </DarkLightContext.Provider>
  );
}
