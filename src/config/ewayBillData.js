import React, { useEffect } from "react";
import { SERVER_URL } from "../config/config.js";
export async function fetchData() {
    let eway={eway_bill_no,ewb_date,amount};
    let result = await fetch(SERVER_URL+"/eway/db/", {
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaHJ1bWlsIiwiZXhwIjoxNjc0MTI4NjE4fQ.Xjap98FKni8_IV1iICM1yWWq1UWoaTvZhDwmqg1aOEY"
      },
      body: JSON.stringify(eway)
    });
    try {
      result=await result.json();
      localStorage.setItem("eway-data", JSON.stringify(result));
      } catch(err) {
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchData();
    console.log("Data is fetched successfully!");
  },[]);