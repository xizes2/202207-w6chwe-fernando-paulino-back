import { Request, Response } from "express";
import getRobots from "./robotsControllers";

describe("Given a robotsController middleware", () => {
  describe("When it receives a response object", () => {
    test("Then it should call the response mathod with status 200", () => {
      const req = {} as Partial<Request>;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const status = 200;

      getRobots(req as Request, res as unknown as Response);

      expect(res.status).toHaveBeenCalledWith(status);
    });
  });
});
