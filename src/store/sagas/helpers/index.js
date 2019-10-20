import config from "../../../config";

export const fetchData = async ({
  query,
  order = "desc",
  sort = "activity",
  site = "stackoverflow",
  filter = "default"
}) => {
  try {
    const {
      API_PATH,
      SEARCH_PATH,
      INTITLE_PARAMS,
      ORDER_PARAMS,
      SORT_PARAMS,
      SITE_PARAMS,
      FILTER_PARAMS
    } = config;

    const response = await fetch(
      `${API_PATH}${SEARCH_PATH}?${ORDER_PARAMS}${order}&${SORT_PARAMS}${sort}&${INTITLE_PARAMS}${query}&${SITE_PARAMS}${site}&${FILTER_PARAMS}${filter}`
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
