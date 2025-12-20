import { Shield, Lock, Award, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const badges = [
  {
    icon: Shield,
    title: "Fully Insured",
    description: "Comprehensive coverage on all vehicles"
  },
  {
    icon: Lock,
    title: "Secure Booking",
    description: "SSL encrypted transactions"
  },
  {
    icon: Award,
    title: "Trusted Service",
    description: "10+ years in business"
  },
  {
    icon: CheckCircle2,
    title: "Verified Fleet",
    description: "All vehicles regularly inspected"
  }
];

export default function TrustBadges() {
  return (
    <section className="py-8 md:py-12 bg-muted/40 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {badges.map((badge, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 md:p-6 text-center">
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <badge.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-sm md:text-base mb-1">{badge.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{badge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

