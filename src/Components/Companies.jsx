import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CompanyCard from "../Cards/CompanyCard";
import SkeletonCard from "./SkeletonCard";

const API_BASE = "http://localhost:8080";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [filterType, setFilterType] = useState("");
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/getCompany`);
      setCompanies(Array.isArray(data) ? data : []);
    } catch {
      setError(
        "Could not connect to the server. Make sure your Spring Boot backend is running on port 8080."
      );
    } finally {
      setLoading(false);
    }
  };
const filteredCompanies=companies.filter((company)=>{
  const type = filterType.trim().toLowerCase();
  if(!type) return true;
  return(company.type || "").toLowerCase().includes(type);
})


const filterCompaniesFinal=filteredCompanies.filter((company)=>{
  const value = searchValue.trim().toLowerCase();
  if(!value) return true ;
  return(
    (
       (company.companyName|| "").toLowerCase().includes(value)||
       (company.branch||"").toLowerCase().includes(value)||
       String((company.lastHighestPackage||"")).toLowerCase().includes(value)

    )
  )
})

  const fetchByType = async (type) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`${API_BASE}/getCompanyByType/${type}`);
      setCompanies(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to filter companies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    if (filter === "ALL") fetchAll();
    else fetchByType(filter);
  };

  const handleViewDetails = (company) => {
    navigate(`/company/${company.id}`, { state: { company } });
  };

  return (
    <section id="companies" className="lp-companies">
      <div className="lp-section-inner">
        <div className="lp-section-tag">Company Listings</div>
        <h2 className="lp-section-heading">Explore Recruiting Companies</h2>
        <p className="lp-section-sub">
          All companies below are loaded live from our database — filter by type
          to discover the right opportunity for you.
        </p>

        <div className="lp-filter-bar">
          <select onChange={(e) => handleFilter(e.target.value)} className="search-box">
            <option className="search-box" value="ALL">All Company</option>
            <option className="search-box" value="IT">IT</option>
            <option className="search-box" value="CORE_CIVIL">Core Civil</option>
            <option className="search-box" value="CORE_MECH">Core Mechanical</option>
            <option className="search-box" value="CORE_EEE">Core Electrical</option>
          </select>
          

           <input
          type="text"
          className="search-box"
          placeholder="Search by company, branch, or package..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        </div>

        {loading && (
          <div className="lp-companies__grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="lp-state lp-state--error">
            <span className="lp-state__icon">⚠️</span>
            <p className="lp-state__title">Connection Error</p>
            <p className="lp-state__desc">{error}</p>
            <button
              className="lp-btn lp-btn--primary"
              onClick={() => handleFilter(activeFilter)}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && companies.length === 0 && (
          <div className="lp-state lp-state--empty">
            <span className="lp-state__icon">🏢</span>
            <p className="lp-state__title">No Companies Found</p>
            <p className="lp-state__desc">
              No companies match this filter right now. Try switching to a
              different category.
            </p>
            <button
              className="lp-btn lp-btn--ghost"
              onClick={() => handleFilter("ALL")}
            >
              Show All
            </button>
          </div>
        )}

        {!loading && !error && companies.length > 0 && (
          <>
            <div className="lp-companies__count">
              Showing <strong>{filterCompaniesFinal.length}</strong> companies
            </div>
            <div className="lp-companies__grid">
              {filterCompaniesFinal.map((c) => (
                <CompanyCard
                  key={c.id}
                  company={c}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </>
        )}

        {!loading && !error && companies.length > 0 && (
          <div className="lp-companies__cta">
            <button
              className="lp-btn lp-btn--primary"
              onClick={() => navigate("/companies")}
            >
              View Full Dashboard →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}