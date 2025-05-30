// src/App.jsx
import { useEffect, useState } from "react";
import tenants from "./TenantConfig";

function App() {
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tenantKey = urlParams.get("tenant");

    if (tenantKey && tenants[tenantKey]) {
      setTenant(tenants[tenantKey]);

      // Load Chatwoot widget dynamically
      const s = document.createElement("script");
      s.src = `${tenants[tenantKey].chatwootBaseUrl}/packs/js/sdk.js`;
      s.async = true;
      s.onload = () => {
        window.$chatwoot.run({
          websiteToken: tenants[tenantKey].chatwootWebsiteToken,
          baseUrl: tenants[tenantKey].chatwootBaseUrl,
        });
      };
      document.body.appendChild(s);
    }
  }, []);

  if (!tenant) return <div>Invalid or missing tenant.</div>;
  return (
    <div style={{ backgroundColor: tenant.primaryColor, padding: "1rem" }}>
      <img src={tenant.logo} alt="Logo" style={{ height: "50px" }} />
      <h1>Welcome to the Affine Workspace</h1>
      <p>Support chat should load in the bottom-right corner.</p>
    </div>
  );
}

export default App;
