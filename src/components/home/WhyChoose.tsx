"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { CheckCircle2, Star, Users, Calendar, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Certified Career Counselors",
    desc: "Our mentors are industry veterans with a track record of 5000+ successful admissions.",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "100% Unbiased College Selection",
    desc: "We don't take commissions. We prioritize your career fit over everything else.",
    icon: <ShieldCheck className="w-5 h-5" />, // Changed icon for Trust
  },
  {
    title: "End-to-End Admission Support",
    desc: "From profile building to final documentation, we handhold you through the entire journey.",
    icon: <Calendar className="w-5 h-5" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section 
      className="relative py-24 overflow-hidden bg-white"
      aria-labelledby="why-choose-heading"
    >
      {/* Decorative Background Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />

      <div className="custom-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* ================= IMAGE SIDE ================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border-8 border-white group">
              <Image
                src="/why-choose-us.jpg" // Ensure this image has alt tags below
                alt="Expert career counselling session at Vidya Udbhav for university admission"
                width={600}
                height={700}
                priority
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Floating Badge (Social Proof) */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -bottom-6 -right-6 md:right-10 bg-white p-6 rounded-3xl shadow-2xl z-20 flex items-center gap-4 border border-slate-100"
            >
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 leading-none">
                  10,000+
                </p>
                <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">
                  Students Guided
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ================= TEXT CONTENT SIDE ================= */}
          <div className="flex flex-col gap-8">
            <header className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-primary font-bold text-sm uppercase tracking-[0.2em] flex items-center gap-2"
              >
                <span className="w-8 h-[2px] bg-primary"></span>
                The Vidya Udbhav Advantage
              </motion.span>

              <motion.h2
                id="why-choose-heading"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:text-4xl sm:text-3xl text-2xl font-heading font-bold text-slate-900 leading-[1.2]"
              >
                Why We Are India's Most Trusted 
                <span className="text-primary block italic">Career Counselling Partner</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-600 text-lg leading-relaxed"
              >
                Choosing a career is a life-defining decision. At Vidya Udbhav, we blend <strong>data science with human mentorship</strong> to help you secure admission into India's top colleges.
              </motion.p>
            </header>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-start gap-5 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-soft flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <AnimatedButton
                size="md"
                className="px-10 shadow-lg shadow-primary/20"
              >
                Get Expert Advice Now
              </AnimatedButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}