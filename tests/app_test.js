import { assertEquals } from "../deps.js";
import { dateValidate } from "../utils/dateValidate.js";

Deno.test("dateValidate returns null for invalid dates", async() => {
  assertEquals(dateValidate(0,0,0), null);
  assertEquals(dateValidate(29,2,2019), null);
  assertEquals(dateValidate(30,13,2020), null);
});

Deno.test("dateValidate formats valid dates correctly", async() => {
  assertEquals(dateValidate(1,1,1999), "1999-01-01");
  assertEquals(dateValidate(29,2,2020), "2020-02-29");
  assertEquals(dateValidate(31,12,2020), "2020-12-31");
});