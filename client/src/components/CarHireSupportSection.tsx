import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, MessageSquare, MapPinned, FileSignature } from "lucide-react";

const supportChannels = [
  {
    icon: PhoneCall,
    title: "Emergency Hotline",
    detail: "+256 753 904064",
    note: "Response under 10 minutes, tow or replacement arranged immediately.",
  },
  {
    icon: MessageSquare,
    title: "Live Trip Concierge",
    detail: "WhatsApp + Booking Portal",
    note: "Route re-planning, lodge coordination, and driver welfare monitoring 24/7.",
  },
  {
    icon: MapPinned,
    title: "Route Intelligence",
    detail: "Real-time traffic and weather alerts",
    note: "Daily briefing on park conditions, border updates, and safety advisories.",
  },
  {
    icon: FileSignature,
    title: "Policy Transparency",
    detail: "Digital contract vault",
    note: "Instant access to insurance certificates, driver records, and trip paperwork.",
  },
];

export default function CarHireSupportSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6">
            <Badge variant="secondary" className="px-4 py-1.5 text-primary bg-primary/10">Premium Support</Badge>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">Dedicated operations desk for every itinerary</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Each booking is assigned a trip commander who synchronizes daily vehicle checks, driver fatigue monitoring, lodge transfers, and backup logistics. We operate a live tracking dashboard and share proactive updates with your team.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg">Schedule Fleet Tour</Button>
              <Button size="lg" variant="outline">Download Policy Pack</Button>
            </div>
          </div>
          <div className="grid gap-4">
            {supportChannels.map((channel) => (
              <Card key={channel.title} className="border-primary/15 shadow-sm">
                <CardContent className="p-5 flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <channel.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{channel.title}</h3>
                    <p className="text-sm font-medium">{channel.detail}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{channel.note}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


