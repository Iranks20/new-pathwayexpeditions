/**
 * Test script to send booking emails
 * Run with: tsx server/test-booking.ts
 */

import { sendBookingEmails } from "./email.js";

const testBookingData = {
  type: "vehicle" as const,
  itemName: "Toyota Land Cruiser",
  startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
  guests: "4",
  firstName: "Innocent",
  lastName: "Irakinda",
  email: "irakindainnocent673@gmail.com",
  phone: "+256 700 123456",
  specialRequests: "Need child seat and GPS navigation. Prefer early morning pickup.",
  driverOption: "self-drive" as const,
  addOns: ["Chauffeur Guide", "Satellite Phone", "Child Seat"],
  pickupLocation: "Kampala",
  dropoffLocation: "Entebbe",
};

async function testBookingEmails() {
  console.log("Testing booking email flow...");
  console.log("API Key (first 20 chars):", process.env.BREVO_API_KEY?.substring(0, 20) || "Not set");
  console.log("From Email:", process.env.BREVO_FROM_EMAIL || "noreply@pathwayexpeditions.ug");
  console.log("Sending notification to:", process.env.BREVO_TO_EMAIL || "rankunda48@gmail.com");
  console.log("Sending confirmation to:", testBookingData.email);
  console.log("\n");

  try {
    const result = await sendBookingEmails(testBookingData);
    
    console.log("\n=== Results ===");
    if (result.notification) {
      console.log("✅ Booking notification email sent successfully to admin");
    } else {
      console.log("❌ Failed to send booking notification email");
      if (result.errors?.notification) {
        console.log("   Error:", result.errors.notification);
      }
    }

    if (result.confirmation) {
      console.log("✅ Booking confirmation email sent successfully to customer");
    } else {
      console.log("❌ Failed to send booking confirmation email");
      if (result.errors?.confirmation) {
        console.log("   Error:", result.errors.confirmation);
      }
    }

    console.log("\n=== Important Notes ===");
    console.log("1. Check spam/junk folders if emails don't appear");
    console.log("2. Verify sender email is verified in Brevo dashboard");
    console.log("3. Check Brevo dashboard for email delivery status");
    console.log("4. Free Brevo accounts have rate limits (300 emails/day)");
    
    console.log("\nTest completed!");
  } catch (error) {
    console.error("Error testing emails:", error);
  }
}

testBookingEmails();

