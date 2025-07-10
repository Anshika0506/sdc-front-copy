import { useState } from "react";

// Your custom icons (update these with actual imports)
import ViewIcon from "../../assets/resumeIcon.svg";
import DeleteIcon from "../../assets/deleteIcon.svg";
import ExportIcon from "../../assets/ExportIcon.svg";

// Dummy data array
const dummyApplications = [
  {
    date: "07/07/2025",
    name: "Berozgar Aadmi",
    contact: "1234567890",
    email: "berozgaraadmi@fakemail.com",
    year: "4th Year",
    branch: "CS- core",
    enrollment: "EN22CS3000000",
    position: "Social Media Manager",
    experience: "No Experience",
    resumeUrl: "#",
  },
  {
    date: "07/07/2025",
    name: "Berozgar Aadmi",
    contact: "1234567890",
    email: "berozgaraadmi@fakemail.com",
    year: "4th Year",
    branch: "CS- core",
    enrollment: "EN22CS3000000",
    position: "Social Media Manager",
    experience: "No Experience",
    resumeUrl: "#",
  },
];

export default function JoiningApplications() {
  const [applications, setApplications] = useState(dummyApplications);

  const handleDelete = (index) => {
    const updated = applications.filter((_, i) => i !== index);
    setApplications(updated);
  };

  // Export applications as CSV
  const handleExport = () => {
    if (applications.length === 0) return;
    const header = Object.keys(applications[0]).filter((key) => key !== "resumeUrl");
    const csvRows = [
      header.join(","),
      ...applications.map((app) => header.map((field) => `"${(app[field] || "").replace(/"/g, '""')}"`).join(",")),
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

      {/* Scrollable entries list */}
      <div
        className="flex-1 overflow-y-auto bg-black scrollbar-hide"
        style={{
          maxHeight: "60vh",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {/* Hide scrollbar for Webkit browsers */}
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}</style>
        {applications.map((app, index) => (
          <div
            key={index}
            className="bg-black border-t border-gray-700 px-6 py-6 flex flex-col sm:flex-row sm:justify-between gap-4"
          >
            <div className="flex-1 text-sm space-y-1">
              <p>
                <strong className="text-gray-400">Date:</strong> {app.date}
              </p>
              <p>
                <strong className="text-gray-400">Name:</strong> {app.name}
              </p>
              <p>
                <strong className="text-gray-400">Contact Number:</strong>{" "}
                <span className="font-semibold">{app.contact}</span>
              </p>
              <p>
                <strong className="text-gray-400">Email:</strong>{" "}
                <span className="text-sm">{app.email}</span>
              </p>
              <p>
                <strong className="text-gray-400">Year:</strong>{" "}
                <span className="font-semibold">{app.year}</span>
              </p>
              <p>
                <strong className="text-gray-400">Branch:</strong> {app.branch}
              </p>
              <p>
                <strong className="text-gray-400">Enrollment Number:</strong>{" "}
                {app.enrollment}
              </p>
              <p>
                <strong className="text-gray-400">Position:</strong>{" "}
                {app.position}
              </p>
              <p>
                <strong className="text-gray-400">Past Experiences:</strong>{" "}
                {app.experience}
              </p>

              <div className="flex gap-3 mt-4">
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white text-sm font-medium transition-all"
                >
                  <img src={ViewIcon} alt="View Resume" className="w-4 h-4" />
                  VIEW RESUME
                </a>
                <button
                  onClick={() => handleDelete(index)}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white border border-gray-500 px-4 py-2 rounded-lg text-sm"
                >
                  <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
                  DELETE
                </button>
              </div>
            </div>
          </div>
        ))}
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