import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { carHireRoutesSample, type CarHireRoute } from "../shared/data/carHireRoutes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sortedRoutes: CarHireRoute[] = [...carHireRoutesSample]
  .sort((a, b) => a.route.localeCompare(b.route, "en", { sensitivity: "base" }))
  .map((route, index) => ({
    ...route,
    id: index + 1,
  }));

const tsFilePath = path.resolve(__dirname, "../shared/data/carHireRoutes.ts");
const csvFilePath = path.resolve(__dirname, "../attached_assets/pricing/airport-transfer-rates-sample.csv");

const escapeString = (value: string) => value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"");

const tsRoutes = sortedRoutes
  .map(
    (route) => `  {
    id: ${route.id},
    route: "${escapeString(route.route)}",
    distanceKm: ${route.distanceKm},
    priceUsd: ${route.priceUsd},
    priceUgx: ${route.priceUgx}
  }`,
  )
  .join(",\n");

const tsContent =
`export interface CarHireRoute {
  id: number;
  route: string;
  distanceKm: number;
  priceUsd: number;
  priceUgx: number;
}

export const carHireRoutesSample: CarHireRoute[] = [
${tsRoutes}
];
`;

fs.writeFileSync(tsFilePath, tsContent, "utf8");

const csvLines = [
  "S/N,Route,Distance (km),Price (USD),Price (UGX)",
  ...sortedRoutes.map((route) =>
    [
      route.id,
      `"${route.route.replace(/"/g, '""')}"`,
      route.distanceKm,
      route.priceUsd,
      route.priceUgx,
    ].join(","),
  ),
];

fs.writeFileSync(csvFilePath, csvLines.join("\n"), "utf8");

