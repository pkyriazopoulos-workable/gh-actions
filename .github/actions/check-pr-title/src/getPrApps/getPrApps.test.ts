import getPrApps from "./getPrApps";

const mockSetFailed = jest.fn();
jest.mock("@actions/core", () => ({
  debug: jest.fn(),
  setFailed: (...args: unknown[]) => mockSetFailed(...args),
}));

describe("getPrApps", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the PR apps", () => {
    const apps = getPrApps({
      title: "app1, app2: PR title",
      apps: ["app1", "app2"],
    });

    expect(apps).toEqual(["app1", "app2"]);
  });

  it('should not fail when the PR title prefix is "shared"', () => {
    const apps = getPrApps({
      title: "shared: PR title",
      apps: ["app1", "app2"],
    });

    expect(apps).toEqual(["app1", "app2"]);
  });

  it('should not fail when the PR title prefix is "misc"', () => {
    const apps = getPrApps({
      title: "misc: PR title",
      apps: ["app1", "app2"],
    });

    expect(apps).toEqual([]);
  });

  describe("when the PR title does not contain the separator (:)", () => {
    it("should set the action as failed", () => {
      getPrApps({
        title: "app1 app2 PR title",
        apps: ["app1", "app2"],
      });

      expect(mockSetFailed).toHaveBeenCalledTimes(1);
      expect(mockSetFailed).toHaveBeenCalledWith(
        'PR title does not contain ":"'
      );
    });

    it("should return null", () => {
      const apps = getPrApps({
        title: "app1 app2 PR title",
        apps: ["app1", "app2"],
      });

      expect(apps).toBeNull();
    });
  });

  describe("when the PR title does not contain valid apps", () => {
    it("should set the action as failed", () => {
      getPrApps({
        title: "app3: PR title",
        apps: ["app1", "app2"],
      });

      expect(mockSetFailed).toHaveBeenCalledTimes(1);
      expect(mockSetFailed).toHaveBeenCalledWith(
        "PR title does not contain valid apps"
      );
    });

    it("should return null", () => {
      const apps = getPrApps({
        title: "app3: PR title",
        apps: ["app1", "app2"],
      });

      expect(apps).toBeNull();
    });
  });
});
