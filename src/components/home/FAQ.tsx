"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How does Vidya Udbhav help in career planning?",
    answer: "Vidya Udbhav uses a blend of scientific psychometric assessments and expert mentorship to help students identify their strengths. We provide a personalized roadmap for college admissions, course selection, and career growth in India and abroad.",
  },
  {
    question: "What is the process for university admission guidance?",
    answer: "Our process includes profile evaluation, shortlisting the best-fit colleges based on rank/budget, application assistance, and interview preparation. We ensure you meet all deadlines for top universities like DU, IPU, and private institutions.",
  },
  {
    question: "Is the first career counselling session free?",
    answer: "Yes, Vidya Udbhav offers a free initial discovery session. In this call, our expert mentors understand your academic background and career goals to suggest the best path forward without any upfront cost.",
  },
  {
    question: "How can I choose the right stream after 10th or 12th?",
    answer: "Choosing a stream is a critical decision. We conduct aptitude tests that measure your logic, verbal, and numerical ability, helping you choose between Science, Commerce, or Humanities based on your true potential.",
  },
  {
    question: "Does Vidya Udbhav help with scholarship applications?",
    answer: "Absolutely. We guide students in finding and applying for merit-based and need-based scholarships offered by various universities and government bodies to make quality education more affordable.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className="py-20 bg-white relative overflow-hidden"
      aria-labelledby="faq-heading"
    >
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        
        {/* ================= HEADER ================= */}
        <div className="text-center mb-16">
          <h2 id="faq-heading" className="lg:text-4xl sm:text-3xl text-2xl font-heading font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Find answers to common queries about career guidance, admissions, and our services.
          </p>
        </div>

        {/* ================= ACCORDION ================= */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <article
                key={index}
                className={`border rounded-3xl transition-all duration-300 ${
                  isOpen 
                    ? "border-primary bg-primary/[0.02] shadow-sm" 
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-full flex justify-between items-center px-6 py-6 text-left group"
                >
                  <span className={`text-lg font-bold transition-colors ${
                    isOpen ? "text-primary" : "text-slate-800"
                  }`}>
                    {faq.question}
                  </span>
                  
                  <div className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen ? "bg-primary text-white rotate-180" : "bg-slate-100 text-slate-500"
                  }`}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6">
                        <div className="h-[1px] w-full bg-slate-100 mb-4" />
                        <p className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>

     
    </section>
  );
}