"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Phone, 
  Mail, 
  MapPin,
  ExternalLink,
  // Pinterest Lucide mein nahi hai, isliye hum Share ya generic icon use karenge
  Share2 
} from "lucide-react"; 
import { FaPinterestP } from "react-icons/fa";


export default function Footer() {
  const socialLinks = [
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61585622267279", icon: <Facebook size={18} /> },
    { name: "Instagram", href: "https://www.instagram.com/vidyaudbhav/", icon: <Instagram size={18} /> },
    { name: "LinkedIn", href: "https://linkedin.com/in/vidya-udbhav-57b78b3a2", icon: <Linkedin size={18} /> },
    { name: "Twitter", href: "https://x.com/vidyaudbhav", icon: <Twitter size={18} /> },
    { name: "Pinterest", href: "https://pin.it/6c1RuvJJ8", icon: <FaPinterestP size={18} /> }, // Pinterest fix
  ];

  return (
    <footer className="bg-bg-surface border-t border-border">
      <div className="custom-container pt-16 pb-7">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand & Socials */}
          <div className="space-y-6">
            <div>
              <Image
                src="/logo.png"
                alt="Vidya Udbhav"
                width={160}
                height={60}
                className="mb-4"
              />
              <p className="text-muted text-sm leading-relaxed">
                Vidya Udbhav is dedicated to guiding students towards the right
                career path through expert counselling, assessment, and continuous
                support.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-muted hover:bg-[#1d5ed2] hover:text-white transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-heading font-bold text-base mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link href="/our-counsellors" className="hover:text-primary transition">Free Counselling</Link></li>
              <li><Link href="/colleges" className="hover:text-primary transition">Colleges</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-heading font-bold text-base mb-4">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/our-counsellors" className="hover:text-primary transition ">Career Counselling</Link></li>
              <li><Link href="/colleges" className="hover:text-primary transition ">College Admissions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-heading font-bold text-base mb-4">Get in Touch</h4>
            <ul className="space-y-4 text-sm text-muted">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Gaur City Center, 8th Floor, Greater Noida</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:+918081130669" className="hover:text-primary transition">+91 8081130669</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:info@vidyaudbhav.com" className="hover:text-primary transition">info@vidyaudbhav.com</a>
              </li>
            </ul>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 text-sm font-semibold
                         bg-primary text-white rounded-full
                         hover:bg-primary/90 transition-all"
            >
              Book Free Session <ExternalLink size={14} />
            </Link>
          </div>
        </div>

        <div className="border-t border-border my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>© {new Date().getFullYear()} Vidya Udbhav. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}