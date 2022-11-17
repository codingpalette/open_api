import apiCreator from "./apiCreator";

const fetcher = (url: string) => apiCreator.get(url, { withCredentials: true }).then((response) => response.data);

export default fetcher;