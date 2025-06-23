import { type Express } from "express";
import request from "supertest";
import { createServer } from "../../src/app";
import { apiVersion, endPoint } from "../../src/utils/endpoints";

describe("Test Auth Services", () => {
  describe("Test the register service", () => {
    // TEST PASSED
    test.skip("should passe the register", async () => {
      const user = {
        email: "nasereddine.lakhal@blacode.com",
        password: "nasri",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Authentification.REGISTRATION}`)
        .send(user)
        .expect(201);
      console.log("checking the response", response);
    });

    test("should throw an error when register with same email and password", async () => {
      const user = {
        email: "nasereddine.lakhal@blacode.com",
        password: "nasri",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Authentification.REGISTRATION}`)
        .send(user)
        .expect(404);
      console.log("checking the response", response);
    });
    test("should throw an error when register with empty email", async () => {
      const user = {
        email: "",
        password: "nasri",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Authentification.REGISTRATION}`)
        .send(user)
        .expect(400);
    });
    test("should throw an error when register with empty password", async () => {
      const user = {
        email: "nasereddine.lakhal@blacode.com",
        password: "",
      };

      await request(createServer().app)
        .post(`${apiVersion}${endPoint.Authentification.REGISTRATION}`)
        .send(user)
        .expect(404);
    });
  });

  describe("Test the login service", () => {
    test("should passe the login", () => {});
  });
});
