import React, { useState } from 'react';
import { Sparkles, Users, Zap, MapPin, Ticket, UserPlus } from 'lucide-react';
import mcLogo from './mc-logo.png';
import type { TicketDisplayProps } from './components/TicketDisplay';
type TicketType = TicketDisplayProps['ticket'];
import RSVPForm from './components/RSVPForm';
import TicketDisplay from './components/TicketDisplay';

function App() {
  const [ticket, setTicket] = useState<TicketType | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.1),transparent_50%)]" />

      <div className="relative">
        {!ticket ? (
          <>
            <div className="min-h-screen flex flex-col justify-center">
              <div className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-5xl mx-auto">
                  <div className="text-center mb-16 md:mb-20">
                    <div className="flex justify-center mb-8">
                      <img src={mcLogo} alt="The Millennial Circuit Logo" className="h-24 w-auto object-contain" />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                      The Millennial Circuit
                    </h1>
                    <p className="text-2xl md:text-3xl text-emerald-400 font-semibold mb-6">
                      Re-engineering Governance and Innovation for a New Nigeria
                    </p>

                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-4">
                      In an era of uninspiring leadership and stunted development, The Millennial Circuit emerges as a pioneering force for change. Founded on the urgent need to rebuild public trust, our think tank exists to shatter the cycle of governance without accountability.
                    </p>

                    <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                      We confront the gap between political rhetoric and tangible results, championing a future where leadership is synonymous with transparency, strategic action, and verifiable service delivery to the people.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                      <a
                        href="#rsvp-form"
                        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <Ticket className="w-4 h-4 mr-2" />
                        <UserPlus className="w-4 h-4 mr-2" />
                        Register Now
                      </a>
                      <a
                        href="#polination"
                        className="inline-flex items-center justify-center px-6 py-3 border border-white/10 text-white/90 rounded-full shadow-sm hover:bg-white/5 transition-all duration-200"
                      >
                        Join Polination Labs
                      </a>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-white text-center mt-8 mb-8">Our Mandate</h2>
                  <div className="max-w-3xl mx-auto text-center mb-12 text-slate-300">
                    <p>
                      Our mandate is powered by a dual-pronged methodology: Cutting-edge Governance Monitoring AND Innovative Knowledge Engineering. We track, rate, and provide solutions that close the gap between promises and outcomes.
                    </p>
                  </div>

                  <h2 className="text-3xl font-bold text-white text-center mt-12 mb-8">Why The Millennial Circuit?</h2>
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 text-center">
                      <Sparkles className="w-6 h-6 text-emerald-400 mb-3 mx-auto" />
                      <h3 className="text-white font-semibold mb-2">Evidence-Driven Policy</h3>
                      <p className="text-slate-400 text-sm">We turn data and research into actionable policy, recommendations, and change.</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 text-center">
                      <Users className="w-6 h-6 text-emerald-400 mb-3 mx-auto" />
                      <h3 className="text-white font-semibold mb-2">Accountability</h3>
                      <p className="text-slate-400 text-sm">We track and publicly rate leaders to restore trust and verify delivery.</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 text-center">
                      <Zap className="w-6 h-6 text-emerald-400 mb-3 mx-auto" />
                      <h3 className="text-white font-semibold mb-2">Innovative Solutions</h3>
                      <p className="text-slate-400 text-sm">Polination Labs engineers data-driven solutions for real-world governance problems.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div id="mels" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                      <h3 className="text-white font-semibold mb-2">MELS</h3>
                      <p className="text-slate-300 text-lg mb-3">Monitoring, Evaluation & Learning System</p>
                      <p className="text-slate-400 text-sm">Cloud-based platform to track campaign pledges, rate performance, and enable citizen oversight.</p>
                    </div>

                    <div id="polination" className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                      <h3 className="text-white font-semibold mb-2">Polination Labs</h3>
                      <p className="text-slate-300 text-lg mb-3">Knowledge Engineering</p>
                      <p className="text-slate-400 text-sm">Designs intelligent, data-driven prototypes and policy interventions for real-world problems.</p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
                      <MapPin className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
                      <h3 className="text-white font-semibold mb-2">Our Focus</h3>
                      <p className="text-slate-300 text-lg mb-3">Pilot in Northern Nigeria</p>
                      <p className="text-slate-400 text-sm">Starting in the North and scaling nationwide in the near future.</p>
                    </div>
                  </div>

                  <div className="py-12 md:py-20 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900 rounded-2xl">
                    <div className="container mx-auto px-4">
                      <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Get Involved</h2>
                        <p className="text-lg text-slate-300 mb-6">
                          Track political promises, join Polination Labs to help design solutions, or support the think tank financially or through partnerships.
                        </p>

                        <div className="flex items-center justify-center gap-4 mb-8">
                          <a
                            href="#mels"
                            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-full shadow-lg transition-all duration-300"
                          >
                            Track Leaders with MELS
                          </a>
                          <a
                            href="#polination"
                            className="inline-flex items-center justify-center px-6 py-3 border border-white/10 text-white rounded-full shadow-sm hover:bg-white/5 transition-all duration-200"
                          >
                            Join Polination Labs
                          </a>
                        </div>

                        <p className="text-slate-500 text-sm mt-6">
                          Want to partner or support our mission? Contact us to learn more.
                        </p>
                      </div>
                      <div id="rsvp-form" className="pt-20 -mt-20">
                        <RSVPForm onSuccess={setTicket} />
                      </div>
                    </div>
                  </div>

                  <footer className="mt-12 text-center text-slate-500 text-sm">
                    <p>© {new Date().getFullYear()} The Millennial Circuit — Rebuilding trust in public leadership across Nigeria.</p>
                  </footer>
                </div>
              </div>
            </div>
          </>
        ) : (
          <TicketDisplay ticket={ticket} />
        )}
      </div>
    </div>
  );
}

export default App;
