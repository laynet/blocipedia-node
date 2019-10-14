const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {
  //#1
  describe("GET /", () => {
    //#2
    it("should return status code 200 nad have 'Welcome to Blodicpedia' in the body of the response", done => {
      //#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Weclome to Blocipedia");

        //#4
        done();
      });
    });
  });
});
