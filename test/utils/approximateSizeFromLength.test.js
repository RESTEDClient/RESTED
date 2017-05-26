import approximateSizeFromLength from 'utils/approximateSizeFromLength';

describe('approximateSizeFromLength util', () => {
  it('should calculate the size of plain strings', () => {
    expect(approximateSizeFromLength('abcdef')).toBe(6);
    expect(approximateSizeFromLength('1234567890')).toBe(10);
  });

  it('should calculate the size of unicode strings', () => {
    expect(approximateSizeFromLength('😀')).toBe(2);
    expect(approximateSizeFromLength('øæå')).toBe(3);
  });
});

