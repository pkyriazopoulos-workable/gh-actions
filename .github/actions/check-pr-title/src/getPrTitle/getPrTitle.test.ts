import getPrTitle from './getPrTitle';

const mockSetFailed = jest.fn();
jest.mock('@actions/core', () => ({
  debug: jest.fn(),
  setFailed: (...args: unknown[]) => mockSetFailed(...args)
}));

const mockPrTitle = jest.fn();
jest.mock('@actions/github', () => ({
  context: {
    payload: {
      pull_request: {
        get title() {
          return mockPrTitle();
        }
      }
    }
  }
}));

describe('getPrTitle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the PR title', () => {
    mockPrTitle.mockReturnValue('PR title');

    const title = getPrTitle();

    expect(title).toEqual('PR title');
  });

  describe('when the PR title is not a string', () => {
    beforeEach(() => {
      mockPrTitle.mockReturnValue(123);
    });

    it('should set the action as failed', () => {
      getPrTitle();

      expect(mockSetFailed).toHaveBeenCalledTimes(1);
      expect(mockSetFailed).toHaveBeenCalledWith('PR title is not a string');
    });

    it('should return null', () => {
      const title = getPrTitle();

      expect(title).toBeNull();
    });
  });

  describe('when the PR title is empty', () => {
    beforeEach(() => {
      mockPrTitle.mockReturnValue('');
    });

    it('should set the action as failed', () => {
      getPrTitle();

      expect(mockSetFailed).toHaveBeenCalledTimes(1);
      expect(mockSetFailed).toHaveBeenCalledWith('PR title is empty');
    });

    it('should return null', () => {
      const title = getPrTitle();

      expect(title).toBeNull();
    });
  });
});
