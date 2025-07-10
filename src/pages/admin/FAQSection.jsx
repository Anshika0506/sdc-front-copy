import React from "react";
// Use your own icons here:
import EditIcon from "../../assets/edit.svg"; // or ReactComponent
import DeleteIcon from "../../assets/delete.png";

const faqs = [
  {
    id: 1,
    question: "Quality services provided at affordable rates?",
    answer:
      "Potter ipsum wand elf parchment wingardium. Ludo glory house peruvian-night-powder crush dobby last wand. Order azkaban umbrella elder hunt knight-bus lion. Floor head map carriages giant out slytherin’s. Hexed mrs memory of peg-leg great dress catherine floo. Downfall easy is sticking this hair 10 azkaban.",
  },
  {
    id: 2,
    question: "Minimum prices for the maximum output advertise anything?",
    answer:
      "Potter ipsum wand elf parchment wingardium. Ludo glory house peruvian-night-powder crush dobby last wand. Order azkaban umbrella elder hunt knight-bus lion. Floor head map carriages giant out slytherin’s. Hexed mrs memory of peg-leg great dress catherine floo. Downfall easy is sticking this hair 10 azkaban.",
  },
  {
    id: 3,
    question:
      "Advertising that makes all the difference leaping over boundaries?",
    answer:
      "Potter ipsum wand elf parchment wingardium. Ludo glory house peruvian-night-powder crush dobby last wand. Order azkaban umbrella elder hunt knight-bus lion. Floor head map carriages giant out slytherin’s. Hexed mrs memory of peg-leg great dress catherine floo. Downfall easy is sticking this hair 10 azkaban.",
  },
  {
    id: 4,
    question: "Minimum prices for the maximum output advertise anything?",
    answer:
      "Potter ipsum wand elf parchment wingardium. Ludo glory house peruvian-night-powder crush dobby last wand. Order azkaban umbrella elder hunt knight-bus lion. Floor head map carriages giant out slytherin’s. Hexed mrs memory of peg-leg great dress catherine floo. Downfall easy is sticking this hair 10 azkaban.",
  },
  {
    id: 5,
    question: "Quality services provided at affordable rates?",
    answer:
      "Potter ipsum wand elf parchment wingardium. Ludo glory house peruvian-night-powder crush dobby last wand. Order azkaban umbrella elder hunt knight-bus lion. Floor head map carriages giant out slytherin’s. Hexed mrs memory of peg-leg great dress catherine floo. Downfall easy is sticking this hair 10 azkaban.",
  },
];

const FAQs = () => {
  return (
    <div className="w-full h-full text-white p-4 sm:p-6 flex flex-col">
      {/* Header */}
      <div className="bg-[#8E8E8E] text-white rounded-t-xl px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">FAQ's</h2>
        <div className="flex gap-2 items-center text-sm">
          <span>Page</span>
          <button className="px-3 py-1 bg-gray-200 text-black rounded-md text-xs font-medium">
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
        {faqs.map((faq, index) => (
          <div key={faq.id} className="px-6 py-6">
            <h3 className="font-bold text-white mb-1">
              {index + 1}. {faq.question}
            </h3>
            <p className="text-sm text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div
        className="px-6 py-4 flex justify-end gap-4 rounded-b-xl border-t border-gray-700"
        style={{ background: "rgba(48, 48, 48, 0.60)" }}
      >
        <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm border border-gray-600 transition">
          <img src={EditIcon} alt="Edit" className="w-4 h-4" />
          EDIT
        </button>
        <button className="flex items-center gap-2 bg-gray-900 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm border border-gray-600 transition">
          <img src={DeleteIcon} alt="Delete" className="w-4 h-4" />
          DELETE
        </button>
      </div>
    </div>
  );
};

export default FAQs;
