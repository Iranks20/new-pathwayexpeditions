export interface PickupLocation {
  id: string;
  name: string;
  type: "airport" | "city" | "hotel" | "office";
  address: string;
  city: string;
  coordinates?: { lat: number; lng: number };
  fee?: number; // Additional fee in USD if any
}

export const pickupLocations: PickupLocation[] = [
  {
    id: "entebbe-airport",
    name: "Entebbe International Airport",
    type: "airport",
    address: "Entebbe International Airport",
    city: "Entebbe",
    coordinates: { lat: 0.0424, lng: 32.4435 },
  },
  {
    id: "kampala-city-center",
    name: "Kampala City Center",
    type: "city",
    address: "Kampala Road, City Center",
    city: "Kampala",
    coordinates: { lat: 0.3136, lng: 32.5811 },
  },
  {
    id: "kampala-office",
    name: "Pathway Expeditions Office",
    type: "office",
    address: "Kampala, Uganda",
    city: "Kampala",
    coordinates: { lat: 0.3136, lng: 32.5811 },
  },
  {
    id: "serena-hotel",
    name: "Serena Hotel Kampala",
    type: "hotel",
    address: "Kintu Road, Kampala",
    city: "Kampala",
    coordinates: { lat: 0.3156, lng: 32.5822 },
    fee: 10,
  },
  {
    id: "lake-victoria-serena",
    name: "Lake Victoria Serena Hotel",
    type: "hotel",
    address: "Kigo, Entebbe Road",
    city: "Kigo",
    coordinates: { lat: 0.1833, lng: 32.5167 },
    fee: 15,
  },
  {
    id: "speke-resort",
    name: "Speke Resort & Conference Centre",
    type: "hotel",
    address: "Munyonyo, Kampala",
    city: "Kampala",
    coordinates: { lat: 0.1833, lng: 32.6333 },
    fee: 12,
  },
  {
    id: "custom-location",
    name: "Custom Location",
    type: "city",
    address: "Specify in special requests",
    city: "Custom",
    fee: 20,
  },
];

export const defaultPickupLocation = pickupLocations[0]; // Entebbe Airport

