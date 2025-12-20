import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const carHireFAQs = [
  {
    question: "What documents do I need to rent a vehicle?",
    answer: "You'll need a valid driver's license (held for at least 2 years), passport or ID, and a credit card for the security deposit. International visitors should have an International Driving Permit."
  },
  {
    question: "Is insurance included in the rental price?",
    answer: "Basic insurance is included in all our rental rates. Additional coverage options are available for enhanced protection during your journey. Each vehicle includes collision damage waiver, theft cover, and liability protection."
  },
  {
    question: "Can I drive the rental vehicle across borders?",
    answer: "Yes, cross-border travel is permitted to Kenya, Rwanda, and Tanzania with prior arrangement. Additional documentation and fees may apply. We provide border crossing permits and necessary paperwork."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 48 hours or more before pickup receive a full refund. Cancellations within 48 hours are subject to a 50% charge. No-show bookings are non-refundable."
  },
  {
    question: "What is the minimum age to rent a vehicle?",
    answer: "The minimum age is 23 years old, and you must have held a valid driver's license for at least 2 years. Drivers under 25 may incur additional fees."
  },
  {
    question: "What is included in the rental price?",
    answer: "All rentals include comprehensive insurance, 24/7 roadside assistance, unlimited driver swaps, GPS navigation, and vehicle health inspection. Fuel is not included and follows a full-to-full policy."
  },
  {
    question: "Are there mileage limits?",
    answer: "Yes, each vehicle has a daily mileage limit (typically 200-260 km per day depending on the vehicle). Excess mileage charges apply for additional kilometers. Weekly and monthly rentals offer more flexibility."
  },
  {
    question: "What happens if the vehicle breaks down?",
    answer: "We provide 24/7 roadside assistance with guaranteed response times. In Kampala, we aim for recovery within 90 minutes. For remote locations, we coordinate with regional recovery teams. A replacement vehicle will be arranged if needed."
  },
  {
    question: "Can I add additional drivers?",
    answer: "Yes, you can add unlimited additional drivers at no extra cost. All drivers must meet age and license requirements and be present at vehicle pickup."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit cards (Visa, Mastercard), bank transfers, and mobile money. A security deposit is required at pickup, which is refunded upon vehicle return (subject to inspection)."
  }
];

export default function CarHireFAQSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            Help & Support
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about renting a vehicle with us
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {carHireFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`car-hire-${index}`} className="border rounded-lg px-4 md:px-6 bg-card">
                <AccordionTrigger className="text-left hover:no-underline py-4 md:py-6" data-testid={`accordion-car-hire-${index}`}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 md:pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

