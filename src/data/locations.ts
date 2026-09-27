export interface ServiceArea {
  pincode: string;
  locality: string;
  city: string;
  isAvailable: boolean;
  estimatedTime: string;
}

export const COVERED_PINCODES: Record<string, ServiceArea> = {
  "110001": { pincode: "110001", locality: "Connaught Place / Central Metro", city: "Metro City", isAvailable: true, estimatedTime: "Pickup within 30-45 mins" },
  "110016": { pincode: "110016", locality: "Hauz Khas / Green Park", city: "Metro City", isAvailable: true, estimatedTime: "Pickup within 30-45 mins" },
  "110020": { pincode: "110020", locality: "Okhla / South District", city: "Metro City", isAvailable: true, estimatedTime: "Pickup within 45-60 mins" },
  "110075": { pincode: "110075", locality: "Dwarka Sector 10-22", city: "Metro City", isAvailable: true, estimatedTime: "Pickup within 45-60 mins" },
  "110085": { pincode: "110085", locality: "Rohini Sector 7-15", city: "Metro City", isAvailable: true, estimatedTime: "Pickup within 45-60 mins" },
  "122001": { pincode: "122001", locality: "DLF Cyber City / Sector 29", city: "Gurugram Hub", isAvailable: true, estimatedTime: "Pickup within 30-60 mins" },
  "122018": { pincode: "122018", locality: "Sohna Road / Golf Course Ext.", city: "Gurugram Hub", isAvailable: true, estimatedTime: "Pickup within 45-60 mins" },
  "201301": { pincode: "201301", locality: "Noida Sector 18 / Sector 62", city: "Noida Hub", isAvailable: true, estimatedTime: "Pickup within 45-60 mins" },
  "400001": { pincode: "400001", locality: "Fort / Colaba", city: "South Metro", isAvailable: true, estimatedTime: "Pickup within 30-45 mins" },
  "400050": { pincode: "400050", locality: "Bandra West / Khar", city: "Suburban Metro", isAvailable: true, estimatedTime: "Pickup within 30-45 mins" },
  "560001": { pincode: "560001", locality: "MG Road / Indiranagar", city: "Silicon Hub", isAvailable: true, estimatedTime: "Pickup within 30-45 mins" },
  "560100": { pincode: "560100", locality: "Electronic City / HSR Layout", city: "Silicon Hub", isAvailable: true, estimatedTime: "Pickup within 45-60 mins" }
};

export const CITIES_SERVED = [
  { name: "Central Metro Region", count: "45+ Localities Covered", icon: "Building2" },
  { name: "North & West Suburbs", count: "38+ Localities Covered", icon: "MapPin" },
  { name: "South Tech Corridor", count: "50+ Localities Covered", icon: "Cpu" },
  { name: "Eastern Suburbs", count: "25+ Localities Covered", icon: "Compass" }
];
