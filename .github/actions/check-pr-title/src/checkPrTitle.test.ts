import checkPrTitle from "./checkPrTitle";

const mockSetOutput = jest.fn();
jest.mock("@actions/core", () => ({
  debug: jest.fn(),
  setFailed: jest.fn(),
  setOutput: (...args: unknown[]) => mockSetOutput(...args),
}));

const mockPrTitle = jest.fn();
jest.mock("@actions/github", () => ({
  context: {
    payload: {
      pull_request: {
        get title() {
          return mockPrTitle();
        },
      },
    },
  },
}));

const mockGetAppNames = jest.fn();
jest.mock("@actions/glob", () => ({
  create: jest.fn().mockResolvedValue({
    glob: () => mockGetAppNames(),
  }),
}));

describe("checkPrTitle", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("should set PR apps as output", () => {
    const apps = ["app1", "app2"];

    const cases = [
      {
        title: "app2: PR title",
        expectedOutput: ["app2"],
      },
      {
        title: "app1, app2: PR title",
        expectedOutput: ["app1", "app2"],
      },
      {
        title: "shared: PR title",
        expectedOutput: ["app1", "app2"],
      },
      {
        title: "misc: PR title",
        expectedOutput: [],
      },
    ];

    Object.values(cases).forEach(({ title, expectedOutput }) => {
      it(`when the PR title is "${title}"`, async () => {
        mockPrTitle.mockReturnValue(title);
        mockGetAppNames.mockResolvedValue(apps);

        await checkPrTitle();

        expect(mockSetOutput).toHaveBeenCalledTimes(1);
        expect(mockSetOutput).toHaveBeenCalledWith("apps", expectedOutput);
      });
    });
  });

  describe("it should not set PR apps as output when", () => {
    it("the PR title is not valid", async () => {
      mockPrTitle.mockReturnValue(123);

      await checkPrTitle();

      expect(mockSetOutput).not.toHaveBeenCalled();
    });

    it("the glob fails", async () => {
      mockPrTitle.mockReturnValue("app1: PR title");
      mockGetAppNames.mockRejectedValue(new Error("Glob error"));

      await checkPrTitle();

      expect(mockSetOutput).not.toHaveBeenCalled();
    });

    it("the PR title does not contain any app", async () => {
      mockPrTitle.mockReturnValue("PR title");
      mockGetAppNames.mockResolvedValue(["app1", "app2"]);

      await checkPrTitle();

      expect(mockSetOutput).not.toHaveBeenCalled();
    });

    it("the PR title contains an app that is not in the glob", async () => {
      mockPrTitle.mockReturnValue("app3: PR title");
      mockGetAppNames.mockResolvedValue(["app1", "app2"]);

      await checkPrTitle();

      expect(mockSetOutput).not.toHaveBeenCalled();
    });
  });
});
