import express from "express";
const router = express.Router();

const timeLog = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

// 路由模块中间件
router.use(timeLog);


router.all("/examples", (res, req) => {
    //  throw new Error("BROKEN");
  req.send("router example");
});

/**
 * 参数
 */
router.get("/example/:exampleId/user/:userId", (res, req) => {
  const { exampleId, userId } = req.params;
  req.send("router example params");
});

/**
 * 中间件
 */

const cb0 = function (req, res, next) {
  console.log("CB0");
  next();
};

const cb1 = function (req, res, next) {
  console.log("CB1");
  next();
};

const cb2 = function (req, res) {
  res.send("Hello from C!");
};

router.get("middler", [cb0, cb1, cb2]); // or router.get("middler", cb0, cb1, cb2);

export default router