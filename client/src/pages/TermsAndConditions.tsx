import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen">
      <Header forceDark />
      <main className="pt-16">
        <section className="py-12 md:py-16 bg-muted/40 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <Card>
              <CardContent className="p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">1. Rental Agreement</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By booking a vehicle with Pathway Expeditions Uganda, you agree to these terms and conditions. 
                    The rental agreement becomes effective upon confirmation of your booking and payment of the required deposit.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">2. Driver Requirements</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Minimum age: 23 years old</li>
                    <li>Valid driver's license held for at least 2 years</li>
                    <li>International Driving Permit required for non-Ugandan licenses</li>
                    <li>All drivers must be present at vehicle pickup</li>
                    <li>Additional drivers may be added at no extra cost (subject to same requirements)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">3. Booking & Payment</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Bookings are confirmed upon receipt of booking request and payment confirmation</li>
                    <li>A security deposit is required at vehicle pickup</li>
                    <li>Deposit amount varies by vehicle type (typically $350-$800 USD)</li>
                    <li>Deposit is refundable upon vehicle return, subject to inspection</li>
                    <li>Full payment is due before or at vehicle pickup</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">4. Cancellation Policy</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Cancellations made 48 hours or more before pickup: Full refund</li>
                    <li>Cancellations within 48 hours of pickup: 50% charge</li>
                    <li>No-show bookings: Non-refundable</li>
                    <li>Refunds processed within 5-7 business days</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">5. Insurance & Coverage</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    All rentals include comprehensive insurance coverage:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Collision Damage Waiver (CDW)</li>
                    <li>Theft protection</li>
                    <li>Third-party liability insurance</li>
                    <li>24/7 roadside assistance</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    Additional coverage options are available upon request. Security deposit applies and is refundable 
                    subject to vehicle inspection upon return.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">6. Vehicle Use & Restrictions</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Vehicles must be used only on public roads and designated areas</li>
                    <li>Off-road driving is permitted only for designated 4x4 vehicles</li>
                    <li>Smoking is prohibited in all vehicles</li>
                    <li>Pets allowed only with prior arrangement and additional cleaning fee</li>
                    <li>Vehicles must not be used for commercial purposes without authorization</li>
                    <li>Maximum number of passengers as specified per vehicle</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">7. Mileage & Fuel Policy</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Daily mileage limits apply (typically 200-260 km per day)</li>
                    <li>Excess mileage charges: $0.50 per kilometer over limit</li>
                    <li>Fuel policy: Full-to-full (vehicle provided with full tank, must be returned full)</li>
                    <li>Fuel is not included in rental price</li>
                    <li>Refueling charges apply if vehicle returned with less than full tank</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">8. Cross-Border Travel</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Cross-border travel to Kenya, Rwanda, and Tanzania is permitted with prior arrangement:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Additional documentation required (border permits, insurance extensions)</li>
                    <li>Additional fees apply for cross-border travel</li>
                    <li>Minimum 7 days advance notice required</li>
                    <li>All border crossing documents provided by Pathway Expeditions</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">9. Vehicle Return</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Vehicle must be returned on the agreed date and time</li>
                    <li>Late returns may incur additional charges</li>
                    <li>Vehicle must be returned in the same condition as received (normal wear excepted)</li>
                    <li>Inspection will be conducted upon return</li>
                    <li>Security deposit refunded within 7-14 days after inspection</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">10. Damage & Accidents</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Any damage must be reported immediately to our 24/7 hotline</li>
                    <li>Police report required for all accidents</li>
                    <li>Insurance excess applies to damage claims</li>
                    <li>Renter is responsible for damage not covered by insurance</li>
                    <li>Replacement vehicle arranged if needed (subject to availability)</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">11. Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Pathway Expeditions Uganda is not liable for personal injury, loss of personal belongings, 
                    or indirect damages arising from vehicle rental. Renter assumes full responsibility for 
                    vehicle use and compliance with local traffic laws.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">12. Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For questions about these terms or your booking, contact us:
                  </p>
                  <ul className="list-none space-y-2 text-muted-foreground mt-2">
                    <li>Phone: +256 753 904064</li>
                    <li>Email: info@pathwayexpeditions.ug</li>
                    <li>Emergency Hotline: +256 753 904064 (24/7)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

