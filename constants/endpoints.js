require("dotenv").config();
// Default protocol is HTTP.
const baseUrl = `http://${process.env.PIHOLE_IP}:80`;

module.exports = {
  //baseurl
  endpoints: {
    // authentication: {

    // }
    // Methods used to get usage data from your Pi-hole | Doesn't exclude all endpoints
    metrics: {
      getHistory: () => `${baseUrl}/history`,
      getHistoryClients: () => `${baseUrl}/history/clients`,
      getHistoryDatabase: () => `${baseUrl}/history/database`,
      getHistoryDatabaseClients: () => `${baseUrl}/history/database/clients`,
      getQueryTypes: () => `${baseUrl}/stats/query_types`,
      getRecentBlocked: ({ count = "" } = {}) => {
        const queryParams = new URLSearchParams({
          count, // Number of requested blocked domains
        });
        return `${baseUrl}/stats/recent_blocked/?${queryParams}`;
      },
      getSummary: () => `${baseUrl}/stats/summary`,
      getTopClients: ({ blocked = "", count = "" } = {}) => {
        const queryParams = new URLSearchParams({
          blocked, // Return information about permitted or blocked queries
          count, // Number of requested items
        });
        return `${baseUrl}/stats/top_clients/?${queryParams}`;
      },
      getTopDomains: ({ blocked = "", count = "" } = {}) => {
        const queryParams = new URLSearchParams({
          blocked, // Return information about permitted or blocked queries
          count, // Number of requested items
        });
        return `${baseUrl}/stats/top_domains/?${queryParams}`;
      },
      getUpstreams: () => `${baseUrl}/stats/upstreams`,
    },
    // Methods used to control the behavior of your Pi-hole
    dns_control: {
      getStatus: () => `${baseUrl}/dns/blocking`,
      setStatus: ({ blocking = true, timer = null } = {}) => {
        const url = `${baseUrl}/dns/blocking`;
        const requestBody = JSON.stringify({ blocking, timer });

        return { url, requestBody }; // Make a POST request using Axios
      },
    },
    // Methods used to manage groups on your Pi-hole
    group_management: {},
    // Methods used to manage domains on your Pi-hole
    domain_management: {},
    // Methods used to manage clients on your Pi-hole,
    client_management: {},
    // Methods used to manage lists on your Pi-hole
    list_management: {},
    // Methods used to gather advanced data from your Pi-hole
    ftl_information: {},
    // Methods used to configure your Pi-hole
    pihole_configuration: {},
    // Methods used to gather advanced information about your network
    network_information: {},
    // Methods used to trigger certain actions on your Pi-hole
    actions: {},
    // DHCP
    dhcp: {
      getLeases: () => `${baseUrl}/dhcp/leases`,
      removeLease: ({ ip = "" } = {}) => {
        const queryParams = new URLSearchParams({
          ip, // IP address of lease to be modified
        });
        return `${baseUrl}/dhcp/leases/?${queryParams}`;
      },
    },
  },
};
