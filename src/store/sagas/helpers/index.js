import config from "../../../config";

export const fetchData = async ({
  actionPath,
  query,
  order = "desc",
  sort = "activity",
  site = "stackoverflow",
  filter = "!17vW0QPGOaUc(Oxq_4Jb7Cu8c0S_BUDx0c9lIuSu3uzgeP"
}) => {
  try {
    const {
      API_PATH,
      INTITLE_PARAMS,
      ORDER_PARAMS,
      SORT_PARAMS,
      SITE_PARAMS,
      FILTER_PARAMS
    } = config;

    const response = await fetch(
      `${API_PATH}${actionPath}?${ORDER_PARAMS}${order}&${SORT_PARAMS}${sort}&${SITE_PARAMS}${site}&${FILTER_PARAMS}${filter}&${
        query ? `&${INTITLE_PARAMS}${query}` : ""
      }`
    );

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
