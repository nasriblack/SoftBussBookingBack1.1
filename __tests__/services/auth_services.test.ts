import request from "supertest";
import { createServer } from "../../src/app";
import { apiVersion, endPoint } from "../../src/utils/endpoints";
import HttpStatusCode from "../../src/utils/httpStatusCode";

describe("Test Auth Services", () => {
  describe("Test the register service", () => {
    // TEST PASSED
    test.skip("should passe the register", async () => {
      const user = {
        email: "nasereddine.lakhal@blacode.com",
        password: "nasri",
      };

      await request(createServer().app)
        .post(`${apiVersion}${endPoint.Authentification.REGISTRATION}`)
        .send(user)
        .expect(201);
    });

    test("should throw an error when register with same email and password", async () => {
      const user = {
        email: "nasereddine.lakhal@blacode.com",
        password: "nasri",
      };

      await request(createServer().app)
        .post(`${apiVersion}${endPoint.Authentification.REGISTRATION}`)
        .send(user)
        .expect(404);
    });
    test("should throw an error when register with empty email", async () => {
      const user = {
        email: "",
        password: "nasri",
      };

      await request(createServer().app)
        .post(`${apiVersion}${endPoint.Authentification.REGISTRATION}`)
        .send(user)
        .expect(HttpStatusCode.BAD_REQUEST);
    });
    test("should throw an error when register with empty password", async () => {
      const user = {
        email: "nasereddine.lakhal@blacode.com",
        password: "",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Authentification.REGISTRATION}`)
        .send(user)
        .expect(404);
      expect(response.body.error.message as string).toBe("User Already Exist");
    });
  });

  describe("Test the login service", () => {
    test("should passe the login", async () => {
      const user = {
        email: "nasereddine.lakhal@blacode.com",
        password: "nasri",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Authentification.LOGIN}`)
        .send(user)
        .expect(HttpStatusCode.CREATED);
      expect(response.body.data).toHaveProperty("token");
    });
    test("should throw an error with an empty email", async () => {
      const user = {
        email: "",
        password: "nasri",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Authentification.LOGIN}`)
        .send(user)
        .expect(HttpStatusCode.BAD_REQUEST);
      expect(response.body.error.message as string).toBe("email is required");
    });
    test("should throw an error with an empty password", async () => {
      const user = {
        email: "nasereddine.lakhal@blacode.com",
        password: "",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Authentification.LOGIN}`)
        .send(user)
        .expect(HttpStatusCode.BAD_REQUEST);
      expect(response.body.error.message as string).toBe(
        "password is required"
      );
    });
    test("should throw an error with an wrong email and password", async () => {
      const user = {
        email: "nasereddine.lakhal@blacode.com",
        password: "dazdazdaz",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Authentification.LOGIN}`)
        .send(user)
        .expect(HttpStatusCode.BAD_REQUEST);
      expect(response.body.error.message as string).toBe(
        "email or password is invalid"
      );
    });
  });
});
