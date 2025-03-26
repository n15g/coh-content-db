import { Alignments } from '../../main'

describe(Alignments.name, () => {
  test('should return the raw array', () => {
    expect(new Alignments(['H', 'V']).items).toStrictEqual(['H', 'V'])
  })

  test('should detect a hero', () => {
    expect(new Alignments(['H', 'V']).hero).toBeTruthy()
  })

  test('should detect a villain', () => {
    expect(new Alignments(['H', 'V']).villain).toBeTruthy()
  })

  test('should detect a praetorian', () => {
    expect(new Alignments(['H', 'V', 'P']).praetorian).toBeTruthy()
  })

  test('should detect a primal', () => {
    expect(new Alignments(['H', 'V']).primal).toBeTruthy()
  })

  test('should not falsely detect a hero', () => {
    expect(new Alignments(['V']).hero).toBeFalsy()
  })

  test('should not falsely detect a villain', () => {
    expect(new Alignments(['H']).villain).toBeFalsy()
  })

  test('should not falsely detect a praetorian', () => {
    expect(new Alignments(['V']).praetorian).toBeFalsy()
  })

  test('should falsely detect a primal', () => {
    expect(new Alignments(['H', 'V', 'P']).primal).toBeFalsy()
    expect(new Alignments(['P']).primal).toBeFalsy()
  })
})
