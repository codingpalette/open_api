import apiCreator from "./apiCreator";

const searchFetcher = (url: string, where: any) => {
  let addWhere = ""
  for (const [key, value] of Object.entries(where)) {
    if (value !== "") {
      addWhere += `${key}=${value}&`
    }
  }
  return apiCreator
    .get(`${url}?${addWhere}`, { withCredentials: true })
    .then((response) => response.data)
}

export default searchFetcher