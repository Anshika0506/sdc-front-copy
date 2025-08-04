import { useEffect, useState } from "react";
import { getAllApplications, deleteApplicationById } from "../../api/Admin/ApplicationForm.js";

import ViewIcon from "../../assets/icons/resumeIcon.svg";
import DeleteIcon from "../../assets/icons/deleteIcon.svg";
import ExportIcon from "../../assets/icons/ExportIcon.svg";

export default function JoiningApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await getAllApplications();
      console.log("Response from API:", res.data);

      const apps = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];

      setApplications(apps);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setApplications([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteApplicationById(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  const handleExport = () => {
    if (!Array.isArray(applications) || applications.length === 0) return;

    const header = Object.keys(applications[0]).filter((key) => key !== "resume_path");
    const csvRows = [
      header.join(","),
      ...applications.map((app) =>
        header.map((field) => `"${(app[field] || "").replace(/"/g, '""')}"`).join(",")
      ),
    ];
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "joining_applications.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen text-white p-4 sm:p-6 flex flex-col">
      <div className="bg-[#8E8E8E] text-white rounded-t-xl px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Joining Application Entries</h2>
        <div className="flex gap-2 items-center text-sm">
          <span>Page</span>
          <button className="px-3 py-1 bg-gray-200 text-black rounded-md text-xs font-medium">
            People
          </button>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto bg-black scrollbar-hide"
        style={{ maxHeight: "60vh", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

        {!Array.isArray(applications) || applications.length === 0 ? (
          <div className="px-6 py-6 text-gray-400">No applications found.</div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="bg-black border-t border-gray-700 px-6 py-6 flex flex-col sm:flex-row sm:justify-between gap-4"
            >
              <div className="flex-1 text-sm space-y-1">
                {/* If you add submitted_at column in DB, uncomment this */}
                {/* <p><strong className="text-gray-400">Date:</strong> {app.submitted_at}</p> */}
                <p><strong className="text-gray-400">Name:</strong> {app.name}</p>
                <p><strong className="text-gray-400">Contact Number:</strong> {app.contactNumber}</p>
                <p><strong className="text-gray-400">Email:</strong> {app.email}</p>
                <p><strong className="text-gray-400">Year:</strong> {app.year}</p>
                <p><strong className="text-gray-400">Branch:</strong> {app.branch}</p>
                <p><strong className="text-gray-400">Enrollment Number:</strong> {app.enrollmentNumber}</p>
                <p><strong className="text-gray-400">Position:</strong> {app.position}</p>
                <p><strong className="text-gray-400">Past Experiences:</strong> {app.pastExperience}</p>

                <div className="flex gap-3 mt-4">
                  <a
                    href={app.resume_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all"
                  >
                    <img src={ViewIcon} alt="View Resume" className="w-4 h-4" />
                    VIEW RESUME
                  </a>
                  <button
                    onClick={() => handleDelete(app.id)}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white border border-gray-500 px-4 py-2 rounded-lg text-sm"
                  >
                    <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div
        className="px-6 py-4 flex justify-end rounded-b-xl border-t border-gray-700"
        style={{ background: "rgba(48, 48, 48, 0.60)" }}
      >
        <button
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm border border-gray-600"
          onClick={handleExport}
        >
          <img src={ExportIcon} alt="Export" className="w-4 h-4" />
          EXPORT AS FILE
        </button>
      </div>
    </div>
  );
}
