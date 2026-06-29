import axios from "axios";
import React from "react";
import { useEffect } from "react";
import '../StyleSheets/PlacedStudentCard.css';
const PlacedStudentCard = ({detail})=>{

const viewResume=()=>{
window.open(`http://localhost:8080/uploads/offers/${detail.student.registerNumber}offer.pdf`)
}

return(
    <div className="placed-student-card">
    <p className="placed-student-info">{detail.student.firstName} {detail.student.lastName}</p>
    <p className="placed-student-info">{detail.student.departments}</p>
    <p className="placed-student-info">{detail.student.passedOutYear}</p>
    <p className="placed-student-info">{detail.company.companyName}</p>
    <p className="placed-student-info">{detail.placedstatus}</p>
    <button onClick={viewResume}>Offer letter</button>
    <button> Student Details  </button>
    </div>
)
}

export default PlacedStudentCard;