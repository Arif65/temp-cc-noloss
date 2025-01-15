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
  const [recordsPerPage, setRecordsPerPage] = useState(10); // Default records per page
  const [totalRecords, setTotalRecords] = useState(0); // Total number of records
  const [currentRecord, setCurrentRecord] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/archive/${id}`);
        const userRecords = response.data.filter((record) => record.id === id);
        setRecords(userRecords); // Set filtered records
        setTotalRecords(userRecords.length); // Set total number of records
      } catch (error) {
        console.error("Error fetching user records:", error);
        alert("Failed to fetch user records. Please try again.");
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    if (id !== "N/A") {
      fetchRecords(); // Fetch records only if `id` is valid
    }
  }, [id]);

  // Pagination Logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle change of records per page
  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value)); // Update the records per page
    setCurrentPage(1); // Reset to first page when records per page change
  };

  const handlePlay = (record) => {
    setCurrentRecord(record);
  };

  const handleDelete = async (recordId, topic, label) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this record?");
    alert(`${id}
      ${topic}
      ${label}`)
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
    <div>
      <Header pageName={pageName} userId={id} userName={name} />

      {loading ? (
        <p>Loading records...</p>
      ) : (
        <>
          {records.length > 0 ? (
            <div>
              <div className="mb-4">
                <label htmlFor="recordsPerPage" className="mr-2">Records per page: </label>
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

              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">SL</th>
                    <th className="border px-4 py-2">Label</th>
                    <th className="border px-4 py-2">Topic</th>
                    <th className="border px-4 py-2">Input</th>
                    <th className="border px-4 py-2">Target</th>
                    <th className="border px-4 py-2">Verdict</th>
                    <th className="border px-4 py-2">Saved Time</th>
                    <th className="border px-4 py-2">Play</th>
                    <th className="border px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRecords.map((record, index) => (
                    <tr key={record._id}>
                      <td className="border px-4 py-2">{indexOfFirstRecord + index + 1}</td>
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
            </div>
          ) : (
            <p>No records found for this user.</p>
          )}

          {/* Pagination Controls */}
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
              disabled={currentPage * recordsPerPage >= records.length}
              className="px-4 py-2 bg-gray-300 rounded-r"
            >
              Next
            </button>
          </div>
        </>
      )}

      {currentRecord && (
        <Replay
          record={currentRecord}
          onClose={() => setCurrentRecord(null)} // Close the replay modal
        />
      )}
    </div>
  );
};

export default UserPage;