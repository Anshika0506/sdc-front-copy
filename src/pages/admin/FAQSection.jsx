import React, { useState, useEffect } from "react";
import { getFAQs } from '../../api/Admin/FAQSection/getFAQs';
import { addFAQ } from '../../api/Admin/FAQSection/addFAQs';
import { updateFAQ } from '../../api/Admin/FAQSection/updateFAQs';
import { deleteFAQ } from '../../api/Admin/FAQSection/deleteFAQs';
// Use your own icons here:
import EditIcon from "../../assets/edit.svg"; // or ReactComponent
import DeleteIcon from "../../assets/deleteIcon.svg";
import cross from "../../assets/cross.svg";
import PlusButton from "../../assets/PlusButton.svg";
import deleteIcon from "../../assets/deleteIcon.svg";
import RightIcon from "../../assets/RightIcon.svg";

// Dynamic FAQ page: fetch, add, update, delete from backend


const FAQs = () => {
  const [faqList, setFaqList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editFaqs, setEditFaqs] = useState([]); // for editing

  // Fetch all FAQs on mount
  useEffect(() => {
	fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
	setLoading(true);
	try {
	  const res = await getFAQs();
	  // Backend returns { success, message, data: [faqs] }
	  setFaqList(res.data || []);
	} catch (e) {
	  setFaqList([]);
	} finally {
	  setLoading(false);
	}
  };

  // Open edit modal with current faqs
  const handleEdit = () => {
	setEditFaqs(faqList.map(faq => ({ ...faq })));
	setIsEditing(true);
  };

  // Save all edits (bulk update and add)
  const handleSave = async () => {
	await Promise.all(editFaqs.map(async (faq) => {
	  const ques = faq.ques ?? faq.question;
	  const ans = faq.ans ?? faq.answer;
	  if (faq.id) {
		// Existing FAQ: update
		await updateFAQ(faq.id, { ques, ans });
	  } else if (ques && ans) {
		// New FAQ: add only if both fields are filled
		await addFAQ({ ques, ans });
	  }
	}));
	setIsEditing(false);
	fetchFaqs();
  };

  // Add new FAQ (just adds a blank row for editing, API call happens on save)
  const handleAddNew = () => {
	setEditFaqs([...editFaqs, { ques: '', ans: '' }]);
  };

  // Delete individual FAQ (calls backend)
  const handleDelete = async (id) => {
	await deleteFAQ(id);
	setEditFaqs(editFaqs.filter(faq => faq.id !== id));
	fetchFaqs();
  };

  // Delete all FAQs (calls backend for each)
  const handleDeleteAll = async () => {
	await Promise.all(faqList.map(faq => deleteFAQ(faq.id)));
	fetchFaqs();
  };

  return (
	<div className="w-full h-full text-white p-4 sm:p-6 flex flex-col">
			{/* Header */}
			<div className="bg-[#8E8E8E] text-white rounded-t-xl px-6 py-4 flex justify-between items-center">
				<h2 className="text-xl font-semibold">FAQ's</h2>
				<div className="flex gap-2 items-center text-sm">
					<span>Page</span>
					<button className="px-3 py-1 bg-gray-200 text-black rounded-md text-xs font-medium cursor-pointer">
						Contact
					</button>
				</div>
			</div>

			{/* Scrollable FAQ list */}
			<div
				className="flex-1 overflow-y-auto bg-black scrollbar-hide divide-y divide-gray-700"
				style={{
					maxHeight: "60vh",
					scrollbarWidth: "none",
					msOverflowStyle: "none",
				}}
			>
				<style>{`.scrollbar-hide::-webkit-scrollbar{display:none}`}</style>
		{loading ? (
		  <div className="px-6 py-6">Loading...</div>
		) : faqList.length === 0 ? (
		  <div className="px-6 py-6">No FAQs found.</div>
		) : (
		  faqList.map((faq, index) => (
			<div key={faq.id} className="px-6 py-6">
			  <h3 className="font-bold text-white mb-1">
				{index + 1}. {faq.ques ?? faq.question}
			  </h3>
			  <p className="text-sm text-gray-400">{faq.ans ?? faq.answer}</p>
			</div>
		  ))
		)}
			</div>

			{/* Footer Buttons */}
			<div
				className="w-full h-[73px] flex justify-end gap-5 px-7 bg-[#30303099]/60"
				style={{ fontSize: 16, fontWeight: 600 }}
			>
				{/* Multi-FAQ Edit Popup */}
		{isEditing && (
		  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
			<div
			  className="bg-[#1a1a1a] w-[900px] max-h-[70vh] rounded-xl shadow-lg border border-[#5a5a5a] flex flex-col cursor-default"
			  style={{ boxShadow: "4px 4px 8px rgba(255, 255, 255, 0.2)" }}
			>
			  {/* Fixed Header */}
			  <div className="h-[60px] w-full flex justify-between items-center px-7 bg-[#8E8E8E] rounded-t-xl shrink-0">
				<h2
				  className="text-[#333333] select-none"
				  style={{ fontFamily: "Inter", fontSize: 22, fontWeight: 600 }}
				>
				  Edit FAQs
				</h2>
				<div
				  className="h-[32px] w-[32px] rounded-sm p-1.5 bg-[#333333] cursor-pointer flex items-center justify-center"
				  onClick={() => setIsEditing(false)}
				  tabIndex={0}
				  role="button"
				  aria-label="Close Edit Popup"
				>
				  <img src={cross} alt="close" className="h-[20px] w-[20px] cursor-pointer" />
				</div>
			  </div>

			  {/* Scrollable Content for all FAQs */}
			  <div
				className="overflow-y-auto px-6 py-4 flex-1 scrollbar-hide"
				style={{ maxHeight: "70vh", scrollbarWidth: "none", msOverflowStyle: "none", overscrollBehavior: "contain" }}
			  >
				<style>{`
				  .scrollbar-hide::-webkit-scrollbar{display:none}
				  .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
				  .scrollbar-hide::-ms-scrollbar { width: 0 !important; height: 0 !important; }
				  .scrollbar-hide::-webkit-scrollbar-thumb { background: transparent; }
				  .scrollbar-hide::-webkit-scrollbar-track { background: transparent; }
				`}</style>
				{editFaqs.map((item, idx) => (
				  <div key={item.id} className="flex mb-5">
					<div className="flex-1 py-3 px-7 gap-1">
					  <label className="block text-sm text-gray-300 mb-1 select-none" style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 14 }}>
						QUESTION
					  </label>
					  <input
						type="text"
						value={item.ques ?? item.question}
						placeholder="FAQ Question"
						onChange={(e) => {
						  const updated = editFaqs.map((t, i) =>
							i === idx ? { ...t, ques: e.target.value } : t
						  );
						  setEditFaqs(updated);
						}}
						className="faq-input w-full font-mono px-3 py-2 rounded-md text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] cursor-pointer"
					  />
					  <label className=" block text-sm text-gray-300 mt-2 select-none" style={{ fontFamily: "Inter", fontWeight: 600, fontSize: 14 }}>
						ANSWER
					  </label>
					  <textarea
						value={item.ans ?? item.answer}
						onChange={(e) => {
						  const updated = editFaqs.map((t, i) =>
							i === idx ? { ...t, ans: e.target.value } : t
						  );
						  setEditFaqs(updated);
						}}
						placeholder="FAQ Answer"
						className="faq-input faq-textarea w-full mt-1 h-[100px] px-3 py-2 rounded-md font-mono text-white [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] cursor-pointer scrollbar-hide"
						style={{ resize: 'none', overflow: 'hidden' }}
					  ></textarea>
					</div>
					<div className="flex flex-col justify-center ">
					  <button
						onClick={() => handleDelete(item.id)}
						className="faq-btn font-mono w-[40px] h-[40px] rounded-xl bg-[#ACACAC40]/60 text-white flex items-center justify-center mb-20 cursor-pointer"
					  >
						<img src={deleteIcon} alt="delete" className="h-[20px] w-[20px] cursor-pointer" />
					  </button>
					</div>
				  </div>
				))}
			  </div>

			  {/* Sticky Footer */}
			  <div className="h-[73px] flex justify-end gap-3 px-6 py-1 bg-[#30303099]/30 rounded-b-xl border-t border-[#5a5a5a] shrink-0">
				<button
				  onClick={handleSave}
				  className="faq-btn font-mono my-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[105px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 gap-2 px-4 cursor-pointer"
				>
				  <img src={RightIcon} alt="save" className="h-[25px] w-[25px] cursor-pointer" />
				  <p>SAVE</p>
				</button>
				<button
				  className="faq-btn font-mono my-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] w-[135px] h-[45px] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2.5 gap-2 px-4 cursor-pointer"
				  onClick={handleAddNew}
				>
				  <img src={PlusButton} alt="add new" className="h-[25px] w-[25px] cursor-pointer" />
				  <p> ADD NEW</p>
				</button>
			  </div>
			</div>
		  </div>
		)}

				<button
					className="font-mono w-[105px] h-[45px] mt-3 [box-shadow:inset_3px_3px_8px_rgba(255,255,255,0.3)] rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2 gap-2 px-4 cursor-pointer"
					onClick={handleEdit}
				>
					<img src={EditIcon} alt="edit" className="h-[25px] w-[25px]" />
					<p>EDIT</p>
				</button>
				<button
					onClick={handleDeleteAll}
					className="font-mono w-[125px] h-[45px] mt-3 rounded-xl border-[2px] bg-[#ACACAC40]/60 border-[#FFFFFF] text-white flex py-2 gap-2 px-3 cursor-pointer"
				>
					<img src={DeleteIcon} alt="delete" className="h-[25px] w-[25px]" />
					<p>DELETE</p>
				</button>
			</div>
		</div>
	);
};

export default FAQs;