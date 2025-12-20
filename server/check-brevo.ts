/**
 * Check Brevo account status and sender verification
 * Run with: tsx server/check-brevo.ts
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY;
if (!BREVO_API_KEY) {
  console.error("❌ BREVO_API_KEY environment variable is required");
  process.exit(1);
}

async function checkBrevoAccount() {
  console.log("Checking Brevo account status...\n");

  try {
    // Check account info
    const accountResponse = await fetch("https://api.brevo.com/v3/account", {
      method: "GET",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
      },
    });

    if (accountResponse.ok) {
      const account = await accountResponse.json();
      console.log("✅ Account Status:");
      console.log("   Email:", account.email);
      console.log("   First Name:", account.firstName);
      console.log("   Last Name:", account.lastName);
      console.log("   Company:", account.companyName);
      console.log("   Plan:", account.plan?.type || "Free");
      console.log("");
    } else {
      console.log("❌ Could not fetch account info");
      const error = await accountResponse.text();
      console.log("   Error:", error);
    }

    // Check senders
    console.log("Checking verified senders...");
    const sendersResponse = await fetch("https://api.brevo.com/v3/senders", {
      method: "GET",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
      },
    });

    if (sendersResponse.ok) {
      const senders = await sendersResponse.json();
      console.log(`✅ Found ${senders.senders?.length || 0} sender(s):`);
      if (senders.senders && senders.senders.length > 0) {
        senders.senders.forEach((sender: any) => {
          console.log(`   - ${sender.email} (${sender.name})`);
          console.log(`     Status: ${sender.verified ? "✅ Verified" : "❌ Not Verified"}`);
          if (sender.verified) {
            console.log(`     Active: ${sender.active ? "Yes" : "No"}`);
          }
        });
      } else {
        console.log("   ⚠️  No senders found. You need to add and verify a sender email.");
      }
      console.log("");
    } else {
      console.log("❌ Could not fetch senders");
      const error = await sendersResponse.text();
      console.log("   Error:", error);
    }

    // Check email statistics
    console.log("Checking email statistics...");
    const statsResponse = await fetch("https://api.brevo.com/v3/statistics", {
      method: "GET",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
      },
    });

    if (statsResponse.ok) {
      const stats = await statsResponse.json();
      console.log("✅ Email Statistics:");
      console.log("   Sent today:", stats.sent || 0);
      console.log("   Delivered:", stats.delivered || 0);
      console.log("   Opened:", stats.opened || 0);
      console.log("   Clicked:", stats.clicked || 0);
      console.log("   Bounced:", stats.bounced || 0);
      console.log("   Spam:", stats.spam || 0);
      console.log("");
    }

    console.log("=== IMPORTANT: Troubleshooting Steps ===");
    console.log("1. Go to Brevo Dashboard: https://app.brevo.com/");
    console.log("2. Navigate to: Settings → Senders & IP → Senders");
    console.log("3. Add and verify your sender email address");
    console.log("4. Check 'Email Logs' to see delivery status");
    console.log("5. If emails are in spam, check SPF/DKIM records");
    console.log("");
    console.log("=== Current Configuration ===");
    console.log("From Email: rankunda48@gmail.com");
    console.log("To Email (Admin): rankunda48@gmail.com");
    console.log("To Email (Customer): irakindainnocent673@gmail.com");
    console.log("");
    console.log("💡 Tip: Use an email you own and have verified in Brevo as the sender.");

  } catch (error: any) {
    console.error("Error checking Brevo account:", error.message);
  }
}

checkBrevoAccount();

