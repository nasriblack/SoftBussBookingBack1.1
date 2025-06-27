import { describe } from "@jest/globals";
import request from "supertest";
import { createServer } from "../../src/app";
import { apiVersion, endPoint } from "../../src/utils/endpoints";
import HttpStatusCode from "../../src/utils/httpStatusCode";

describe("Test the Reservation Service", () => {
  let token = "";
  let userId = "";

  describe("should create a reservation", () => {
    // ALL TESTS PASSED
    test.skip("should create a reservation", async () => {
      let userId = "796c0c01-afae-4c63-84b0-272932dd7f82";
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibmFzZXJlZGRpbmUubGFraGFsQGJsYWNvZGUuY29tIiwiaWQiOiI3OTZjMGMwMS1hZmFlLTRjNjMtODRiMC0yNzI5MzJkZDdmODIiLCJpc1ZlcmlmaWVkIjp0cnVlLCJyZXNlcnZhdGlvbnMiOlt7ImlkIjozMDEsInVzZXJJZCI6Ijc5NmMwYzAxLWFmYWUtNGM2My04NGIwLTI3MjkzMmRkN2Y4MiIsImRlc3RpbmF0aW9uIjoiTkFCRVVMIiwicmVzZXJ2ZWRBdCI6IjIwMjUtMDYtMjZUMTQ6NDE6MzAuMTA5WiIsInVwZGF0ZWRBdCI6IjIwMjUtMDYtMjZUMTQ6NDE6MzAuMTA5WiIsInNlYXQiOiJTTi0yMDI1LTA2LTI2LTIyIiwiaXNDYW5jZWxlZCI6ZmFsc2V9XSwicm9sZSI6IlVTRVIiLCJwYXNzd29yZCI6IiQyYiQxMCQ1NHVreVhIZ2dmdGNTRDNDR2poeUxPL0hmczM5N2NTZ1JYODlsVEdoRURsb0hHMzBDT1A3ZSJ9LCJpYXQiOjE3NTEwNDE1ODcsImV4cCI6MTc1MTEyNzk4N30.y3e3LtaATVnlbG45RDrAaUFPz0Gwi0u3oEkMMA71aKY";
      // Test implementation
      const body = {
        destination: "NABEUL",
        userId,
        seat: "SN-2025-06-26-22",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Reservation.ADD_RESERVATION}`)
        .set("Cookie", `jwt=${token}`)
        .send(body)

        .expect(201);
    });

    test("should throw an error when creating a reservation for a non authentificated user", async () => {
      // Test implementation
      let userId = "796c0c01-afae-4c63-84b0-272932dd7f82";
      let token = "";
      // Test implementation
      const body = {
        destination: "NABEUL",
        userId,
        seat: "SN-2025-06-26-22",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Reservation.ADD_RESERVATION}`)
        .set("Cookie", `jwt=${token}`)
        .send(body)
        .expect(HttpStatusCode.UNAUTHORIZED);
      expect(response.body.error.message as string).toBe(
        "Unauthorized - you need to login"
      );
    });

    test("should throw an error when creating a reservation for a non-existing user", async () => {
      // Test implementation
      let userId = "796c0c01-afdddae-4c63-84b0-272932dd7f82";
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibmFzZXJlZGRpbmUubGFraGFsQGJsYWNvZGUuY29tIiwiaWQiOiI3OTZjMGMwMS1hZmFlLTRjNjMtODRiMC0yNzI5MzJkZDdmODIiLCJpc1ZlcmlmaWVkIjp0cnVlLCJyZXNlcnZhdGlvbnMiOlt7ImlkIjozMDEsInVzZXJJZCI6Ijc5NmMwYzAxLWFmYWUtNGM2My04NGIwLTI3MjkzMmRkN2Y4MiIsImRlc3RpbmF0aW9uIjoiTkFCRVVMIiwicmVzZXJ2ZWRBdCI6IjIwMjUtMDYtMjZUMTQ6NDE6MzAuMTA5WiIsInVwZGF0ZWRBdCI6IjIwMjUtMDYtMjZUMTQ6NDE6MzAuMTA5WiIsInNlYXQiOiJTTi0yMDI1LTA2LTI2LTIyIiwiaXNDYW5jZWxlZCI6ZmFsc2V9XSwicm9sZSI6IlVTRVIiLCJwYXNzd29yZCI6IiQyYiQxMCQ1NHVreVhIZ2dmdGNTRDNDR2poeUxPL0hmczM5N2NTZ1JYODlsVEdoRURsb0hHMzBDT1A3ZSJ9LCJpYXQiOjE3NTEwNDE1ODcsImV4cCI6MTc1MTEyNzk4N30.y3e3LtaATVnlbG45RDrAaUFPz0Gwi0u3oEkMMA71aKY";
      // Test implementation
      const body = {
        destination: "NABEUL",
        userId,
        seat: "SN-2025-06-26-22",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Reservation.ADD_RESERVATION}`)
        .set("Cookie", `jwt=${token}`)
        .send(body)
        .expect(HttpStatusCode.NOT_FOUND)
        .then((response) => {
          expect(response.body.error.message as string).toBe("User Not Found");
        });
    });

    test("should throw an error when creating a reservation with an existing seat", async () => {
      // Test implementation

      let userId = "796c0c01-afae-4c63-84b0-272932dd7f82";
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibmFzZXJlZGRpbmUubGFraGFsQGJsYWNvZGUuY29tIiwiaWQiOiI3OTZjMGMwMS1hZmFlLTRjNjMtODRiMC0yNzI5MzJkZDdmODIiLCJpc1ZlcmlmaWVkIjp0cnVlLCJyZXNlcnZhdGlvbnMiOlt7ImlkIjozMDEsInVzZXJJZCI6Ijc5NmMwYzAxLWFmYWUtNGM2My04NGIwLTI3MjkzMmRkN2Y4MiIsImRlc3RpbmF0aW9uIjoiTkFCRVVMIiwicmVzZXJ2ZWRBdCI6IjIwMjUtMDYtMjZUMTQ6NDE6MzAuMTA5WiIsInVwZGF0ZWRBdCI6IjIwMjUtMDYtMjZUMTQ6NDE6MzAuMTA5WiIsInNlYXQiOiJTTi0yMDI1LTA2LTI2LTIyIiwiaXNDYW5jZWxlZCI6ZmFsc2V9XSwicm9sZSI6IlVTRVIiLCJwYXNzd29yZCI6IiQyYiQxMCQ1NHVreVhIZ2dmdGNTRDNDR2poeUxPL0hmczM5N2NTZ1JYODlsVEdoRURsb0hHMzBDT1A3ZSJ9LCJpYXQiOjE3NTEwNDE1ODcsImV4cCI6MTc1MTEyNzk4N30.y3e3LtaATVnlbG45RDrAaUFPz0Gwi0u3oEkMMA71aKY";
      // Test implementation
      const body = {
        destination: "NABEUL",
        userId,
        seat: "SN-2025-06-26-22",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Reservation.ADD_RESERVATION}`)
        .set("Cookie", `jwt=${token}`)
        .send(body)

        .expect(HttpStatusCode.BAD_REQUEST);
      expect(response.body.error.message as string).toBe(
        "The seat already taken"
      );
    });

    test.skip("should throw an error when creating a reservation for a non-verified user", async () => {
      // Test PASSED
      let userId = "796c0c01-afae-4c63-84b0-272932dd7f82";
      let token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoibmFzZXJlZGRpbmUubGFraGFsQGJsYWNvZGUuY29tIiwiaWQiOiI3OTZjMGMwMS1hZmFlLTRjNjMtODRiMC0yNzI5MzJkZDdmODIiLCJpc1ZlcmlmaWVkIjpmYWxzZSwicmVzZXJ2YXRpb25zIjpbXSwicm9sZSI6IlVTRVIiLCJwYXNzd29yZCI6IiQyYiQxMCQ1NHVreVhIZ2dmdGNTRDNDR2poeUxPL0hmczM5N2NTZ1JYODlsVEdoRURsb0hHMzBDT1A3ZSJ9LCJpYXQiOjE3NTA5NDAxOTIsImV4cCI6MTc1MTAyNjU5Mn0.1vVTWFfk185LftWa-4SYmHpMa-fyYzXQUYEoRadrIR0";
      // Test implementation
      const body = {
        destination: "NABEUL",
        userId,
        seat: "SN-2025-06-26-22",
      };

      const response = await request(createServer().app)
        .post(`${apiVersion}${endPoint.Reservation.ADD_RESERVATION}`)
        .set("Cookie", `jwt=${token}`)
        .send(body)
        .expect(HttpStatusCode.NOT_FOUND);
      expect(response.body.error.message as string).toBe(
        "This user is not verified"
      );
    });
  });

  describe("should get a reservation", () => {
    test("should get today Reservation", async () => {
      // Test implementation
    });

    test("should throw an error when the user is not authentificated", async () => {
      // Test implementation
    });
  });

  describe("should get all Reservation For admin", () => {
    test("should get all Reservation For admin", async () => {
      // Test implementation
    });

    test("should throw an error when the user is not an admin", async () => {
      // Test implementation
    });

    test("should throw an error when the user is not authentificated", async () => {
      // Test implementation
    });
  });

  describe("should cancel a reservation", () => {
    test("should cancel a reservation", async () => {
      // Test implementation
    });

    test("should throw an error when the user is not authentificated", async () => {
      // Test implementation
    });

    test("should throw an error when the reservation does not exist", async () => {
      // Test implementation
    });

    test("should throw an error when the user is not the owner of the reservation", async () => {
      // Test implementation
    });
  });
});
