import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
registerApplication({
  name: "@sonata/homepage",
  app: () => System.import("@sonata/homepage"),
  activeWhen: (location) => {
  // Activate when the path is the main page or root ("/")
    return location.pathname === "/" || location.pathname === "/homepage";
  }, // Display on the main page
  customProps: {
    // Add custom props if needed
  },
});
registerApplication({
  name: "@sonata/footer",
  app: () => System.import("@sonata/footer"),
  activeWhen: ["/"], // Display footer on all pages
  customProps: {
    // Add custom props if needed
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
