import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tourFAQs = [
  {
    question: "What types of tours do you offer?",
    answer: "We offer wildlife safaris, gorilla trekking, cultural tours, nature walks, bird watching, and boat cruises, all tailored to provide unique and immersive experiences across East Africa."
  },
  {
    question: "How do I book a tour with Pathway Expeditions Uganda?",
    answer: "You can easily book a tour through our website using the booking form, or contact our team directly via phone or email for personalized assistance in planning your adventure."
  },
  {
    question: "Are your tours suitable for all ages?",
    answer: "Yes, we offer tours that cater to various age groups and fitness levels. Our team will help recommend the best experiences based on your preferences and needs."
  },
  {
    question: "What is included in the tour packages?",
    answer: "Our packages typically include transportation, accommodation, guide services, park fees, and meals. Specific inclusions vary depending on the tour, so please inquire for details."
  }
];

const carHireFAQs = [
  {
    question: "What documents do I need to rent a vehicle?",
    answer: "You'll need a valid driver's license (held for at least 2 years), passport or ID, and a credit card for the security deposit. International visitors should have an International Driving Permit."
  },
  {
    question: "Is insurance included in the rental price?",
    answer: "Basic insurance is included in all our rental rates. Additional coverage options are available for enhanced protection during your journey."
  },
  {
    question: "Can I drive the rental vehicle across borders?",
    answer: "Yes, cross-border travel is permitted to Kenya, Rwanda, and Tanzania with prior arrangement. Additional documentation and fees may apply."
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 48 hours or more before pickup receive a full refund. Cancellations within 48 hours are subject to a 50% charge."
  }
];

export default function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-muted/30" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our tours and car hire services
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Tours & Travel</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {tourFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`tour-${index}`} className="border rounded-lg px-4 bg-card">
                  <AccordionTrigger className="text-left hover:no-underline" data-testid={`accordion-tour-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Car Hire</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {carHireFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`car-${index}`} className="border rounded-lg px-4 bg-card">
                  <AccordionTrigger className="text-left hover:no-underline" data-testid={`accordion-car-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
