import { CheckCircle, MapPin, Clock, User, Mail, Phone, Briefcase, Calendar } from 'lucide-react';

interface RSVP {
  full_name: string;
  email: string;
  phone: string;
  institution_organization: string;
  company?: string; // Keep for backward compatibility
  job_title: string;
}

interface TicketDisplayProps {
  ticket: {
    ticket_number: string;
    qr_code: string;
    status: string;
    rsvp: RSVP;
  };
}

export default function TicketDisplay({ ticket }: TicketDisplayProps) {
  // Generate a URL for the ticket details page
  const ticketUrl = `${window.location.origin}/ticket/${ticket.ticket_number}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(ticketUrl)}`;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            You're All Set!
          </h1>
          <p className="text-lg text-slate-300">
            Your ticket has been generated successfully
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-6">
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              Millennial Circuit Launch
            </h2>
            <p className="text-emerald-50 text-center text-sm">Official Launch Event</p>
          </div>

          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-2xl border-4 border-emerald-500">
                <img
                  src={qrCodeUrl}
                  alt="Ticket QR Code"
                  className="w-48 h-48 hover:opacity-90 transition-opacity cursor-pointer"
                  onClick={() => window.open(ticketUrl, '_blank')}
                  title="Click to view ticket details"
                />
              </div>
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-slate-600 mb-1">Ticket Number</p>
              <p className="text-2xl font-bold text-slate-900 tracking-wider">
                {ticket.ticket_number}
              </p>
            </div>

            <div className="border-t-2 border-dashed border-slate-200 my-6"></div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-600">Name</p>
                  <p className="font-semibold text-slate-900">{ticket.rsvp.full_name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p className="font-semibold text-slate-900">{ticket.rsvp.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <p className="font-semibold text-slate-900">{ticket.rsvp.phone}</p>
                </div>
              </div>

              {ticket.rsvp.company && (
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-slate-600">Company & Title</p>
                    <p className="font-semibold text-slate-900">
                      {ticket.rsvp.company}
                      {ticket.rsvp.job_title && ` - ${ticket.rsvp.job_title}`}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t-2 border-dashed border-slate-200 my-6"></div>

            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900 mb-3">Event Details</h3>

              <div className="flex items-center text-slate-700">
                <Briefcase className="w-5 h-5 text-emerald-600 mr-3" />
                <span>{ticket.rsvp.institution_organization}</span>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <Calendar className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>13th December</span>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>10:00 AM</span>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>Arewa house Kaduna state</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 px-8 py-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 text-center">
              Please present this QR code at the entrance. A confirmation email has been sent to your registered email address.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20"
          >
            Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
