import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold mb-6">OFFICEPACK</h2>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-semibold mb-6">Тусламж</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <Link href="/about-us" className="hover:text-white transition">
                Бидний тухай
              </Link>
              <Link href="/media" className="hover:text-white transition">
                Boom Hack
              </Link>
              <Link href="/orderGuidance" className="hover:text-white transition">
                Захиалгын заавар
              </Link>
              <Link href="/loan" className="hover:text-white transition">
                Зээлийн заавар
              </Link>
              <Link href="/faq" className="hover:text-white transition">
                Түгээмэл асуултууд
              </Link>
              <Link href="/join-us" className="hover:text-white transition">
                Хамтдаа ирээдүйг бүтээе!
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <Phone size={18} />
              <a href="tel:72277722" className="hover:text-white transition">
                7227-7722
              </a>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <a href="https://maps.app.goo.gl/oU6qny4PcEUF6VJU6" target="_blank" className="hover:text-white transition">
                Сүхбаатар дүүрэг, 1-р хороо, Sav Plaza, 202 тоот
              </a>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={18} />
              <div>
                <p>Ажлын өдөр: 09:00 - 20:00</p>
                <p>Амралтын өдөр: 10:00 - 18:00</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} />
              <a href="mailto:support@officepack.mn" className="hover:text-white transition">
                support@officepack.mn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-6">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} OFFICEPACK. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a href="https://www.facebook.com/BoomDealMongolia" target="_blank" className="hover:text-gray-400 transition">
              <FaFacebookF size={22} />
            </a>

            <a href="https://www.instagram.com/boom.mongolia/" target="_blank" className="hover:text-gray-400 transition">
              <FaInstagram size={22} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
