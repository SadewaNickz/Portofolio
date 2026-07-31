export default function Contact() {
  const contactLinks = [
    {
      id: 1,
      name: "Email",
      value: "bagussadewa256@gmail.com",
      href: "mailto:bagussadewa256@gmail.com",
      label: "Kirim Email",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-500/10 border-blue-500/20",
      textColor: "text-blue-400",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2,
      name: "LinkedIn",
      value: "Bagus Sadewa",
      href: "https://linkedin.com/in/bagus-sadewa321/",
      label: "Kunjungi LinkedIn",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/10 border-indigo-500/20",
      textColor: "text-indigo-400",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      id: 3,
      name: "Instagram",
      value: "@dewayyc",
      href: "https://instagram.com/dewayyc",
      label: "Ikuti Instagram",
      color: "from-pink-500 to-purple-500",
      bgColor: "bg-pink-500/10 border-pink-500/20",
      textColor: "text-pink-400",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
      <div className="mb-12 animate-slide-up text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hubungi <span className="gradient-text">Saya</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-lg mx-auto">
          Mari berdiskusi! Hubungi saya melalui salah satu platform di bawah ini. Saya akan membalas secepat mungkin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactLinks.map((contact, index) => (
          <a
            key={contact.id}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card group flex flex-col items-center text-center justify-between h-64 p-8 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Glow Background Effect */}
            <div className={`absolute -right-10 -top-10 w-24 h-24 rounded-full bg-gradient-to-br ${contact.color} opacity-10 blur-xl group-hover:scale-150 transition-all duration-500`} />

            {/* Icon Container */}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center border ${contact.bgColor} ${contact.textColor} mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]`}>
              {contact.icon}
            </div>

            {/* Label and Value */}
            <div>
              <h2 className="text-lg font-bold text-gray-200 mb-1">{contact.name}</h2>
              <p className="text-gray-400 text-sm font-mono break-all">{contact.value}</p>
            </div>

            {/* CTA Button/Link */}
            <span className="text-xs font-semibold mt-4 px-4 py-2 rounded-full border border-dark-600 bg-dark-700/50 text-gray-300 group-hover:bg-accent-primary group-hover:text-white group-hover:border-accent-primary transition-all duration-300">
              {contact.label} →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
