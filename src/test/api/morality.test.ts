import { MoralityMap } from '../../main'

describe('MoralityMap', () => {
  test('should map hero to hero', () => {
    expect(MoralityMap.hero).toEqual('hero')
  })

  test('should map vigilante to hero', () => {
    expect(MoralityMap.vigilante).toEqual('hero')
  })

  test('should map villain to villain', () => {
    expect(MoralityMap.villain).toEqual('villain')
  })

  test('should map rogue to villain', () => {
    expect(MoralityMap.rogue).toEqual('villain')
  })

  test('should map resistance to praetorian', () => {
    expect(MoralityMap.resistance).toEqual('praetorian')
  })

  test('should map loyalist to praetorian', () => {
    expect(MoralityMap.loyalist).toEqual('praetorian')
  })

  test('should map praetorian to praetorian', () => {
    expect(MoralityMap.loyalist).toEqual('praetorian')
  })
})
