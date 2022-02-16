import { createStyleImporter } from '../createStyleImporter';

describe(createStyleImporter.name, () => {
  it('should call get and create functions', async () => {
    const getExistingStylesMock = jest.fn(() => []);
    const createNewStyleMock = jest.fn();

    const importer = createStyleImporter(getExistingStylesMock, createNewStyleMock);
    const result = await importer([{ name: 'Foo' }]);

    expect(getExistingStylesMock).toHaveBeenCalled();
    expect(createNewStyleMock).toHaveBeenCalledWith({ name: 'Foo' }, undefined);
    expect(result).toEqual({
      success: true,
      newStylesCount: 1,
      preexistingStylesCount: 0,
      updatedStylesCount: 0,
    });
  });

  it('should increase counter when style with name existed', async () => {
    const existingStyle = { name: 'Foo', value: 1 };
    const newToken = { name: 'Foo', value: 0 };
    const getExistingStylesMock = jest.fn(() => [existingStyle]);
    const createNewStyleMock = jest.fn();

    const importer = createStyleImporter(getExistingStylesMock, createNewStyleMock);
    const result = await importer([newToken]);

    expect(getExistingStylesMock).toHaveBeenCalled();
    expect(createNewStyleMock).toHaveBeenCalledWith(newToken, existingStyle);
    expect(result).toEqual({
      success: true,
      newStylesCount: 0,
      preexistingStylesCount: 1,
      updatedStylesCount: 1,
    });
  });
});
