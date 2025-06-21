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
export interface PassInfo {
  startUTC: number;
  endUTC: number;
  maxUTC: number;
  duration: number;
  maxEl: number;
  mag: number;
  satname: string;
  // Start position
  startAz: number;
  startAzCompass: string;
  startEl: number;
  // Max position
  maxAz: number;
  maxAzCompass: string;
  // End position
  endAz: number;
  endAzCompass: string;
  endEl: number;
  // Visibility start (when satellite becomes visible)
  startVisibility?: number;
}

export interface PassesResponse {
  info: {
    satname: string;
    transactionscount: number;
  };
  passes: PassInfo[];
  satelliteInfo?: {
    name: string;
    category: string;
  };
}

export interface TLEInfo {
  satid: number;
  satname: string;
  transactionscount: number;
}

export interface TLEResponse {
  info: TLEInfo;
  tle: string;
}
