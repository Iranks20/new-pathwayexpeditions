import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Download } from "lucide-react";
import { carHireRoutesSample, type CarHireRoute } from "@shared/data/carHireRoutes";
import { cn } from "@/lib/utils";

type SortKey = "route" | "distanceKm" | "priceUsd" | "priceUgx";

export default function CarHireRatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("route");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filteredRoutes = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const data = term.length
      ? carHireRoutesSample.filter((route) => route.route.toLowerCase().includes(term))
      : carHireRoutesSample.slice();

    return data.sort((a, b) => {
      const direction = sortDir === "asc" ? 1 : -1;
      if (sortKey === "route") {
        return a.route.localeCompare(b.route, "en", { sensitivity: "base" }) * direction;
      }
      // Type-safe access to numeric properties
      const aValue = sortKey === "distanceKm" ? a.distanceKm : sortKey === "priceUsd" ? a.priceUsd : a.priceUgx;
      const bValue = sortKey === "distanceKm" ? b.distanceKm : sortKey === "priceUsd" ? b.priceUsd : b.priceUgx;
      return (aValue - bValue) * direction;
    });
  }, [searchTerm, sortDir, sortKey]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const exportCsv = () => {
    const header = ["S/N", "Route", "Distance (km)", "Price (USD)", "Price (UGX)"];
    const rows = filteredRoutes.map((item, index) => [
      (index + 1).toString(),
      `"${item.route.replace(/"/g, '""')}"`,
      item.distanceKm.toString(),
      item.priceUsd.toString(),
      item.priceUgx.toString(),
    ]);
    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "airport-transfer-rates-sample.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header forceDark />
      <main className="pt-16">
        <PageHero
          title="Car Hire Rates"
          subtitle="Entebbe airport transfer & car hire tariff guide"
          backgroundImage={"https://res.cloudinary.com/dnjdl9nuo/image/upload/v1766338865/wildlife_33_vq2dgg.jpg"}
          backgroundVideo="https://res.cloudinary.com/dnjdl9nuo/video/upload/v1766398593/vid_1_cntt9e.mp4"
          backgroundVideoParallax={0.7}
          primaryCta={{ label: "Reserve a Vehicle", href: "/car-hire" }}
        />

        <section className="py-12 md:py-16 bg-muted/40 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">Airport Transfer Tariffs</p>
            <h1 className="text-3xl md:text-4xl font-bold">Entebbe International Airport Routes & Rates</h1>
            <p className="text-muted-foreground max-w-3xl">
              Valid 25 July 2025 – 24 July 2027. All prices are per vehicle and originate from Entebbe International Airport.
              Confirmations include licensed driver, insurance, and roadside assistance. Longer distances attract complimentary comfort stops.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold">Search & Export</h2>
                    <p className="text-sm text-muted-foreground">
                      Filter by destination, sort by distance or price, and export for offline reference.
                    </p>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <Input
                      placeholder="Search destination…"
                      value={searchTerm}
                      onChange={(event) => setSearchTerm(event.target.value)}
                      className="w-full md:w-64"
                    />
                    <Button variant="outline" className="gap-2" onClick={exportCsv}>
                      <Download className="h-4 w-4" />
                      Export CSV
                    </Button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted text-left text-sm uppercase tracking-wide text-muted-foreground">
                        <th className="px-4 py-3 font-medium w-16">S/N</th>
                        <th className="px-4 py-3 font-medium">
                          <button
                            className="flex items-center gap-1"
                            onClick={() => toggleSort("route")}
                            type="button"
                          >
                            Route
                            <ArrowUpDown className="h-3.5 w-3.5" />
                          </button>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <button
                            className="flex items-center gap-1"
                            onClick={() => toggleSort("distanceKm")}
                            type="button"
                          >
                            Distance (km)
                            <ArrowUpDown className="h-3.5 w-3.5" />
                          </button>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <button
                            className="flex items-center gap-1"
                            onClick={() => toggleSort("priceUsd")}
                            type="button"
                          >
                            Price (USD)
                            <ArrowUpDown className="h-3.5 w-3.5" />
                          </button>
                        </th>
                        <th className="px-4 py-3 font-medium">
                          <button
                            className="flex items-center gap-1"
                            onClick={() => toggleSort("priceUgx")}
                            type="button"
                          >
                            Price (UGX)
                            <ArrowUpDown className="h-3.5 w-3.5" />
                          </button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRoutes.map((route, index) => (
                        <tr
                          key={route.id}
                          className="border-b border-muted/40 text-sm hover:bg-primary/5 transition-colors"
                        >
                          <td className="px-4 py-3 font-medium">{index + 1}</td>
                          <td className="px-4 py-3">
                            <span className={cn("font-medium", sortKey === "route" && "text-primary")}>
                              {route.route}
                            </span>
                          </td>
                          <td className={cn("px-4 py-3 font-medium", sortKey === "distanceKm" && "text-primary")}>
                            {route.distanceKm.toLocaleString()}
                          </td>
                          <td className={cn("px-4 py-3 font-medium", sortKey === "priceUsd" && "text-primary")}>
                            ${route.priceUsd.toLocaleString()}
                          </td>
                          <td className={cn("px-4 py-3 font-medium", sortKey === "priceUgx" && "text-primary")}>
                            {route.priceUgx.toLocaleString()} UGX
                          </td>
                        </tr>
                      ))}
                      {!filteredRoutes.length && (
                        <tr>
                          <td className="px-4 py-6 text-center text-muted-foreground" colSpan={5}>
                            No matches found. Try a different destination.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
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


