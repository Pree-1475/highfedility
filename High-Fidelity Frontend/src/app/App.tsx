import { Routes, Route } from "react-router";
import { Layout } from "../components/layout/Layout";
import ScrollToTop from "../components/layout/ScrollToTop";
import GlobalLoader from "../components/ui/GlobalLoader";
import Home from "../pages/Home";
import Collections from "../pages/Collections";
import Services from "../pages/Services";
import CustomBats from "../pages/CustomBats";
import Training from "../pages/Training";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { BusinessSettingsProvider } from "../contexts/BusinessSettingsContext";
import { NavigationThemeProvider } from "../contexts/NavigationThemeContext";

export default function App() {
  return (
    <BusinessSettingsProvider>
      <NavigationThemeProvider>
        <GlobalLoader />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="collections" element={<Collections />} />
            <Route path="services" element={<Services />} />
            <Route path="custom-bats" element={<CustomBats />} />
            <Route path="training" element={<Training />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </NavigationThemeProvider>
    </BusinessSettingsProvider>
  );
}
