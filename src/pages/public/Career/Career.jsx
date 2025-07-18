import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import cross from "../../../assets/cross.svg";
import attachicon from "../../../assets/attachicon.png"; // or .png depending on your file
import { postApplication } from "../../../api/Public/postApplication";
import ApplicationFormNew from "../../../components/ApplicationFormNew";


const branches = ["CSE", "CS-AI", "CS-DS", "IT"];
const years = ["1st", "2nd", "3rd", "4th"];
const positions = [
  "Frontend Developer",
  "Backend Developer",
  "UI Designer",
  "Social Media Manager",
];

const Career = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const roles = [
    ["President", "Vice President"],
    ["Secretary", "Project Manager"],
    ["Technical Head", "Design Head"],
    ["Team Lead", "Developer"],
    ["Designer", "Trainee"],
  ];
  const [showModal, setShowModal] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    year: "",
    branch: "",
    enrollment: "",
    position: "",
    experience: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
    console.log("Resume attached:", e.target.files[0]);
  };

  const handleApply = async () => {
    setLoading(true);
    setFeedback("");
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));
    if (resumeFile) form.append("resume", resumeFile);
    try {
      await postApplication(form);
      setFeedback("Application submitted successfully!");
      setShowModal(false);
      setFormData({
        name: "",
        contact: "",
        email: "",
        year: "",
        branch: "",
        enrollment: "",
        position: "",
        experience: "",
      });
      setResumeFile(null);
      setSelectedBranch("");
      setSelectedYear("");
      setSelectedPosition("");
    } catch (error) {
      setFeedback("Failed to submit application. Please try again.");
      console.error("Application failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className=" text-white px-6 sm:px-20 py-24 font-sans">
        <h2 className="text-4xl font-bold mb-10  pb-4">Career At SDC</h2>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-white">
          {roles.map(([left, right], index) => (
            <React.Fragment key={index}>
              {/* Left Cell */}
              <div className="border-b md:border-r border-white px-4 py-6">
                <h3 className="text-lg font-semibold">{left}</h3>
                <p className="text-white/80 text-sm mt-1 font-mono leading-6">
                  Potter ipsum wand elf parchment wingardium. Trevor bagman
                  above he nagini tell is trevor.
                </p>
              </div>

              {/* Right Cell */}
              <div className="border-b border-white px-4 py-6">
                <h3 className="text-lg font-semibold">{right}</h3>
                <p className="text-white/80 text-sm mt-1 font-mono leading-6">
                  Potter ipsum wand elf parchment wingardium. Trevor bagman
                  above he nagini tell is trevor.
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h4 className="text-lg font-bold mb-2">
            Build More Than Code — Build a Better Future
          </h4>
          <p className="text-white/80 mb-4 mx-auto text-sm max-w-2xl font-mono leading-6">
            Join our team of innovators, problem-solvers, and changemakers. Your
            skills can drive real-world impact.
            <br />
            Ready to make a difference?
          </p>
          <button
            style={{
              boxShadow: "0px 6px 30px rgba(255, 255, 255, 0.1)",
            }}
            className="bg-[#AA1E6B] text-white font-semibold px-6 py-3 rounded-md transition"
            onClick={() => setShowModal(true)}
          >
            JOIN US NOW
          </button>
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
              {/* <ApplicationForm onSuccess={() => setShowModal(true)} onClose={() => setShowModal(false)} /> */}
              <ApplicationFormNew onSuccess={() => setShowModal(true)} onClose={() => setShowModal(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Career;
