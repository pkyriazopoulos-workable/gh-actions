import getApps from './getApps';

const mockSetFailed = jest.fn();
jest.mock('@actions/core', () => ({
  debug: jest.fn(),
  setFailed: (...args: unknown[]) => mockSetFailed(...args)
}));

const mockGetAppNames = jest.fn();
jest.mock('@actions/glob', () => ({
  create: jest.fn().mockResolvedValue({
    glob: () => mockGetAppNames()
  })
}));

describe('getApps', () => {
  it('should return apps', async () => {
    mockGetAppNames.mockResolvedValueOnce(['app1', 'app2']);

    const apps = await getApps();

    expect(apps).toEqual(['app1', 'app2']);
  });

  describe('when the glob fails', () => {
    it('should set the action as failed', async () => {
      mockGetAppNames.mockRejectedValueOnce(new Error('Glob error'));

      await getApps();

      expect(mockSetFailed).toHaveBeenCalledTimes(1);
      expect(mockSetFailed).toHaveBeenCalledWith('Glob error');
    });

    it('should return null', async () => {
      mockGetAppNames.mockRejectedValueOnce(new Error('Glob error'));

      const apps = await getApps();

      expect(apps).toBeNull();
    });
  });
});
