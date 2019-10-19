const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

export const generateRequestTypes = action =>
  [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${action}_${type}`;
    return acc;
  }, {});
