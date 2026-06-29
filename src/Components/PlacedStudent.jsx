import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import PlacedStudentCard from "../Cards/PlacedStudentCard";
import "../StyleSheets/PlacedStudent.css"
const PlacedStudent =()=>{
const[details , setDetails]=useState([]);
    const getPlacedStudents=async()=>{
        try{
            const res = await axios.get("http://localhost:8080/getPlacedStudents")
            console.log(res.data);
            setDetails(res.data);
            
        } catch (error) {
            console.error("Error fetching placed students:", error);
        }
    };

    useEffect(()=>{
        getPlacedStudents();
    }, []);

return(
    <>
    <h1>Placed Students</h1>
    <div className="placed-students-header">
        <p className="placed-students-heading">Name</p>
        <p className="placed-students-heading">Branch</p>
        <p className="placed-students-heading">Batch</p>
        <p className="placed-students-heading">Company</p>
        <p className="placed-students-heading">Status</p>
        <p className="placed-students-heading">Offer Letter</p>
        <p className="placed-students-heading">Details</p>
    </div>
   { details.map((detail)=> (
        <PlacedStudentCard key={detail.id} detail={detail} />
    ))}
    </>
)
}


export default PlacedStudent;