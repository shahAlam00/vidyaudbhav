"use client";

import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  MessageCircle 
} from "lucide-react";
import Link from "next/link";
import { PiPinterestLogo } from "react-icons/pi";

export default function ContactWrapper() {
  return (
    <section className="custom-container py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
        
        {/* ================= LEFT CONTENT: Info & Details ================= */}
        <div className="flex flex-col justify-between space-y-8">
          <div>
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Contact Vidya Udbhav
            </span>
            <h2 className="text-3xl lg:text-4xl font-semibold text-heading mt-3">
              Connect with Our <br /> Admissions Experts
            </h2>
            <p className="mt-4 text-text max-w-lg leading-relaxed">
              Have questions about colleges or courses? Visit our office at Gaur City 
              or reach out via phone/email. We are here to guide you through every 
              step of your academic journey.
            </p>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-bg-surface rounded-2xl border border-border hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-3">
                <MapPin size={20} />
              </div>
              <h4 className="font-bold text-heading text-sm uppercase tracking-tight">Visit Us</h4>
              <p className="text-sm text-text mt-2 leading-relaxed">
                Gaur City Center, 8th Floor, <br />
                Office 0-899, Greater Noida, UP
              </p>
            </div>

            <div className="p-5 bg-bg-surface rounded-2xl border border-border hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center text-green-600 mb-3">
                <Phone size={20} />
              </div>
              <h4 className="font-bold text-heading text-sm uppercase tracking-tight">Call / WhatsApp</h4>
              <p className="text-sm text-text mt-2">+91 80811 30669</p>
              <Link 
                href="https://wa.me/918081130669" 
                className="text-xs font-bold text-green-600 mt-1 flex items-center gap-1 hover:underline"
              >
                <MessageCircle size={14} /> Chat on WhatsApp
              </Link>
            </div>

            <div className="p-5 bg-bg-surface rounded-2xl border border-border hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-600 mb-3">
                <Mail size={20} />
              </div>
              <h4 className="font-bold text-heading text-sm uppercase tracking-tight">Email Us</h4>
              <p className="text-sm text-text mt-2 break-all">info@vidyaudbhav.com</p>
            </div>

            <div className="p-5 bg-bg-surface rounded-2xl border border-border hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-600 mb-3">
                <Clock size={20} />
              </div>
              <h4 className="font-bold text-heading text-sm uppercase tracking-tight">Working Hours</h4>
              <p className="text-sm text-text mt-2">Mon - Fri: 9 AM - 6 PM</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="pt-4">
            <h4 className="text-sm font-bold text-heading uppercase mb-4 tracking-widest">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={20} />, link: "https://www.facebook.com/people/Vidya-Udbhav/61585622267279/", color: "hover:bg-blue-600" },
                { icon: <Instagram size={20} />, link: "https://www.instagram.com/vidyaudbhav/", color: "hover:bg-pink-600" },
                { icon: <Linkedin size={20} />, link: "https://linkedin.com/in/vidya-udbhav-57b78b3a2", color: "hover:bg-blue-700" },
                { icon: <Twitter size={20} />, link: "https://x.com/vidyaudbhav", color: "hover:bg-sky-500" },
                { icon: <PiPinterestLogo size={20} />, link: "https://pin.it/6c1RuvJJ8", color: "hover:bg-red-600" },
              ].map((social, idx) => (
                <Link 
                  key={idx} 
                  href={social.link}
                  target="_blank"
                  className={`w-11 h-11 flex items-center justify-center rounded-full bg-bg-surface border border-border text-text transition-all hover:text-white ${social.color} hover:-translate-y-1 shadow-sm`}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL: Google Map Embed ================= */}
        <div className="min-h-[450px] lg:min-h-full w-full rounded-[2rem] overflow-hidden border-4 border-white shadow-[var(--shadow-soft)] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.8053276047767!2d77.42593597554166!3d28.60561637567943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef1341438e9d%3A0x5f7dd3497a8f0d0a!2sGaur%20City%20Center!5e0!3m2!1sen!2sin!4v1772429992857!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Vidya Udbhav Location"
            className="absolute inset-0"
          ></iframe>
        </div>

      </div>
    </section>
  );
}