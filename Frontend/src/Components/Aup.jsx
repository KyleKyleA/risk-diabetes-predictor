// Author: Kyle Angeles
// File-Name: Aup.jsx
// Description: Part of the terms and conditions the user must follow in the application itself

const sections = [
  {
    title: "License to Use",
    body: "You're granted a limited, non-transferable license to use the Application for personal or internal use. You may not copy, modify, reverse engineer, or redistribute it.",
  },
  {
    title: "Intellectual Property",
    body: "All code, design, trademarks, and branding belong to the Service Provider. Nothing in these Terms grants you rights to use them.",
  },
  {
    title: "Termination",
    body: "We may suspend or terminate your access for breaching these Terms, with 14 days to cure minor breaches. Serious violations (illegal activity, IP infringement, harm to others) may result in immediate termination.",
  },
  {
    title: "Eligibility",
    body: "You must be at least 13 to use the Application. If you are under 13, a parent or guardian must accept these Terms on your behalf.",
  },
  {
    title: "User-Generated Content",
    body: "Don't post illegal, abusive, hateful, spammy, deceptive, or explicit content. We may remove content or suspend accounts that violate this. Report issues to kyleangeles2006@gmail.com.",
  },
  {
    title: "Liability",
    body: "We're not liable for indirect damages, third-party inaccuracies, or issues outside our control (e.g. your internet connection or device). Nothing here limits rights you have under consumer protection law.",
  },
  {
    title: "Governing Law & DSA Compliance",
    body: "These Terms are governed by the Service Provider's jurisdiction. Where applicable, we comply with the EU Digital Services Act — including a designated point of contact, clear reasons for moderation decisions, and a notice-and-action process for illegal content. Contact: kyleangeles2006@gmail.com.",
  },
  {
    title: "Changes to These Terms",
    body: "We may update these Terms periodically. Continued use after changes means you accept the updated Terms. Previous versions are available on request.",
  },
];

function Aup() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-sm text-black-500">
      <h2 className="text-center font-semibold mb-2 text-black-500">AUP Policy</h2>
      <p className="text-center text-gray-500 mb-8">
        Effective August 2, 2026 — Terms & Conditions for the DiabetesRiskPredictor app.
      </p>

      <div className="space-y-6 w-full">
        {sections.map((section, i) => (
          <div key={i}>
            <p className="font-medium mb-1">{section.title}</p>
            <p className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none text-gray-500">{section.body}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-400 text-xs mt-10">
        Questions? Contact{" "}
        <a href="mailto:kyleangeles2006@gmail.com" className="underline">
          kyleangeles2006@gmail.com
        </a>
      </p>
    </div>
  );
}

export default Aup;
