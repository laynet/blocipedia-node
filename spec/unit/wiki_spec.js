const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;
const sequelize = require("../../src/db/models/index").sequelize;

describe("Wiki", () => {
  beforeEach(done => {
    this.wiki;
    this.user;

    sequelize.sync({ force: true }).then(res => {
      User.create({
        username: "catbatmat",
        email: "catmat@gmail.com",
        password: "catmat900",
        role: "member"
      }).then(user => {
        this.user = user;
        Wiki.create({
          title: "JavaScript",
          body: "JS frameworks and fundamentals",
          userId: user.id
        }).then(wiki => {
          this.wiki = wiki;
          done();
        });
      });
    });
  });

  describe("#create()", () => {
    it("should create a wiki object and store it in the database", done => {
      Wiki.create({
        title: "Created wiki",
        body: "Created wiki description"
      })
        .then(newWiki => {
          expect(newWiki.title).toBe("Created wiki");
          expect(newWiki.body).toBe("Created wiki description");
          done();
        })
        .catch(err => {
          expect(err).toBeNull();
          console.log(err);
          done();
        });
    });

    it("should not create a wiki without a description", done => {
      Wiki.create({
        title: "Wiki without a description"
      })
        .then(newWiki => {
          done();
        })
        .catch(err => {
          expect(err.message).toContain("Wiki.body cannot be null");
          done();
        });
    });
  });
});
