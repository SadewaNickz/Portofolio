export default function Contact() {
  const contactLinks = [
    {
      id: 1,
      name: "Email",
      value: "bagussadewa256@gmail.com",
      href: "mailto:bagussadewa256@gmail.com",
      label: "Kirim Email",
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
        <h1 className="p5-title text-4xl md:text-5xl mb-4 text-fg">
          Hubungi <span className="text-accent">Saya</span>
        </h1>
        <p className="text-muted text-lg max-w-lg mx-auto">
          Mari berdiskusi! Hubungi saya melalui salah satu platform di bawah ini. Saya akan membalas secepat mungkin.
        </p>
        <div className="p5-divider w-24 mt-4 mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactLinks.map((contact, index) => (
          <a
            key={contact.id}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card p5-card group flex flex-col items-center text-center h-64 p-8 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="p5-content flex flex-col items-center justify-between h-full w-full">
              {/* Icon Container */}
              <div className="icon-box w-16 h-16 rounded-full flex items-center justify-center border-2 border-line text-fg transition-colors duration-300">
                {contact.icon}
              </div>

              {/* Label and Value */}
              <div>
                <h2 className="p5-heading text-base text-fg mb-1">{contact.name}</h2>
                <p className="text-muted text-sm font-mono break-all">{contact.value}</p>
              </div>

              {/* CTA Button/Link */}
              <span className="chip px-4 py-2 font-semibold">
                {contact.label} →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
