import "dotenv/config";
import express from "express";
// import Router from "express-promise-router";
import { GroupRouter } from "./router/group.router.js";
import { GroupRouter as MwGroupRouter } from "./router/group.router.mw.js";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());

app.use("/groups", GroupRouter().registerRoutes());
app.use("/mwgroups", MwGroupRouter().registerRoutes());

// // middleware poc
// const router = Router();
// app.use('/poc', router);
// router.use(async (req,res,next) => {
//   console.info("==========================");
//   console.group('before');
//   console.info('before before next');
//   await next();
//   console.info('before after next');
//   console.groupEnd('before');
// })

// router.get('/', async (req,res, next) => {
//   await new Promise((resolve,reject) => {
//     setTimeout(() => {
//       resolve();
//     },1000);
//   });
//   if (req.query.e) {
//     // works too
//     // next(Error('error!'));
//     // return;
//     throw Error('error!');
//   }
//   res.send('hola');
//   console.info('envio de datos');
//   console.info('luego del await');
//   next();
// })

// router.use(async (req,res,next) => {
//   console.group('after');
//   console.info('after before next');
//   await next();
//   console.info('after after next');
//   console.groupEnd('after');
// })

// router.use(async (err,req,res,next) => {
//   console.info('do error handling');
//   res.send('error');
// })

// // middleware poc
// const router2 = Router();
// app.use('/no', router2);
// router2.use((req,res,next) => {
//   console.info("==========================");
//   console.group('before');
//   console.info('before before next');
//   next();
//   console.info('before after next');
//   console.groupEnd('before');
// })

// router2.get('/',(req,res, next) => {
//   setTimeout(() => {
//     if (req.query.e) {
//       next(Error('error!'));
//       return;
//     }
//     res.send('hola');
//     console.info('envio de datos');
//     next();
//   },1000);
// })

// router2.use(async (req,res,next) => {
//   console.group('after');
//   console.info('after before next');
//   next();
//   console.info('after after next');
//   console.groupEnd('after');
// })

// router2.use(async (err,req,res,next) => {
//   console.info('do error handling');
//   res.send('error');
// })

app.listen(PORT, () => {
  console.log(`Express server running on port http://localhost:${PORT} 🚀`);
});
