import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import BarChart from "../Chart/BarChart/BarChart";

const URL = "http://localhost:3000/factors/";
//Initialize a factor section
const Factor = ({ token }) => {
  const [year, setYear] = useState(null);
  const [data, setData] = useState(null);

  //Checking token for using factor
  const handleFind = async () => {
    if (!token) return;
    const data = await axios.get(URL + `${year}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setData(data.data);
  };
  //Creating table for factor
  let table = {
    columns: [
      { headerName: "Rank", field: "rank", filter: true, sortable: true },
      { headerName: "Country", field: "country", filter: true, sortable: true },
      { headerName: "Score", field: "score", filter: true, sortable: true },
      { headerName: "Economy", field: "eco", filter: true, sortable: true },
      { headerName: "Family", field: "family", filter: true, sortable: true },
      { headerName: "Health", field: "health", filter: true, sortable: true },
      { headerName: "Freedom", field: "free", filter: true, sortable: true },
      { headerName: "Generosity", field: "gene", filter: true, sortable: true },
      { headerName: "Trust", field: "trust", filter: true, sortable: true },
    ],
  };

  if (data && data.length) {
    table.rows = data;
  }

  console.log(data);

  return (
    <div className="rank">
      <div>
        <input
          placeholder="Enter year"
          value={year}
          onChange={(e) => {
            const year = e.target.value;
            setYear(year);
          }}
        />
        <button onClick={handleFind}>FIND VALUE</button>
        <div className="tabel ag-theme-balham ag-header-table-label">
          <AgGridReact
            columnDefs={table.columns}
            rowData={table.rows}
            pagination={true}
            overlayLoadingTemplate={
              !token
                ? "Please log in to use this feature"
                : "Start searching to use this feature"
            }
          />
        </div>
      </div>
      <div className="barCharts">
        {data &&
          table.columns.slice(3, table.columns.length).map((stat) => {
            return (
              <BarChart
                labels={data.map((data) => data.country)}
                dataInput={data.map(
                  (data) => data[stat.headerName.toLowerCase()]
                )}
                lableName={stat.headerName.toLowerCase()}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Factor;
