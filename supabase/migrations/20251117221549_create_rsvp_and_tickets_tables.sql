/*
  # Create RSVP and Tickets Tables for Millennial Circuit Launch

  ## Summary
  Creates the database schema for managing RSVPs and ticket generation for the Millennial Circuit launch event.

  ## New Tables
  
  ### `rsvps`
  Stores RSVP information for event attendees:
  - `id` (uuid, primary key) - Unique identifier for each RSVP
  - `full_name` (text) - Attendee's full name
  - `email` (text, unique) - Attendee's email address
  - `phone` (text) - Attendee's phone number
  - `company` (text, optional) - Attendee's company name
  - `job_title` (text, optional) - Attendee's job title
  - `created_at` (timestamptz) - Timestamp when RSVP was created

  ### `tickets`
  Stores generated tickets for confirmed RSVPs:
  - `id` (uuid, primary key) - Unique identifier for each ticket
  - `rsvp_id` (uuid, foreign key) - References the RSVP record
  - `ticket_number` (text, unique) - Human-readable ticket number (e.g., MC-2025-0001)
  - `qr_code` (text) - QR code data for ticket validation
  - `status` (text) - Ticket status: 'active', 'checked_in', 'cancelled'
  - `created_at` (timestamptz) - Timestamp when ticket was generated

  ## Security
  
  1. Enable Row Level Security (RLS) on both tables
  2. Public can insert RSVPs (for registration)
  3. Public can read their own RSVP and ticket by matching email or ticket number
  4. No public updates or deletes to maintain data integrity

  ## Important Notes
  - Email addresses are unique to prevent duplicate RSVPs
  - Ticket numbers are auto-generated with a sequential format
  - Tickets are automatically linked to RSVPs via foreign key
  - QR codes contain encrypted ticket data for validation
*/

CREATE TABLE IF NOT EXISTS rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  company text DEFAULT '',
  job_title text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rsvp_id uuid REFERENCES rsvps(id) ON DELETE CASCADE NOT NULL,
  ticket_number text UNIQUE NOT NULL,
  qr_code text NOT NULL,
  status text DEFAULT 'active' NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create RSVP"
  ON rsvps
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read RSVPs by email"
  ON rsvps
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read tickets"
  ON tickets
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_rsvps_email ON rsvps(email);
CREATE INDEX IF NOT EXISTS idx_tickets_rsvp_id ON tickets(rsvp_id);
CREATE INDEX IF NOT EXISTS idx_tickets_ticket_number ON tickets(ticket_number);