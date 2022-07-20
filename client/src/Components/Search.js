import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import LineChart from "./LineChart/LineChart";
//Initialize the searching function
const Search = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [rankings, setRankings] = useState(null);
  //Request data from api
  const fetchApi = () => {
    axios
      .get(`http://localhost:3000/rankings?country=${search}`)
      .then((res) => {
        setRankings(res.data);
      });
    axios.get("http://localhost:3000/countries").then((res) => {
      setCountries(res.data);
    });
  };

  //Handle search
  const handleCountryChange = (e) => {
    if (e.target.value === "All") return setSearch("");
    setSearch(e.target.value);
  };
  useEffect(() => {
    fetchApi();
  }, [search]);

  //Create a table to contain all the data
  let table = {
    columns: [
      { headerName: "Rank", field: "rank", filter: true, sortable: true },
      { headerName: "Country", field: "country", filter: true, sortable: true },
      { headerName: "Score", field: "score", filter: true, sortable: true },
      { headerName: "Year", field: "year", filter: true, sortable: true },
    ],
  };

  if (rankings && rankings.length) {
    table.rows = rankings;
  }
  console.log(rankings);

  return (
    <div className="ranking" style={{ height: "600px", width: "800px" }}>
      <div>
        <select name="cars" id="cars" onChange={handleCountryChange}>
          <option>All</option>
          {countries.map((con) => (
            <option>{con}</option>
          ))}
        </select>
        <input onChange={(event) => setSearch(event.target.value)} />
        <div className="tabel ag-theme-balham ag-header-table-label">
          <AgGridReact
            columnDefs={table.columns}
            rowData={table.rows}
            pagination={true}
          />
        </div>
      </div>
      {rankings && rankings.length && (
        <LineChart
          labels={rankings.map((data) => data.year).slice(0, 6)}
          dataInput={rankings.map((data) => data.rank).slice(0, 6)}
          lableName={rankings[0].country}
        />
      )}
    </div>
  );
};

export default Search;
