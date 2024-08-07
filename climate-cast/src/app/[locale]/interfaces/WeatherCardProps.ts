import CityData from "./CityData";

export default interface WeatherCardProps {
    activeCity: CityData | null;
    selectedLanguage: string;
}
