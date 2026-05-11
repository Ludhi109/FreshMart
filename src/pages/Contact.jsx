import React from 'react';
import PageTransition from '../components/PageTransition';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare, Camera, Video, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <PageTransition>
      <div className="pt-28 pb-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-text-main mb-4">Get in Touch</h1>
            <p className="text-text-muted text-lg">Have a question or feedback? We'd love to hear from you. Our team is always here to help.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-sm border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-text-main mb-8">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">Your Name</label>
                    <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-text-main">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Subject</label>
                  <input type="text" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-main">Message</label>
                  <textarea rows="5" className="w-full px-6 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-primary/20 outline-none resize-none" placeholder="Write your message here..."></textarea>
                </div>
                <button className="w-full bg-primary hover:bg-primary-dark text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/30 transition-all active:scale-95">
                  Send Message
                  <Send size={20} />
                </button>
              </form>
            </motion.div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="bg-white rounded-[3rem] p-8 lg:p-10 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-text-main mb-8">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-green-50 text-primary rounded-2xl flex items-center justify-center shrink-0">
                      <MapPin size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-main mb-1">Our Location</h4>
                      <p className="text-text-muted">123 Fresh Lane, Jubilee Hills, Hyderabad, India 500033</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Phone size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-main mb-1">Phone Number</h4>
                      <p className="text-text-muted">+91 98765 43210</p>
                      <p className="text-text-muted">+91 40 1234 5678</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Mail size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-main mb-1">Email Address</h4>
                      <p className="text-text-muted">support@freshmart.com</p>
                      <p className="text-text-muted">info@freshmart.com</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                      <Clock size={28} />
                    </div>
                    <div>
                      <h4 className="font-bold text-text-main mb-1">Working Hours</h4>
                      <p className="text-text-muted">Monday - Sunday: 06:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-12 pt-10 border-t border-gray-100">
                  {[Globe, MessageSquare, Camera, Video].map((Icon, idx) => (
                    <a key={idx} href="#" className="w-12 h-12 bg-gray-50 text-text-muted rounded-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                      <Icon size={24} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 bg-white rounded-[3rem] overflow-hidden shadow-sm border border-gray-100 relative group">
                <iframe
                  title="Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121815.11293774614!2d78.31295252033621!3d17.425143385496464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb90989f6674a9%3A0x6734138e9b6264e9!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-none grayscale group-hover:grayscale-0 transition-all duration-700"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
