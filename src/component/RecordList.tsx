import React, { useState, useEffect } from "react";
import "./record.css";

interface TableRow {
  name: string;
  company: string;
  status: string;
  notes: string;
  lastUpdate: string;
}
interface Props {
  isOpen: Boolean;
}
function RecordList(Props: Props) {
  const [data, setData] = useState<TableRow[]>([]);
  const [filteredData, setFilteredData] = useState<TableRow[]>([]);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("tableData") || "[]");
    setData(storedData);
  }, [Props.isOpen]);

  useEffect(() => {
    const lowercasedFilter = filterValue.toLowerCase();
    const filtered = data.filter(
      (row) =>
        row.name.toLowerCase().includes(lowercasedFilter) ||
        row.company.toString().includes(lowercasedFilter) ||
        row.status.toLowerCase().includes(lowercasedFilter) ||
        row.notes.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredData(filtered);
  }, [filterValue, data]);

  const handleDeleteRow = (index: number) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    localStorage.setItem("tableData", JSON.stringify(updatedData));
  };
  const [selectedcompany, setSelectedcompany] = useState<string[]>([]);
  const [selectedstatus, setSelectedstatus] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

  useEffect(() => {
    const filtered = data.filter((row) => {
      const companyInRange =
        selectedcompany.length === 0 ||
        selectedcompany.includes(row.company.toString());
      const statusMatches =
        selectedstatus.length === 0 ||
        selectedstatus.includes(row.status.toString());
      return companyInRange && statusMatches;
    });

    setFilteredData(filtered);
  }, [selectedcompany, selectedstatus, data, sortBy]);
  const clearFilter = () => {
    setSelectedstatus([]);
    setSelectedcompany([]);
  };
  const uniqueStatus = Array.from(
    new Set(filteredData.map((item) => item.status.toString()))
  );
  const uniquecompany = Array.from(
    new Set(filteredData.map((item) => item.company.toString()))
  );

  const companyOptions = uniquecompany.map((item) => {
    return <option value={item}>{item}</option>;
  });
  const StatusOptions = uniqueStatus.map((item) => {
    return <option value={item}>{item}</option>;
  });
  return (
    <div className="RecordList">
      <br />
      <div>
        <select
          value={selectedcompany}
          onChange={(e) =>
            setSelectedcompany(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          <option value="">Company</option>
          {companyOptions}
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSelectedstatus(
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
        >
          <option value="">Status</option>
          {StatusOptions}
        </select>
        <button className="floatRight" onClick={() => clearFilter()}>
          Reset Filter
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>company</th>
            <th>status</th>
            <th>Last Update</th> <th>notes</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td></td>
              <td>{row.name}</td>
              <td>{row.company}</td>

              <td>{row.status}</td>

              <td>{row.lastUpdate}</td>
              <td>{row.notes}</td>

              <td>
                <button onClick={() => handleDeleteRow(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordList;
