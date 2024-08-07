import CityData from "./CityData";

export default interface SideBarProps {
    activeCity: CityData | null;
    setActiveCity: (value: CityData | null) => void;
    data: CityData[];
}
