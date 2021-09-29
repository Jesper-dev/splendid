import { useLocation } from "react-router-dom";

//Egen hook för att se url path
export const usePathname = () => {
  const location = useLocation();
  return location.pathname;
};
