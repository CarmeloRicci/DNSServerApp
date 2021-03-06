// config.js
module.exports = {
  env: {
    envFilename: `.env.production`
  },
  arp: {
    interface: "edge0",
    entry_interface: "iface"
  },
  watcher: {
    path_to_watch: "/proc/net/arp",
    leases_path: "/var/lib/misc/dnsmasq.leases"
  },
  general: {
    ipDnsServer: "10.10.0.1"
  }
};
