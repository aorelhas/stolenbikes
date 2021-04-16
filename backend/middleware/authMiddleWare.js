const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req, res, next) => {
  let token = localStorage.getItem(
    'userInfo',
    JSON.stringify({ result, token })
  );

  console.log(token);
});

export { protect };
