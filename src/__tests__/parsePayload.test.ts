import { parsePayload } from '../parsePayload';

const dummyColor = {
  name: 'Color',
  attributes: {
    category: 'color',
  },
  value: { r: 1, g: 1, b: 1, a: 1 },
};

describe(parsePayload.name, () => {
  it('should map key `color` to `PAINT`', () => {
    const res = parsePayload({ color: { foo: dummyColor } });
    expect(res).toHaveProperty('PAINT');
    expect(res.PAINT).toContain(dummyColor);
  });

  it('should not fail for missing keys', () => {
    const res = parsePayload({} as { color: any });
    expect(res).toHaveProperty('PAINT');
    expect(res.PAINT).toEqual([]);
  });
});
