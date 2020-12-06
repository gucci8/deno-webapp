import { superoak } from "./deps.js";
import { app } from "./app.js";

Deno.test("GET request to / should return 'Hello world!'", async () => {
  const testClient = await superoak(app);
  await testClient.get("/").expect("Hello world!");
});