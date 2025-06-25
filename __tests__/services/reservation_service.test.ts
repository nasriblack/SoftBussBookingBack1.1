import { describe } from "@jest/globals";

describe("Test the Reservation Service", () => {
  describe("should create a reservation", () => {
    test("should create a reservation", async () => {
      // Test implementation
    });

    test("should throw an error when creating a reservation with invalid data", async () => {
      // Test implementation
    });

    test("should throw an error when creating a reservation with an existing seat", async () => {
      // Test implementation
    });

    test("should throw an error when creating a reservation for a non-verified user", async () => {
      // Test implementation
    });

    test("should throw an error when creating a reservation for a non-existing user", async () => {
      // Test implementation
    });

    test("should throw an error when creating a reservation for a user with an existing reservation", async () => {
      // Test implementation
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
