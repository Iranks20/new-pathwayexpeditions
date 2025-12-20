import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Gauge, ShieldCheck, Headset, FileText } from "lucide-react";

const highlights = [
  {
    icon: Gauge,
    title: "Guaranteed Fleet Health",
    description: "Vehicles under three years with pre and post-trip diagnostics, detailed maintenance logs, and swap guarantee within hours.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Insurance",
    description: "Collision waiver, theft cover, and liability protection included. Optional personal effects and cross-border permits ready on request.",
  },
  {
    icon: Headset,
    title: "24/7 Control Room",
    description: "Live WhatsApp monitoring, emergency roadside support, and driver wellness checks in partnership with regional recovery teams.",
  },
  {
    icon: FileText,
    title: "Ready-to-Go Paperwork",
    description: "Digitized contracts, border documentation, fuel cards, and vetted driver profiles delivered ahead of every booking.",
  },
];

export default function CarHireHighlights() {
  return (
    <section className="py-16 md:py-24 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <Badge variant="outline" className="px-4 py-1.5 text-primary border-primary/40">Why Travellers Choose Us</Badge>
          <h2 className="text-3xl md:text-4xl font-bold">Enterprise-grade Car Hire, Built for East Africa</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Safety-first operations, premium hospitality touches, and technology-enabled support for executives, expedition teams, and self-drive explorers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {highlights.map((item) => (
            <Card key={item.title} className="h-full border-primary/10 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}


