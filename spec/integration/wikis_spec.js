const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";
const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;

describe("routes : wikis", () => {
  beforeEach(done => {
    this.user;
    this.wiki;
    sequelize.sync({ force: true }).then(res => {
      User.create({
        username: "tommychocolate",
        email: "chocolatetom@gmail.com",
        password: "123456789",
        role: "member"
      })
        .then(user => {
          this.user = user;
          request.get({
            url: "http://localhost:3000/auth/fake",
            form: {
              id: user.id,
              username: user.name,
              email: user.email,
              role: user.role
            }
          });
          Wiki.create({
            title: "JavaScript",
            body: "JS frameworks and fundamentals",
            userId: user.id
          })
            .then(wiki => {
              this.wiki = wiki;
              done();
            })
            .catch(err => {
              console.log(err);
              done();
            });
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
  });

  describe("GET /wikis", () => {
    it("should render the wiki index page", done => {
      request.get(base, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Wikis");
        done();
      });
    });
  });

  describe("GET /wikis/new", () => {
    it("should render a view with a new wiki form", done => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("JavaScript");
        done();
      });
    });
  });

  describe("POST /wikis/create", () => {
    it("should create a new wiki and redirect", done => {
      const options = {
        url: `${base}create`,
        form: {
          title: "New wiki",
          body: "New wiki body",
          userId: this.user.id
        }
      };
      request.post(options, (err, res, body) => {
        Wiki.findOne({ where: { title: "New wiki" } })
          .then(wiki => {
            expect(wiki.title).toBe("New wiki");
            expect(wiki.body).toBe("New wiki body");
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe("GET /wikis/:id", () => {
    it("should render a view with the selected wiki", done => {
      request.get(`${base}${this.wiki.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("JS frameworks");
        done();
      });
    });
  });
});
