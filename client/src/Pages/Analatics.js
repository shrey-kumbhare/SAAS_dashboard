import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { CSVLink } from "react-csv";

function Analytics() {
  const { authData, theme } = useAuth(); // Get theme from context
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/User", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.user._id}`,
          },
        });
        const data = await response.json();
        setUsers(data.User || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, [authData]);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const sortedUsers = useMemo(() => {
    if (sortConfig !== null) {
      return [...users].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue)
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValue > bValue)
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    return users;
  }, [users, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="p-6 flex flex-col gap-6">
          <div
            className={`bg-white p-4 rounded shadow-md ${
              theme === "dark" ? "bg-gray-800 text-white" : ""
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">User Data Analytics</h2>
            <input
              type="text"
              placeholder="Search by name or email..."
              className="mb-4 p-2 border rounded w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <table
              className={`w-full table-auto border-collapse border border-gray-200 ${
                theme === "dark" ? "text-white" : ""
              }`}
            >
              <thead>
                <tr>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    Name{" "}
                    {sortConfig?.key === "name" &&
                      (sortConfig.direction === "ascending" ? "▲" : "▼")}
                  </th>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => requestSort("email")}
                  >
                    Email{" "}
                    {sortConfig?.key === "email" &&
                      (sortConfig.direction === "ascending" ? "▲" : "▼")}
                  </th>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => requestSort("createdAt")}
                  >
                    Registration Date{" "}
                    {sortConfig?.key === "createdAt" &&
                      (sortConfig.direction === "ascending" ? "▲" : "▼")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers
                  .filter(
                    (user) =>
                      user.name.toLowerCase().includes(search) ||
                      user.email.toLowerCase().includes(search)
                  )
                  .map((user) => (
                    <tr key={user._id}>
                      <td className="border p-2">{user.name}</td>
                      <td className="border p-2">{user.email}</td>
                      <td className="border p-2">
                        {new Date(user.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <button
                className="p-2 bg-blue-500 text-white rounded"
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </button>
              <div>
                Page {currentPage} of {Math.ceil(users.length / rowsPerPage)}
              </div>
              <button
                className="p-2 bg-blue-500 text-white rounded"
                disabled={currentPage === Math.ceil(users.length / rowsPerPage)}
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </button>
            </div>
            <CSVLink
              data={users}
              headers={[
                { label: "Name", key: "name" },
                { label: "Email", key: "email" },
                { label: "Registration Date", key: "createdAt" },
              ]}
              filename="user_data.csv"
              className="mt-4 inline-block p-2 bg-green-500 text-white rounded"
            >
              Export CSV
            </CSVLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
