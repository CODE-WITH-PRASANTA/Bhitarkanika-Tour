require('dotenv').config();
const nodemailer = require('nodemailer');
const { jsPDF } = require('jspdf');

// Initialize Nodemailer transporter (optimized for Gmail service)
const transporter = nodemailer.createTransport(
  process.env.SMTP_HOST && process.env.SMTP_HOST.includes('gmail')
    ? {
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
    : {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: process.env.SMTP_SECURE === 'true' || Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
);

const FROM_HEADER = `"${process.env.SMTP_FROM_NAME || 'Art & Culture'}" <${
  process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER
}>`;

/**
 * Currency formatter
 */
const rs = (amount) => `Rs. ${Number(amount || 0).toLocaleString('en-IN')}`;

/**
 * Date formatter
 */
const formatDate = (dateStr) => {
  if (!dateStr) return 'Scheduled';
  const clean = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
  const d = new Date(clean);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Generate official 2-Page Booking Ticket PDF Buffer
 */
const generateBookingTicketPdf = (b) => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const W = 210;
  const green = [18, 54, 38];
  const gold = [180, 140, 60];

  // ================= PAGE 1 =================
  // Header Band
  doc.setFillColor(...green);
  doc.rect(0, 0, W, 52, 'F');
  doc.setFillColor(...gold);
  doc.rect(0, 52, W, 2.5, 'F');

  // Title & Subtitle
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('BHITARAKANIKA SAFARI', 16, 20);

  doc.setFontSize(10.5);
  doc.text('Official Boat Safari E-Pass & Voucher', 16, 28);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(225, 200, 140);
  doc.text('Recognized by Forest Dept. · Govt. of Odisha', 16, 35);

  // Header Right (Booking & Payment status)
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`Booking ID: ${b.bookingId || 'BTK-ONLINE'}`, W - 16, 19, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Status: ${b.status || 'Confirmed'} · ${b.paymentStatus || 'Paid'}`, W - 16, 27, {
    align: 'right',
  });
  if (b.paymentId) {
    doc.setTextColor(225, 200, 140);
    doc.setFontSize(8);
    doc.text(`Razorpay ID: ${b.paymentId}`, W - 16, 34, { align: 'right' });
  }
  doc.setTextColor(220, 230, 225);
  doc.setFontSize(8);
  doc.text(
    `Issued: ${new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })}`,
    W - 16,
    41,
    { align: 'right' }
  );

  // Tour Title & Route
  let curY = 66;
  doc.setTextColor(...green);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(b.packageName || 'Bhitarkanika Boat Package', 16, curY);

  curY += 6.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(80, 95, 88);
  doc.text(
    `${b.from || 'Khola Boating Point'} to ${b.to || 'Bhitarkanika Sanctuary'} · 1 Day Private Boat Safari`,
    16,
    curY
  );

  // Primary Details Box
  curY += 8;
  const boxW = W - 32;
  const boxH = 52;
  doc.setFillColor(250, 252, 250);
  doc.setDrawColor(215, 225, 220);
  doc.roundedRect(16, curY, boxW, boxH, 3, 3, 'FD');

  const drawCell = (lbl, val, x, y) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(...gold);
    doc.text(lbl.toUpperCase(), x, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(25, 40, 32);
    doc.text(String(val), x, y + 6);
  };

  const c1 = 22;
  const c2 = 110;
  drawCell('Primary Guest Name', b.name || 'Traveler', c1, curY + 11);
  drawCell('Contact Phone', `+91 ${b.phone || 'N/A'}`, c2, curY + 11);

  drawCell('Travel Date', formatDate(b.travelDate || b.date), c1, curY + 26);
  drawCell('Jetty Departure Slot', b.departureSlot || b.time || '7:00 AM – 10:30 AM', c2, curY + 26);

  drawCell(
    'Total Travelers',
    `${b.guests || (Number(b.adults) || 1) + (Number(b.children) || 0)} Guests · ${
      b.boats || b.boatCount || 1
    } Boat(s)`,
    c1,
    curY + 41
  );
  drawCell('Boarding Jetty Gate', b.from || 'Khola Boating Point, Kendrapara', c2, curY + 41);

  // Fare Breakdown Box
  curY += boxH + 8;
  const fareW = W - 32;
  const fareH = 38;
  doc.setFillColor(248, 246, 238);
  doc.setDrawColor(...gold);
  doc.roundedRect(16, curY, fareW, fareH, 3, 3, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(90, 100, 95);

  const totalAmount = Number(b.amount || b.totalAmount || 3590);
  const boatFare = b.boatFare || totalAmount - 90;
  const permit = b.forestPermit || 40;
  const tax = b.govtTax || 50;

  doc.text(`Boat Service Fare (${b.boats || b.boatCount || 1} Boat)`, 22, curY + 9);
  doc.text(rs(boatFare), W - 22, curY + 9, { align: 'right' });

  doc.text(`Govt Forest Permit (${rs(permit)}) & Boat Tax (${rs(tax)})`, 22, curY + 17);
  doc.text(rs(permit + tax), W - 22, curY + 17, { align: 'right' });

  doc.setDrawColor(215, 195, 150);
  doc.line(22, curY + 22, W - 22, curY + 22);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...green);
  doc.text('TOTAL AMOUNT PAID (INCL. ALL TAXES & PERMITS)', 22, curY + 30);
  doc.setFontSize(12.5);
  doc.text(rs(totalAmount), W - 22, curY + 30, { align: 'right' });

  // Security Notice & Instructions
  curY += fareH + 8;
  doc.setFillColor(240, 248, 244);
  doc.setDrawColor(180, 220, 200);
  doc.roundedRect(16, curY, W - 32, 40, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...green);
  doc.text('IMPORTANT INSTRUCTIONS FOR ENTRY:', 22, curY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(70, 85, 78);
  doc.text('1. Please carry this E-Voucher (on your smartphone or printed) to the entry jetty gate.', 22, curY + 16);
  doc.text('2. Primary guest must carry valid Govt Photo ID (Aadhaar / Voter ID / Passport) for forest permit check.', 22, curY + 22);
  doc.text('3. Please report at the jetty 15 minutes prior to the scheduled departure time slot.', 22, curY + 28);
  doc.text('4. Certified life jackets are provided on board and mandatory during creek cruising.', 22, curY + 34);

  // Page 1 Footer
  doc.setFillColor(...green);
  doc.rect(0, 282, W, 15, 'F');
  doc.setFillColor(...gold);
  doc.rect(0, 282, W, 1.2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Page 1 of 2 · Refer to Page 2 for official Terms & Conditions and Cancellation Policy', W / 2, 290, {
    align: 'center',
  });

  // ================= PAGE 2 =================
  doc.addPage();

  // Page 2 Header Band
  doc.setFillColor(...green);
  doc.rect(0, 0, W, 26, 'F');
  doc.setFillColor(...gold);
  doc.rect(0, 26, W, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('TERMS & CONDITIONS · ECOTOUR ODISHA', 16, 13);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(225, 200, 140);
  doc.text('Bhitarkanika Wildlife Sanctuary & National Park · Forest & Environment Dept., Govt. of Odisha', 16, 20);

  let p2Y = 34;

  // Section 1: Approved Cancellation & Date Change Policy Box
  doc.setFillColor(248, 250, 248);
  doc.setDrawColor(200, 220, 210);
  doc.roundedRect(16, p2Y, W - 32, 44, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...green);
  doc.text('CANCELLATION & DATE CHANGE POLICY', 22, p2Y + 7);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(50, 65, 58);
  const policyLines = [
    '• 30+ days prior to scheduled check-in / travel date: 5% cancellation charge | 0 INR date change fee.',
    '• 15 to 29 days prior to travel date: 15% cancellation charge | 10% date change fee.',
    '• 7 to 14 days prior to travel date: 25% cancellation charge | 10% date change fee.',
    '• 2 to 6 days prior to travel date: 50% cancellation charge | 25% date change fee.',
    '• 0 to 1 days prior to travel date (last 24 hours): 100% cancellation charge (No refund) | 100% date change fee.',
    '• Reference check-in time is 12:00 noon IST. Refund requests are processed via UPI / original mode in 1 to 3 days.',
  ];
  policyLines.forEach((line, idx) => {
    doc.text(line, 22, p2Y + 13 + idx * 4.9);
  });

  p2Y += 50;

  // Section 2: Standard Terms & Conditions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(...green);
  doc.text('OFFICIAL SANCTUARY & BOOKING TERMS & CONDITIONS', 16, p2Y);

  p2Y += 5;

  const termsList = [
    {
      title: 'Booking Acceptance & Forest Permissions',
      desc: 'Booking is valid only after payment, availability confirmation, and applicable forest permissions. All bookings are subject to weather, tide conditions, and directions from the Forest Department.',
    },
    {
      title: 'Mandatory ID Proof & Entry Verification',
      desc: 'Every guest must carry a valid government-issued photo ID (Aadhaar, Passport, Voter ID) and produce it at jetty checkpoints. Denial of entry by forest authorities overrides booking without liability.',
    },
    {
      title: 'Strict Activity & Departure Timings',
      desc: 'Guests must report at least 15 minutes prior to the departure slot. Boat and safari timings are strictly governed by high/low tides and forest safety regulations. Late arrivals will result in missed services without refund.',
    },
    {
      title: 'Wildlife Conduct Norms & Silence',
      desc: 'Feeding, chasing, provoking, or photographing with flash in restricted zones is strictly prohibited. Guests must maintain silence, remain in designated areas, and follow guides and forest staff instructions at all times.',
    },
    {
      title: 'Safari, Boating & Trekking at Own Risk',
      desc: 'Nature activities involve operational and terrain risks. Certified life jackets must be worn at all times aboard safari boats. Participation is voluntary and at guest\'s own risk, subject to applicable law.',
    },
    {
      title: 'Prohibition of Intoxicants, Loud Noise & Pets',
      desc: 'Possession or consumption of alcohol, drugs, narcotics, smoking, loud music, parties, and companion animals/pets are strictly forbidden inside eco-tourism zones and will attract immediate legal action.',
    },
    {
      title: 'Environmental Protection & Zero-Littering',
      desc: 'Bhitarkanika is an eco-sensitive Ramsar site. Single-use plastic, littering, open fire, or damaging flora and fauna are strictly prohibited and punishable under the Wildlife Protection Act.',
    },
    {
      title: 'No Sightings Guarantee & Forest Utilities',
      desc: 'Wildlife sightings and specific weather cannot be guaranteed. Nature stays in forest zones may have limited or intermittent mobile signal, electricity, and water. No dispute will be entertained on this ground.',
    },
    {
      title: 'Damage to Property & Equipment',
      desc: 'Any breakage, loss, vandalism, or damage caused to boats, life jackets, or sanctuary facilities will be charged on actual assessment directly to the primary guest.',
    },
    {
      title: 'Cancellation, Closure & Force Majeure',
      desc: 'Services may be altered, rescheduled, or cancelled due to adverse weather, tidal surges, wildlife movements, or government directives. In such cases, refunds follow applicable forest policy.',
    },
  ];

  termsList.forEach((term) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...gold);
    doc.text(`• ${term.title}:`, 16, p2Y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(60, 75, 68);
    const splitText = doc.splitTextToSize(term.desc, W - 32);
    doc.text(splitText, 16, p2Y + 3.8);
    p2Y += 3.8 + splitText.length * 3.4 + 1.6;
  });

  // Page 2 Footer
  doc.setFillColor(...green);
  doc.rect(0, 282, W, 15, 'F');
  doc.setFillColor(...gold);
  doc.rect(0, 282, W, 1.2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Page 2 of 2 · EcoTour Odisha · Forest & Environment Dept., Govt. of Odisha', W / 2, 290, {
    align: 'center',
  });

  return Buffer.from(doc.output('arraybuffer'));
};

/**
 * Base email layout wrapper
 */
const emailWrapper = (content, preheaderText = 'Bhitarkanika National Park Tour') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bhitarkanika Tour</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f3f6f4; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937; -webkit-font-smoothing: antialiased; }
    table { border-collapse: collapse; }
    .container { max-width: 620px; margin: 28px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 39, 27, 0.08); border: 1px solid #e5ede7; }
    .header { background: linear-gradient(135deg, #0d3826 0%, #155e3b 100%); padding: 32px 30px; text-align: center; color: #ffffff; position: relative; }
    .header-gold-line { height: 4px; background: linear-gradient(90deg, #d4af37, #f3e5ab, #d4af37); width: 100%; }
    .brand-title { font-size: 22px; font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase; margin: 0 0 4px 0; color: #ffffff; }
    .brand-subtitle { font-size: 12px; color: #d6e8dd; margin: 0; letter-spacing: 0.5px; text-transform: uppercase; font-weight: 500; }
    .body { padding: 32px 28px; }
    .badge-wrap { text-align: center; margin-bottom: 24px; }
    .badge { display: inline-block; padding: 6px 18px; border-radius: 30px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; }
    .badge-success { background: #e6f7ef; color: #065f46; border: 1px solid #a7f3d0; }
    .badge-danger { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }
    .badge-warning { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
    .card { background: #f8faf8; border: 1px solid #e2ebe4; border-radius: 12px; padding: 20px; margin-bottom: 22px; }
    .card-title { font-size: 14px; font-weight: 700; color: #0d3826; margin: 0 0 14px 0; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2ebe4; padding-bottom: 8px; }
    .row { display: flex; justify-content: space-between; padding: 7px 0; font-size: 13.5px; border-bottom: 1px dashed #e7efe9; }
    .row:last-child { border-bottom: none; }
    .row-label { color: #64748b; font-weight: 500; }
    .row-value { color: #0f172a; font-weight: 700; text-align: right; }
    .price-total { background: #edf7f1; border: 1px solid #ccebd7; border-radius: 10px; padding: 14px 18px; margin: 20px 0; display: flex; justify-content: space-between; align-items: center; }
    .price-label { font-size: 14px; font-weight: 700; color: #065f46; }
    .price-value { font-size: 22px; font-weight: 800; color: #065f46; font-family: Georgia, serif; }
    .notice-box { background: #fffcf0; border-left: 4px solid #d4af37; padding: 14px 16px; border-radius: 6px; font-size: 12.5px; color: #78350f; line-height: 1.6; margin: 20px 0; }
    .btn-wrap { text-align: center; margin: 26px 0 16px 0; }
    .btn { display: inline-block; background: #0d3826; color: #ffffff !important; text-decoration: none; padding: 13px 32px; border-radius: 8px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 14px rgba(13, 56, 38, 0.25); }
    .footer { background: #f8faf8; border-top: 1px solid #e5ede7; padding: 24px 20px; text-align: center; font-size: 12px; color: #64748b; }
    .footer-links { margin-bottom: 10px; }
    .footer-links a { color: #0d3826; text-decoration: none; margin: 0 8px; font-weight: 600; }
    .preheader { display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0; }
  </style>
</head>
<body>
  <span class="preheader">${preheaderText}</span>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6f4; padding: 20px 0;">
    <tr>
      <td align="center">
        <div class="container">
          <div class="header">
            <h1 class="brand-title">Bhitarkanika Safari</h1>
            <p class="brand-subtitle">Official Eco-Tourism &amp; Creek Safari Services</p>
          </div>
          <div class="header-gold-line"></div>
          <div class="body">
            ${content}
          </div>
          <div class="footer">
            <div class="footer-links">
              <a href="http://localhost:5173">Official Website</a> &bull;
              <a href="http://localhost:5173/profile">My Dashboard</a> &bull;
              <a href="tel:+918117048317">+91 8117048317</a>
            </div>
            <p style="margin: 6px 0;">Bhitarkanika National Park, Rajnagar WL Division, Kendrapara, Odisha - 754225</p>
            <p style="margin: 4px 0; color: #94a3b8; font-size: 11px;">Recognized by Department of Forest &amp; Environment, Govt. of Odisha</p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
`;

/**
 * Send Booking Confirmation Email with PDF Ticket Attachment
 */
const sendBookingConfirmationEmail = async (booking) => {
  if (!booking || !booking.email) {
    console.warn('[emailService] No recipient email specified for booking confirmation.');
    return { success: false, message: 'No email found' };
  }

  try {
    const bookingId = booking.bookingId || `TB-${String(booking._id).slice(-6)}`;
    const guestName = booking.name || 'Valued Traveler';
    const travelDate = formatDate(booking.travelDate || booking.date);
    const timeSlot = booking.departureSlot || booking.time || '7:00 AM – 10:30 AM';
    const totalAmount = Number(booking.amount || booking.totalAmount || 3590);
    const boatsCount = booking.boats || booking.boatCount || 1;
    const guestsCount = booking.guests || (Number(booking.adults) || 1) + (Number(booking.children) || 0);
    const fromGate = booking.from || 'Khola Boating Point';

    // Generate PDF Ticket Attachment
    let ticketPdfBuffer = null;
    try {
      ticketPdfBuffer = generateBookingTicketPdf(booking);
    } catch (pdfErr) {
      console.error('[emailService] Error generating PDF ticket attachment:', pdfErr);
    }

    const htmlContent = `
      <div class="badge-wrap">
        <span class="badge badge-success">&#10003; Booking Confirmed &amp; Paid</span>
      </div>

      <h2 style="font-size: 20px; color: #0d3826; text-align: center; margin: 0 0 10px 0;">
        Namaste, ${guestName}!
      </h2>
      <p style="text-align: center; color: #4b5563; font-size: 14px; margin: 0 0 24px 0; line-height: 1.5;">
        Your boat trip to <strong>Bhitarkanika National Park</strong> has been successfully booked and confirmed. Your official e-ticket is attached to this email.
      </p>

      <div class="card">
        <div class="card-title">Booking Details</div>
        <table width="100%">
          <tr><td class="row-label">Booking ID</td><td class="row-value" style="color:#065f46; font-size:15px;">#${bookingId}</td></tr>
          <tr><td class="row-label">Package Name</td><td class="row-value">${booking.packageName || 'Bhitarkanika Boat Package'}</td></tr>
          <tr><td class="row-label">Travel Date</td><td class="row-value">${travelDate}</td></tr>
          <tr><td class="row-label">Departure Slot</td><td class="row-value">${timeSlot}</td></tr>
          <tr><td class="row-label">Boarding Jetty</td><td class="row-value">${fromGate}</td></tr>
          <tr><td class="row-label">Boats Booked</td><td class="row-value">${boatsCount} ${boatsCount > 1 ? 'Boats' : 'Boat'}</td></tr>
          <tr><td class="row-label">Total Guests</td><td class="row-value">${guestsCount} Person(s)</td></tr>
          <tr><td class="row-label">Contact Mobile</td><td class="row-value">+91 ${booking.phone || 'N/A'}</td></tr>
          ${booking.paymentId ? `<tr><td class="row-label">Payment ID</td><td class="row-value" style="font-family:monospace; font-size:12px;">${booking.paymentId}</td></tr>` : ''}
        </table>
      </div>

      <table width="100%" class="price-total">
        <tr>
          <td class="price-label">Total Amount Paid (All Taxes &amp; Permits):</td>
          <td class="price-value" align="right">${rs(totalAmount)}</td>
        </tr>
      </table>

      <div class="notice-box">
        <strong>&#128204; Important Instructions for Your Visit:</strong><br>
        &bull; <strong>Official E-Ticket Attached:</strong> Download or print the attached PDF ticket and present it at the entry gate.<br>
        &bull; <strong>Mandatory ID Proof:</strong> All adult guests must carry an original government photo ID (Aadhaar / Voter ID / Passport).<br>
        &bull; <strong>Reporting Time:</strong> Please report at the jetty 15 minutes before your scheduled departure.<br>
        &bull; <strong>Safety Gear:</strong> Certified life jackets are provided on board and mandatory during cruising.
      </div>

      <div class="btn-wrap">
        <a href="http://localhost:5173/profile" class="btn">View Booking in Dashboard &rarr;</a>
      </div>
    `;

    const mailOptions = {
      from: FROM_HEADER,
      to: booking.email,
      subject: `Booking Confirmed: Bhitarkanika Boat Safari Ticket #${bookingId}`,
      html: emailWrapper(htmlContent, `Your ticket #${bookingId} for Bhitarkanika Boat Safari is confirmed! PDF attached.`),
      attachments: ticketPdfBuffer
        ? [
            {
              filename: `Bhitarkanika-Ticket-${bookingId}.pdf`,
              content: ticketPdfBuffer,
              contentType: 'application/pdf',
            },
          ]
        : [],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[emailService] Booking confirmation email sent to ${booking.email}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[emailService] Error sending booking confirmation email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send Booking Cancellation Email
 */
const sendBookingCancellationEmail = async (booking, reason = '') => {
  if (!booking || !booking.email) return { success: false, message: 'No email found' };

  try {
    const bookingId = booking.bookingId || `TB-${String(booking._id).slice(-6)}`;
    const guestName = booking.name || 'Valued Traveler';
    const travelDate = formatDate(booking.travelDate || booking.date);
    const cancelReason = reason || booking.refundReason || 'Customer Requested Cancellation';

    const htmlContent = `
      <div class="badge-wrap">
        <span class="badge badge-danger">&#10005; Booking Cancelled</span>
      </div>

      <h2 style="font-size: 20px; color: #991b1b; text-align: center; margin: 0 0 10px 0;">
        Booking Cancelled: #${bookingId}
      </h2>
      <p style="text-align: center; color: #4b5563; font-size: 14px; margin: 0 0 24px 0; line-height: 1.5;">
        Dear <strong>${guestName}</strong>, your reservation for the <strong>Bhitarkanika Boat Package</strong> has been successfully cancelled.
      </p>

      <div class="card">
        <div class="card-title">Cancelled Reservation Details</div>
        <table width="100%">
          <tr><td class="row-label">Booking ID</td><td class="row-value">#${bookingId}</td></tr>
          <tr><td class="row-label">Package Name</td><td class="row-value">${booking.packageName || 'Bhitarkanika Boat Package'}</td></tr>
          <tr><td class="row-label">Scheduled Date</td><td class="row-value">${travelDate}</td></tr>
          <tr><td class="row-label">Reason for Cancellation</td><td class="row-value" style="color:#b91c1c;">${cancelReason}</td></tr>
          <tr><td class="row-label">Cancellation Status</td><td class="row-value" style="color:#b91c1c;">Cancelled</td></tr>
        </table>
      </div>

      <div class="notice-box" style="border-left-color: #b91c1c; background: #fff5f5; color: #991b1b;">
        <strong>&#128179; Refund Information:</strong><br>
        If eligible for a refund according to our Forest Department policy, our accounts team is processing your request. Refunds are settled to your registered UPI / bank account within 1 to 3 business days.
      </div>

      <div class="btn-wrap">
        <a href="http://localhost:5173/profile" class="btn">Check Refund Status &rarr;</a>
      </div>
    `;

    const mailOptions = {
      from: FROM_HEADER,
      to: booking.email,
      subject: `Booking Cancelled: #${bookingId} - Bhitarkanika Safari`,
      html: emailWrapper(htmlContent, `Booking #${bookingId} has been cancelled.`),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[emailService] Cancellation email sent to ${booking.email}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[emailService] Error sending cancellation email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send Refund Status Update Email (Processing / Processed)
 */
const sendRefundUpdateEmail = async (booking, refundDetails = {}) => {
  if (!booking || !booking.email) return { success: false, message: 'No email found' };

  try {
    const bookingId = booking.bookingId || `TB-${String(booking._id).slice(-6)}`;
    const guestName = booking.name || 'Valued Traveler';
    const refundId = refundDetails.refundId || booking.refundId || `RFD-${Math.floor(10000 + Math.random() * 90000)}`;
    const refundAmount = Number(refundDetails.refundAmount || booking.refundAmount || booking.amount || 3590);
    const refundStatus = refundDetails.status || booking.refundStatus || 'Processing';
    const isCompleted = refundStatus.toLowerCase().includes('processed') || refundStatus.toLowerCase().includes('completed') || refundStatus.toLowerCase().includes('refunded');

    const htmlContent = `
      <div class="badge-wrap">
        <span class="badge ${isCompleted ? 'badge-success' : 'badge-warning'}">
          ${isCompleted ? '&#10003; Refund Completed' : '&#9203; Refund In Progress'}
        </span>
      </div>

      <h2 style="font-size: 20px; color: #0d3826; text-align: center; margin: 0 0 10px 0;">
        ${isCompleted ? 'Refund Processed Successfully' : 'Refund Request Registered'}
      </h2>
      <p style="text-align: center; color: #4b5563; font-size: 14px; margin: 0 0 24px 0; line-height: 1.5;">
        Dear <strong>${guestName}</strong>, ${
      isCompleted
        ? 'your refund for Bhitarkanika Safari booking has been approved and processed to your destination account.'
        : 'your refund request is under review and will be settled into your destination account shortly.'
    }
      </p>

      <div class="card">
        <div class="card-title">Refund Details</div>
        <table width="100%">
          <tr><td class="row-label">Refund Reference ID</td><td class="row-value" style="color:#065f46; font-size:15px;">#${refundId}</td></tr>
          <tr><td class="row-label">Booking ID</td><td class="row-value">#${bookingId}</td></tr>
          <tr><td class="row-label">Refund Amount</td><td class="row-value" style="color:#065f46; font-size:16px;">${rs(refundAmount)}</td></tr>
          <tr><td class="row-label">Refund Destination</td><td class="row-value" style="font-family:monospace;">${booking.refundUpi || 'Original Payment Source'}</td></tr>
          <tr><td class="row-label">Status</td><td class="row-value">${refundStatus}</td></tr>
          ${refundDetails.adminNote ? `<tr><td class="row-label">Admin Remarks</td><td class="row-value">${refundDetails.adminNote}</td></tr>` : ''}
        </table>
      </div>

      <div class="notice-box">
        <strong>&#8505; Note on Bank Settlement:</strong><br>
        UPI refunds reflect instantly or within a few hours. Direct bank/card settlements may take 1 to 3 banking days depending on your issuing bank.
      </div>

      <div class="btn-wrap">
        <a href="http://localhost:5173/profile" class="btn">View Refund Status in Dashboard &rarr;</a>
      </div>
    `;

    const mailOptions = {
      from: FROM_HEADER,
      to: booking.email,
      subject: `Refund Update: #${refundId} - ${refundStatus} (${rs(refundAmount)})`,
      html: emailWrapper(htmlContent, `Refund #${refundId} for booking #${bookingId}: ${refundStatus}`),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[emailService] Refund email sent to ${booking.email}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[emailService] Error sending refund email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send Password Reset OTP Email
 */
const sendPasswordResetOtpEmail = async (user, otp) => {
  try {
    if (!user || !user.email) return { success: false, error: 'No recipient email' };

    const userName = user.name || 'Valued Traveler';

    const htmlContent = `
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="display: inline-block; padding: 6px 16px; border-radius: 50px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0;">
          &#128274; Security Verification
        </span>
      </div>

      <h2 style="font-size: 22px; color: #0d3826; text-align: center; margin: 0 0 10px 0; font-family: Georgia, serif;">
        Password Reset Verification Code
      </h2>
      <p style="text-align: center; color: #4b5563; font-size: 14.5px; margin: 0 0 24px 0; line-height: 1.6;">
        Hello <strong>${userName}</strong>,<br>
        We received a request to reset your password for your <strong>Bhitarkanika National Park Safari</strong> account. Use the 6-digit verification code below to set your new password:
      </p>

      <div style="background: linear-gradient(135deg, #0d3826, #155e3b); border-radius: 12px; padding: 24px; text-align: center; margin: 0 auto 24px auto; max-width: 360px; box-shadow: 0 4px 15px rgba(13, 56, 38, 0.15);">
        <span style="display: block; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #f3e5ab; margin-bottom: 8px;">
          YOUR 6-DIGIT VERIFICATION CODE
        </span>
        <div style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #ffffff; padding: 6px 0;">
          ${otp}
        </div>
        <span style="display: block; font-size: 12px; color: #d6e8dd; margin-top: 8px;">
          &#9203; Valid for 15 minutes only
        </span>
      </div>

      <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 14px 18px; margin-bottom: 24px;">
        <strong style="color: #92400e; font-size: 13px;">&#9888; Security Notice:</strong>
        <p style="margin: 4px 0 0 0; font-size: 12.5px; color: #78350f; line-height: 1.5;">
          Never share this verification code with anyone. Bhitarkanika Tour staff will never ask for your password or OTP. If you did not request this password reset, please ignore this email or contact support.
        </p>
      </div>

      <div style="text-align: center; font-size: 12px; color: #9ca3af; margin-top: 20px;">
        This automated security code was generated for ${user.email}.
      </div>
    `;

    const mailOptions = {
      from: FROM_HEADER,
      to: user.email,
      subject: `Your Password Reset Verification Code: ${otp} - Bhitarkanika Safari`,
      html: emailWrapper(htmlContent, `Your verification code is ${otp}. Valid for 15 minutes.`),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[emailService] Password reset OTP email sent to ${user.email}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('[emailService] Error sending OTP email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  transporter,
  generateBookingTicketPdf,
  sendBookingConfirmationEmail,
  sendBookingCancellationEmail,
  sendRefundUpdateEmail,
  sendPasswordResetOtpEmail,
};
