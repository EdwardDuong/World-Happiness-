import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import finland from "../Images/findland_cap.jpg";
import denmark from "../Images/denmark.jpg";
import norway from "../Images/norway.jpg";
import switzerland from "../Images/swizerland.jpg";
import { useHistory } from "react-router-dom";

//Create a extra infor(Pic) for the top country
const returnCountryImage = (country = "finland") => {
  const countryDic = {
    finland,
    denmark,
    norway,
    switzerland,
  };

  return countryDic[country];
};
//Initialize a ranking function
const Ranking = ({ searching }) => {
  const [year, setYear] = useState("2020");
  const [displaySearch, setDisplaySearch] = useState(false);
  const [rankings, setRankings] = useState(null);
  const history = useHistory();
  const fetchApi = () => {
    axios.get(`http://localhost:3000/rankings?year=${year}`).then((res) => {
      +(res.data);
    });
  };

  //Handle the selected year
  const handleYear = (e) => {
    setYear(e.target.value);
  };
  useEffect(() => {
    fetchApi();
  }, [year]);

  useEffect(() => {
    searching && setDisplaySearch(true);
  }, [searching]);

  //Creating table for ranking data
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

  console.log(history.location.pathname);

  return (
    <div className="ranking" style={{ height: "600px", width: "800px" }}>
      <div>
        <select onChange={handleYear}>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
          <option>2019</option>
          <option>2020</option>
        </select>
        {rankings && (
          <>
            <h2 style={{ color: "white", margin: "0", padding: "0" }}>
              TOP 1: {rankings[0].country}
            </h2>
            <h3 style={{ color: "white", margin: "0", padding: "0" }}>
              Find out more:{" "}
              <a
                href={`https://en.wikipedia.org/wiki/${rankings[0].country}`}
              >{`https://en.wikipedia.org/wiki/${rankings[0].country}`}</a>
            </h3>
          </>
        )}
        <div className="tabel ag-theme-balham ag-header-table-label">
          <AgGridReact
            columnDefs={table.columns}
            rowData={table.rows}
            pagination={true}
          />
        </div>
      </div>
      <img
        src={returnCountryImage(rankings && rankings[0].country.toLowerCase())}
        style={{ width: "700px", height: "600px" }}
      />
    </div>
  );
};

export default Ranking;
