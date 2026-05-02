import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import CompanyCard from "../Cards/CompanyCard";
//fmcytion to search the company

function SearchFunction({ searchValue, Company }) {
    return Company.filter((item) =>
        item.CompanyName.toLowerCase().includes(searchValue.toLowerCase));
}

//MAin components to show
function ShowCompany() {


    const [searchValue, setSearchValue] = useState("");


    const [companies, setCompanies] = useState([]);

    const getCompanies = async () => {
        try {
            const res = await axios.get("http://localhost:8080/getCompany");
            setCompanies(res.data);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    }

    useEffect(() => {
        getCompanies();
    }, []);

    return (
        <div>
            <input
                id="search"
                type="text"
                className="Search-box"
                placeholder="search for Company......"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
                    
            {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
            ))}

        </div>
    )

}



export default ShowCompany;