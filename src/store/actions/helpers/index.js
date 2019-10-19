const act = (type, payload) => ({
  type,
  payload
});

export const getFetchActions = constants => ({
  request: req => act(constants.REQUEST, req),
  success: res => act(constants.SUCCESS, res),
  failure: res => act(constants.FAILURE, res)
});
