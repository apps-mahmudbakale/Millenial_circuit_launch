import { useState } from 'react';
import { UserPlus, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface RSVP {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  institution_organization: string;
  job_title: string;
  created_at?: string;
}

interface Ticket {
  id: string;
  rsvp_id: string;
  ticket_number: string;
  qr_code: string;
  status: string;
  rsvp?: RSVP;
}

interface RSVPFormProps {
  onSuccess: (ticket: Ticket) => void;
}

export default function RSVPForm({ onSuccess }: RSVPFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    institution_organization: '',
    job_title: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const generateTicketNumber = async () => {
    const { count } = await supabase
      .from('tickets')
      .select('*', { count: 'exact', head: true });

    const ticketNum = (count || 0) + 1;
    return `MC-2025-${String(ticketNum).padStart(4, '0')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Debug log the form data before submission
      console.log('Form data before submission:', JSON.stringify(formData, null, 2));
      
      // Create a clean submission object with only the fields we want to send
      const submissionData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        institution_organization: formData.institution_organization,
        job_title: formData.job_title
      };
      
      console.log('Prepared submission data:', JSON.stringify(submissionData, null, 2));
      const { data: existingRSVP } = await supabase
        .from('rsvps')
        .select('id')
        .eq('email', formData.email)
        .maybeSingle();

      if (existingRSVP) {
        const { data: existingTicket } = await supabase
          .from('tickets')
          .select('*')
          .eq('rsvp_id', existingRSVP.id)
          .maybeSingle();

        if (existingTicket) {
          const { data: rsvpData } = await supabase
            .from('rsvps')
            .select('*')
            .eq('id', existingRSVP.id)
            .single();

          onSuccess({ ...existingTicket, rsvp: rsvpData });
          return;
        }
      }

      const { data: rsvp, error: rsvpError } = await supabase
        .from('rsvps')
        .insert([submissionData])
        .select()
        .single();

      console.log('Supabase response:', { data: rsvp, error: rsvpError });

      if (rsvpError) throw rsvpError;

      const ticketNumber = await generateTicketNumber();
      const qrCode = btoa(JSON.stringify({
        ticket: ticketNumber,
        email: formData.email,
        name: formData.full_name
      }));

      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert([{
          rsvp_id: rsvp.id,
          ticket_number: ticketNumber,
          qr_code: qrCode,
          status: 'active'
        }])
        .select()
        .single();

      if (ticketError) throw ticketError;

      onSuccess({ ...ticket, rsvp });
    } catch (err: any) {
      console.error('RSVP Error:', err);
      setError(err.message || 'Failed to process RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
      <div className="flex items-center gap-3 mb-6">
        <UserPlus className="w-6 h-6 text-emerald-400" />
        <h2 className="text-2xl font-bold text-white">Reserve Your Spot</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-slate-300 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            required
            value={formData.full_name}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="institution_organization" className="block text-sm font-medium text-slate-300 mb-2">
              Institution/Organization
            </label>
            <input
              type="text"
              id="institution_organization"
              name="institution_organization"
              value={formData.institution_organization}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="e.g. Stanford University"
            />
          </div>

          <div>
            <label htmlFor="job_title" className="block text-sm font-medium text-slate-300 mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="job_title"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              placeholder="Product Manager"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              Confirm RSVP
            </>
          )}
        </button>
      </form>
    </div>
  );
}
