export default interface ReverseGeocode {
  latitude: number;
  longitude: number;
  lookupSource: string;
  localityLanguageRequested: string;
  continent: string;
  continentCode: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  city: string;
  locality: string;
  postcode: string;
  plusCode: string;

  localityInfo: {administrative: any[], informative: any[]};
}