import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Replay from "./Replay";

const UserPage = () => {
  const location = useLocation();
  const { id, name } = location.state || { id: "N/A", name: "N/A" };
  const [pageName] = useState("User Page");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [filters, setFilters] = useState({
    label: "",
    topic: "",
    input: "",
    target: "",
    verdict: "",
    createdAt: "",
  });

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/archive/${id}`);
        const userRecords = response.data.filter((record) => record.id === id);
        setRecords(userRecords);
        setTotalRecords(userRecords.length);
      } catch (error) {
        console.error("Error fetching user records:", error);
        alert("Failed to fetch user records. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id !== "N/A") {
      fetchRecords();
    }
  }, [id]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const filteredRecords = records.filter((record) => {
    return Object.keys(filters).every((key) => {
      if (!filters[key]) return true;
      return record[key]?.toString().toLowerCase().includes(filters[key].toLowerCase());
    });
  });

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (sortConfig.direction === "ascending") {
      return aValue > bValue ? 1 : -1;
    } else if (sortConfig.direction === "descending") {
      return aValue < bValue ? 1 : -1;
    }
    return 0;
  });

  const currentRecords = sortedRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePlay = (record) => setCurrentRecord(record);

  const handleDelete = async (recordId, topic, label) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this record?");
    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/archive/${id}/${topic}/${label}`);
        if (response.status === 200) {
          setRecords(records.filter((record) => record._id !== recordId));
          alert("Record deleted successfully!");
        } else {
          alert("Failed to delete record. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting record:", error);
        alert("An error occurred while deleting the record.");
      }
    }
  };

  return (
    <>
    <Header pageName={pageName} userId={id} userName={name} />
    
    <div className="min-h-screen flex flex-col items-center">

      {loading ? (
        <p>Loading records...</p>
      ) : (
        <div className="w-11/12 mt-6">
          {records.length > 0 ? (
            <>
              <div className="mb-4 text-center">
                <label htmlFor="recordsPerPage" className="mr-2">
                  Records per page:
                </label>
                <select
                  id="recordsPerPage"
                  value={recordsPerPage}
                  onChange={handleRecordsPerPageChange}
                  className="px-2 py-1 border rounded"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={totalRecords}>All</option>
                </select>
              </div>

              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">SL</th>
                    {["label", "topic", "input", "target", "verdict", "createdAt"].map((column) => (
                      <th
                        key={column}
                        className="border px-4 py-2 cursor-pointer"
                        onClick={() => handleSort(column)}
                      >
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                      </th>
                    ))}
                    <th className="border px-4 py-2">Play</th>
                    <th className="border px-4 py-2">Delete</th>
                  </tr>
                  <tr>
                    {["", "label", "topic", "input", "target", "verdict", "createdAt"].map((key, index) => (
                      <th key={index} className="border px-4 py-2">
                        {key ? (
                          <input
                            type="text"
                            placeholder={`Search ${key}`}
                            value={filters[key] || ""}
                            onChange={(e) => handleFilterChange(key, e.target.value)}
                            className="px-2 py-1 border rounded w-full"
                          />
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((record, index) => (
                    <tr key={record._id}>
                      <td className="border px-4 py-2 text-center">{indexOfFirstRecord + index + 1}</td>
                      <td className="border px-4 py-2">{record.label}</td>
                      <td className="border px-4 py-2">{record.topic}</td>
                      <td className="border px-4 py-2">{JSON.stringify(record.input)}</td>
                      <td className="border px-4 py-2">{record.target}</td>
                      <td className="border px-4 py-2">{record.verdict}</td>
                      <td className="border px-4 py-2">{new Date(record.createdAt).toLocaleString()}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handlePlay(record)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Play
                        </button>
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleDelete(record._id, record.topic, record.label)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-center mt-4">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 rounded-l"
                >
                  Prev
                </button>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage * recordsPerPage >= sortedRecords.length}
                  className="px-4 py-2 bg-gray-300 rounded-r"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <p className="text-center">No records found for this user.</p>
          )}
        </div>
      )}

      {currentRecord && <Replay record={currentRecord} onClose={() => setCurrentRecord(null)} />}
    </div>
    </>
  );
};

export default UserPage;