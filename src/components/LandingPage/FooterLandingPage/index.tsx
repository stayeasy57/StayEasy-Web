"use client";
import React from "react";
import {
  Apple,
  Play,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Home,
  Facebook,
} from "lucide-react";
import Image from "next/image";

const FooterLandingPage = () => {
  const [email, setEmail] = React.useState("");

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e: any) => {
    e.preventDefault();
    alert(`Thank you for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-primary text-white w-full">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Logo and App Download Section */}
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <div className="flex justify-center items-center">
                <Image
                  src="/white-logo-our.png"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
            </div>

            <div className="mt-8 flex gap-5">
              <button className="bg-white flex items-center justify-start gap-2 py-2 px-4 rounded-full">
                <Image src="/android.svg" alt="" width={60} height={60} />
                <h3 className="text-primary">
                  Get it on <br /> <strong>Google Play</strong>
                </h3>
              </button>
              <button className="bg-white flex items-center justify-start gap-2 py-2 px-4 rounded-full">
                <Image src="/Vector.svg" alt="" width={40} height={40} />
                <h3 className="text-primary">
                  Download it on <br /> <strong>App Store</strong>
                </h3>
              </button>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-4">Quick links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Room booking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Rooms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Explore
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Privacy policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    Refund policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    F.A.Q
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-yellow-400">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-bold mb-4">Newsletter</h3>
            <p className="mb-4">
              Kindly subscribe to our newsletter to get special offers on our
              rooms and vacation discounts.
            </p>

            <form onSubmit={handleSubscribe} className="flex mb-6">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                className="px-4 py-2 w-full border border-gray-100 focus:outline-none"
                required
              />
              <button
                type="submit"
                className="bg-yellow-400 text-blue-900 font-medium px-4 py-2"
              >
                Subscribe
              </button>
            </form>

            <div>
              <h3 className="font-bold mb-2">Follow Me</h3>
              <div className="flex space-x-3">
                <a
                  href="https://www.facebook.com/share/15ouXRAyrd/"
                  target="_blank"
                  className="bg-white rounded-full p-2"
                >
                  <Facebook className="text-blue-800 w-5 h-5" />
                </a>
                <a href="#" className="bg-white rounded-full p-2">
                  <Instagram className="text-blue-800 w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/ea-stayeasy"
                  className="bg-white rounded-full p-2"
                  target="_blank"
                >
                  <Linkedin className="text-blue-800 w-5 h-5" />
                </a>
                <a href="#" className="bg-white rounded-full p-2">
                  <Youtube className="text-blue-800 w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="py-4 text-center border-t border-blue-700">
        <p>Copyright &copy; 2025 StayEasy</p>
      </div>
    </footer>
  );
};

export default FooterLandingPage;
