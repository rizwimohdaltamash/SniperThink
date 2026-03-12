import { FiGithub, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="relative border-t border-slate-200 bg-white">
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-600 to-teal-500 flex items-center justify-center shadow-lg shadow-brand-600/20">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Sniper<span className="gradient-text">Think</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-6">
              AI-powered strategic intelligence platform transforming raw data
              into decisive business actions.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <FiTwitter />, href: "#" },
                { icon: <FiLinkedin />, href: "#" },
                { icon: <FiGithub />, href: "#" },
                { icon: <FiMail />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-brand-50 text-slate-500 hover:text-brand-600 flex items-center justify-center transition-all duration-300 text-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links — Product */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
              Product
            </h4>
            <ul className="space-y-2.5">
              {["Features", "Pricing", "Integrations", "Changelog"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 hover:text-brand-600 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Links — Company */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-slate-500 hover:text-brand-600 transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} SniperThink. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-slate-400 hover:text-brand-600 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
