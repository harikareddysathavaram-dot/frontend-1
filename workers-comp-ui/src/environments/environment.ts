export const environment = {
  // true  = every service returns mock data from core/mock-data.ts
  // false = services call the real backend through the Ocelot gateway
  useMock: true,
  apiUrl: 'http://localhost:5000'   // <-- replace with your Ocelot gateway URL
};
