const session = require("supertest");
const app = require("../server");
const agent = session(app);

describe("Test de rutas", () => {
  const testActivity = {
    name: "Test Activity",
    difficulty: 1,
    duration: 1,
    season: "Verano",
    countries: ["ARG", "BRA"],
  };

  describe("POST /activities", () => {
    it("Responde con status 200", async () => {
      const response = await agent.post("/activities").send(testActivity);
      expect(response.status).toBe(200);
    });
  });

  describe("GET /activities", () => {
    it("Responde con un array de actividades", async () => {
      const response = await agent.get("/activities");
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
