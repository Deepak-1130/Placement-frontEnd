import React from "react"

function SearchFunction({searchValue,searchData}) {

    return searchData.filter((item)=>
    item.CompanyName.toLowerCase().includes(searchValue.toLowerCase));
}
