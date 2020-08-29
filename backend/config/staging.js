// config.js
module.exports = {
  env: {
    envFilename: `.env.staging`
  },
  arp: {
    interface: "edge0",
    entry_interface: "iface"
  },
  watcher_apr: {
    path_to_watch: "/proc/net/arp"
  },
  watcher_leases: {
    path_to_watch: "/var/lib/misc/dnsmasq.leases"
  },
  general: {
    ipDnsServer: "10.10.0.1",
    tenant_id: process.env.TENANTID,
    //tenant_id: "Agri01",
    ipBackend: "172.19.0.4",
    portBackend: "4000",
    portGwApp: "3800"
  }
};