import { useState } from "react";

export default function useSessionVariables() {

  const getAllSessionVariables = () => {
      const allVariableList = ["access_token", "username"];
      let dummyObject = {};
      let outputString = "";
      for (let i=0; i<allVariableList.length; i++){
        outputString = sessionStorage.getItem(allVariableList[i]); // Replace sessionStorage to localStorage for using localStorage

      
        if (outputString == null){
            continue;
        }
        outputString = JSON.parse(outputString);
        dummyObject[allVariableList[i]] = outputString[allVariableList[i]];
      }
      console.log("dummyObject:",dummyObject)
      return dummyObject;
  }

  const [sessionVariables, setSessionVariables] = useState(getAllSessionVariables());

  const saveSessionVariableByField = (field, value) => {
    sessionStorage.setItem(field, JSON.stringify(value));
    setSessionVariables({
        ...sessionVariables,
        [field]: value,
    });
  }

  const saveSessionVariableByObject = (objectToSave) => {
    let dummyObject = {};
    for (let key in objectToSave){
      dummyObject = {
        [key]:  objectToSave[key]
      }
      sessionStorage.setItem(key, JSON.stringify(dummyObject));
    }
    setSessionVariables({
        ...sessionVariables,
        ...objectToSave,
    });
  }

  return {
    sessionVariables,
    saveSessionVariableByField,
    saveSessionVariableByObject
  };
}