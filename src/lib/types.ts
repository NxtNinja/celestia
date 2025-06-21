export interface Satellite {
  satid: number;
  satname: string;
  intDesignator: string;
  launchDate: string;
  satlat: number;
  satlng: number;
  satalt: number;
}

export interface SatelliteResponse {
  info: {
    category: string;
    transactionscount: number;
    satcount: number;
  };
  above: Satellite[];
}
