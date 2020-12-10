import { superoak, assertEquals, Application, Router } from "../deps.js";
import * as mws from "../middlewares/middlewares.js";
import * as api from "../routes/apis/summaryApi.js";
import { getNavbarContent } from "../routes/controllers/getNavbarContent.js";
import { showIndex } from "../routes/controllers/siteController.js";
import * as auth from "../services/authentication.js";
import * as rep from "../services/report.js";
import * as summ from "../services/summary.js";
import { dateValidate } from "../utils/dateValidate.js";

const app = new Application();
const router = new Router();

router.get('/', showIndex);

app.use(mws.authMiddleware);
app.use(mws.errorMiddleware);
app.use(mws.requestTimingMiddleware);
app.use(mws.serveStaticFilesMiddleware);

app.use(router.routes());




Deno.test("dateValidate returns null for invalid dates", () => {
  assertEquals(dateValidate(0,0,0), null);
  assertEquals(dateValidate(29,2,2019), null);
  assertEquals(dateValidate(30,13,2020), null);
});

Deno.test("dateValidate formats valid dates correctly", () => {
  assertEquals(dateValidate(1,1,1999), "1999-01-01");
  assertEquals(dateValidate(29,2,2020), "2020-02-29");
  assertEquals(dateValidate(31,12,2020), "2020-12-31");
});

Deno.test("getNavBarContent should return correct message when not logged in and variable loggedIn is false", async() => {
  let testClient = await superoak(app);
  let res = await testClient
    .get("/")
    .send("")
    .expect(200);

  let headers = res.headers["set-cookie"];
  let cookie = headers.split(";")[0];

  testClient = await superoak(app);
  await testClient
    .get("/")
    .set("Cookie", cookie)
    .expect(200);
});


/*
Deno.test("dateValidate returns null for invalid dates", () => {
  const testClient = await superoak(app);
  await testClient.get("/").expect("Hello world!");
});
*/

