import { useEffect } from "react";
import { useLocation, useNavigation } from "react-router-dom";

/**
 * Scrolls to top when the route changes and the navigation finishes.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigation = useNavigation();

  useEffect(() => {
    // Wait until navigation finishes
    if (navigation.state === "idle") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, navigation.state]);

  return null;
}