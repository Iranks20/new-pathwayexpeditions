/**
 * Brevo Email Service
 * 
 * To configure:
 * 1. Get your Brevo API key from https://app.brevo.com/settings/keys/api
 * 2. Set BREVO_API_KEY environment variable
 * 3. Set BREVO_FROM_EMAIL to your verified sender email
 * 4. Set BREVO_TO_EMAIL to where you want to receive booking notifications
 */

interface BookingData {
  type: "tour" | "vehicle";
  itemName: string;
  startDate: string;
  endDate: string;
  guests: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  driverOption?: "self-drive" | "chauffeur";
  addOns?: string[];
  pickupLocation?: string; // District ID or name
  dropoffLocation?: string; // District ID or name
  tourLocation?: string;
  tourDuration?: string;
  tourGroupSize?: string;
  tourBasePrice?: number | null;
  tourDescription?: string;
}


const BREVO_API_KEY = process.env.BREVO_API_KEY || "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";
// IMPORTANT: The sender email MUST be verified in your Brevo account
// Using verified sender: rankunda48@gmail.com
// Alternative verified sender: iirankunda21ap@student.kcu.ac.ug
// Go to: https://app.brevo.com/settings/senders to manage senders
const BREVO_FROM_EMAIL = process.env.BREVO_FROM_EMAIL || "rankunda48@gmail.com";
const BREVO_TO_EMAIL = process.env.BREVO_TO_EMAIL || "rankunda49@gmail.com";
const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const SUPPORT_EMAIL = "info@pathwayexpeditions.ug";
const SUPPORT_PHONE = "+256 753 904064";
const EMERGENCY_PHONE = "+256 753 904064";

/**
 * Send email via Brevo API
 */
async function sendEmail(
  to: string | string[],
  subject: string,
  htmlContent: string,
  textContent?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const recipients = Array.isArray(to) ? to.map(email => ({ email })) : [{ email: to }];
    
    const emailData = {
      sender: {
        name: "Pathway Expeditions Uganda",
        email: BREVO_FROM_EMAIL,
      },
      to: recipients,
      subject,
      htmlContent,
      textContent: textContent || htmlContent.replace(/<[^>]*>/g, ""),
    };

    console.log("Sending email to:", recipients.map(r => r.email).join(", "));
    console.log("From:", BREVO_FROM_EMAIL);
    console.log("Subject:", subject);
    
    const response = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    const responseText = await response.text();
    console.log("Brevo API Response Status:", response.status);
    console.log("Brevo API Response:", responseText);

    if (!response.ok) {
      let errorMessage = responseText;
      try {
        const errorJson = JSON.parse(responseText);
        errorMessage = errorJson.message || errorJson.error || responseText;
      } catch {
        // Keep original text if not JSON
      }
      console.error("Brevo API error:", response.status, errorMessage);
      return { success: false, error: errorMessage };
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      result = { messageId: responseText };
    }
    
    console.log("Email sent successfully. Message ID:", result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return { success: false, error: error.message || String(error) };
  }
}

/**
 * Generate booking notification email for admin
 */
function generateBookingNotificationEmail(data: BookingData): string {
  const startDate = new Date(data.startDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const endDate = new Date(data.endDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const days = Math.ceil(
    (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #059669; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .section { margin-bottom: 20px; }
        .label { font-weight: bold; color: #059669; }
        .value { margin-left: 10px; }
        .footer { background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 8px 8px; }
        .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Booking Request</h1>
        </div>
        <div class="content">
          <div class="section">
            <h2>Booking Details</h2>
            <p><span class="label">Type:</span> <span class="value">${data.type === "vehicle" ? "Car Hire" : "Tour"}</span></p>
            <p><span class="label">Item:</span> <span class="value">${data.itemName}</span></p>
            <p><span class="label">Start Date:</span> <span class="value">${startDate}</span></p>
            <p><span class="label">End Date:</span> <span class="value">${endDate}</span></p>
            <p><span class="label">Duration:</span> <span class="value">${days} day${days > 1 ? "s" : ""}</span></p>
            <p><span class="label">Number of Guests:</span> <span class="value">${data.guests}</span></p>
          </div>

          ${data.type === "tour" ? `
          <div class="section">
            <h2>Tour Details</h2>
            ${data.tourLocation ? `<p><span class="label">Location:</span> <span class="value">${data.tourLocation}</span></p>` : ""}
            ${data.tourDuration ? `<p><span class="label">Tour Duration:</span> <span class="value">${data.tourDuration}</span></p>` : ""}
            ${data.tourGroupSize ? `<p><span class="label">Group Size:</span> <span class="value">${data.tourGroupSize}</span></p>` : ""}
            ${data.tourBasePrice ? `<p><span class="label">Base Price:</span> <span class="value">$${data.tourBasePrice.toLocaleString()}</span></p>` : ""}
            ${data.tourDescription ? `<p><span class="label">Highlights:</span> <span class="value">${data.tourDescription}</span></p>` : ""}
          </div>
          ` : ""}

          ${data.type === "vehicle" ? `
          <div class="section">
            <h2>Vehicle Details</h2>
            <p><span class="label">Driver Option:</span> <span class="value">${data.driverOption === "chauffeur" ? "Chauffeur" : "Self-Drive"}</span></p>
            ${data.pickupLocation ? `<p><span class="label">Pick-up Location:</span> <span class="value">${data.pickupLocation}</span></p>` : ""}
            ${data.dropoffLocation ? `<p><span class="label">Drop-off Location:</span> <span class="value">${data.dropoffLocation}</span></p>` : ""}
            ${data.addOns && data.addOns.length > 0 ? `
              <p><span class="label">Add-ons:</span></p>
              <ul>
                ${data.addOns.map(addon => `<li>${addon}</li>`).join("")}
              </ul>
            ` : ""}
          </div>
          ` : ""}

          <div class="section">
            <h2>Customer Information</h2>
            <p><span class="label">Name:</span> <span class="value">${data.firstName} ${data.lastName}</span></p>
            <p><span class="label">Email:</span> <span class="value"><a href="mailto:${data.email}">${data.email}</a></span></p>
            <p><span class="label">Phone:</span> <span class="value"><a href="tel:${data.phone}">${data.phone}</a></span></p>
          </div>

          ${data.specialRequests ? `
          <div class="section">
            <h2>Special Requests</h2>
            <p>${data.specialRequests}</p>
          </div>
          ` : ""}

          <div class="highlight">
            <strong>Action Required:</strong> Please review this booking request and contact the customer to confirm availability and finalize the booking.
          </div>
        </div>
        <div class="footer">
          <p>This is an automated notification from Pathway Expeditions Uganda booking system.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate confirmation email for customer
 */
function generateConfirmationEmail(data: BookingData): string {
  const startDate = new Date(data.startDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const endDate = new Date(data.endDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const days = Math.ceil(
    (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #059669; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
        .section { margin-bottom: 25px; }
        .label { font-weight: bold; color: #059669; display: inline-block; min-width: 150px; }
        .value { color: #1f2937; }
        .footer { background: #f3f4f6; padding: 25px; border-radius: 0 0 8px 8px; }
        .support-box { background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0; }
        .support-box h3 { margin-top: 0; color: #1e40af; }
        .support-box a { color: #3b82f6; text-decoration: none; }
        .support-box a:hover { text-decoration: underline; }
        .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
        .button:hover { background: #047857; }
        .info-box { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Request Received</h1>
          <p>Thank you for choosing Pathway Expeditions Uganda!</p>
        </div>
        <div class="content">
          <p>Dear ${data.firstName} ${data.lastName},</p>
          
          <p>We have received your booking request and our team will review it shortly. We'll contact you within 24 hours to confirm availability and finalize your booking.</p>

          <div class="section">
            <h2>Your Booking Details</h2>
            <p><span class="label">Booking Type:</span> <span class="value">${data.type === "vehicle" ? "Car Hire" : "Tour Package"}</span></p>
            <p><span class="label">Service:</span> <span class="value">${data.itemName}</span></p>
            <p><span class="label">Start Date:</span> <span class="value">${startDate}</span></p>
            <p><span class="label">End Date:</span> <span class="value">${endDate}</span></p>
            <p><span class="label">Duration:</span> <span class="value">${days} day${days > 1 ? "s" : ""}</span></p>
            <p><span class="label">Number of Guests:</span> <span class="value">${data.guests}</span></p>
          </div>

          ${data.type === "tour" ? `
          <div class="section">
            <h2>Your Tour Details</h2>
            ${data.tourLocation ? `<p><span class="label">Destination:</span> <span class="value">${data.tourLocation}</span></p>` : ""}
            ${data.tourDuration ? `<p><span class="label">Tour Duration:</span> <span class="value">${data.tourDuration}</span></p>` : ""}
            ${data.tourGroupSize ? `<p><span class="label">Ideal Group Size:</span> <span class="value">${data.tourGroupSize}</span></p>` : ""}
            ${data.tourBasePrice ? `<p><span class="label">Package Price:</span> <span class="value">$${data.tourBasePrice.toLocaleString()} per person</span></p>` : ""}
          </div>
          ` : ""}

          ${data.type === "vehicle" ? `
          <div class="section">
            <h2>Vehicle Rental Details</h2>
            <p><span class="label">Driver Option:</span> <span class="value">${data.driverOption === "chauffeur" ? "Chauffeur Service" : "Self-Drive"}</span></p>
            ${data.pickupLocation ? `<p><span class="label">Pick-up Location:</span> <span class="value">${data.pickupLocation}</span></p>` : ""}
            ${data.dropoffLocation ? `<p><span class="label">Drop-off Location:</span> <span class="value">${data.dropoffLocation}</span></p>` : ""}
            ${data.addOns && data.addOns.length > 0 ? `
              <p><span class="label">Selected Add-ons:</span></p>
              <ul>
                ${data.addOns.map(addon => `<li>${addon}</li>`).join("")}
              </ul>
            ` : ""}
          </div>
          ` : ""}

          ${data.specialRequests ? `
          <div class="section">
            <h2>Your Special Requests</h2>
            <p>${data.specialRequests}</p>
          </div>
          ` : ""}

          <div class="info-box">
            <strong>📋 Next Steps:</strong>
            <ul>
              <li>Our team will review your booking request</li>
              <li>We'll contact you within 24 hours via email or phone</li>
              <li>Once confirmed, you'll receive a detailed itinerary and payment instructions</li>
            </ul>
          </div>

          <div class="support-box">
            <h3>Need Help? Contact Our Support Team</h3>
            <p>If you have any questions or need to make changes to your booking, please don't hesitate to reach out:</p>
            <p>
              <strong>📧 Email:</strong> <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a><br>
              <strong>📞 Phone:</strong> <a href="tel:${SUPPORT_PHONE.replace(/\s/g, "")}">${SUPPORT_PHONE}</a><br>
              <strong>🚨 Emergency (24/7):</strong> <a href="tel:${EMERGENCY_PHONE.replace(/\s/g, "")}">${EMERGENCY_PHONE}</a>
            </p>
            <p style="margin-top: 15px;">
              <a href="https://wa.me/256753904064?text=Hi,%20I%20have%20a%20question%20about%20my%20booking" class="button" target="_blank">Chat on WhatsApp</a>
            </p>
          </div>

          <div class="section">
            <p>We look forward to providing you with an unforgettable experience!</p>
            <p>Best regards,<br>
            <strong>The Pathway Expeditions Uganda Team</strong></p>
          </div>
        </div>
        <div class="footer">
          <p style="margin: 0; font-size: 12px; color: #6b7280;">
            Pathway Expeditions Uganda<br>
            ${SUPPORT_EMAIL} | ${SUPPORT_PHONE}<br>
            Kampala, Uganda
          </p>
          <p style="margin: 10px 0 0 0; font-size: 11px; color: #9ca3af;">
            This is an automated confirmation email. Please do not reply directly to this message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send booking notification to admin
 */
export async function sendBookingNotification(data: BookingData) {
  const subject = `New ${data.type === "vehicle" ? "Car Hire" : "Tour"} Booking Request - ${data.itemName}`;
  const htmlContent = generateBookingNotificationEmail(data);

  return sendEmail(BREVO_TO_EMAIL, subject, htmlContent);
}

/**
 * Send confirmation email to customer
 */
export async function sendBookingConfirmation(data: BookingData) {
  const subject = `Booking Request Received - Pathway Expeditions Uganda`;
  const htmlContent = generateConfirmationEmail(data);

  return sendEmail(data.email, subject, htmlContent);
}

/**
 * Send both notification and confirmation emails
 */
export async function sendBookingEmails(
  data: BookingData
): Promise<{
  notification: boolean;
  confirmation: boolean;
  errors?: { notification?: string; confirmation?: string };
}> {
  const [notificationResult, confirmationResult] = await Promise.all([
    sendBookingNotification(data),
    sendBookingConfirmation(data),
  ]);

  const errors: { notification?: string; confirmation?: string } = {};
  if (!notificationResult.success && notificationResult.error) {
    errors.notification = notificationResult.error;
  }
  if (!confirmationResult.success && confirmationResult.error) {
    errors.confirmation = confirmationResult.error;
  }

  return { 
    notification: notificationResult.success ?? false, 
    confirmation: confirmationResult.success ?? false,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
  };
}

