import type { Express } from "express";
import { randomUUID } from "crypto";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendBookingEmails } from "./email";

export async function registerRoutes(app: Express): Promise<Server> {
  // health check
  app.get('/api/ping', (_req, res) => res.status(200).json({ ok: true }));
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.post("/api/bookings", async (req, res, next) => {
    try {
      const {
        type,
        itemName,
        startDate,
        endDate,
        guests,
        firstName,
        lastName,
        email,
        phone,
        specialRequests,
        driverOption,
        addOns,
      } = req.body ?? {};

      if (!type || (type !== "tour" && type !== "vehicle")) {
        return res.status(400).json({ message: "Invalid booking type" });
      }
      if (!itemName) {
        return res.status(400).json({ message: "Missing item name" });
      }
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start and end dates are required" });
      }
      if (!firstName || !lastName || !email || !phone) {
        return res.status(400).json({ message: "Contact information is required" });
      }
      if (type === "vehicle" && driverOption && driverOption !== "self-drive" && driverOption !== "chauffeur") {
        return res.status(400).json({ message: "Invalid driver option" });
      }
      if (addOns && !Array.isArray(addOns)) {
        return res.status(400).json({ message: "Add-ons must be an array" });
      }

      const id = randomUUID();
      const createdAt = new Date().toISOString();
      const booking = {
        id,
        type,
        itemName,
        startDate,
        endDate,
        guests,
        firstName,
        lastName,
        email,
        phone,
        specialRequests: specialRequests ?? "",
        driverOption: driverOption ?? "self-drive",
        addOns: Array.isArray(addOns) ? addOns : [],
        pickupLocation: req.body.pickupLocation,
        dropoffLocation: req.body.dropoffLocation,
        createdAt,
      };

      console.log("booking.created", booking);

      // Send emails via Brevo
      try {
        const emailResult = await sendBookingEmails({
          type,
          itemName,
          startDate,
          endDate,
          guests,
          firstName,
          lastName,
          email,
          phone,
          specialRequests: specialRequests ?? "",
          driverOption: driverOption ?? "self-drive",
          addOns: Array.isArray(addOns) ? addOns : [],
          pickupLocation: req.body.pickupLocation,
          dropoffLocation: req.body.dropoffLocation,
        });

        if (!emailResult.notification) {
          console.warn("Failed to send booking notification email to admin");
        }
        if (!emailResult.confirmation) {
          console.warn("Failed to send confirmation email to customer");
        }
      } catch (emailError) {
        console.error("Error sending emails:", emailError);
        // Don't fail the booking if email fails - booking is still created
      }

      return res.status(201).json({ id, message: "Booking received" });
    } catch (err) {
      next(err);
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
