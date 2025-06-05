
let url;

switch (process.env.REACT_APP_ENVIRONMENT) {
    case "local":
        url = "http://localhost:3000";
        break;
    case "dev":
        url = "https://prex.insightdata.fr";
        break;
    case "prod":
        url = "https://insightdata.fr";
        break;
    default:
        url = "https://prex.insightdata.fr";
}

export default url;