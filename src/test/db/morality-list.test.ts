import { MoralityList } from '../../main'

describe(MoralityList.name, () => {
  describe('items', () => {
    test('should return the basic set', () => {
      expect(new MoralityList(['hero', 'villain', 'loyalist']).items).toStrictEqual(['hero', 'villain', 'loyalist'])
    })

    test('should collapse extended values', () => {
      expect(new MoralityList(['primal']).items).toStrictEqual(['hero', 'vigilante', 'villain', 'rogue'])
      expect(new MoralityList(['heroic']).items).toStrictEqual(['hero', 'vigilante'])
      expect(new MoralityList(['heroic', 'praetorian']).items).toStrictEqual(['hero', 'vigilante', 'resistance', 'loyalist'])
    })

    test('should not duplicate overlaps', () => {
      expect(new MoralityList(['primal', 'heroic', 'hero']).items).toStrictEqual(['hero', 'vigilante', 'villain', 'rogue'])
      expect(new MoralityList(['all', 'heroic', 'hero']).items).toStrictEqual(['hero', 'vigilante', 'villain', 'rogue', 'resistance', 'loyalist'])
    })

    test('should have deterministic order', () => {
      expect(new MoralityList(['hero', 'villain']).items).toStrictEqual(['hero', 'villain'])
      expect(new MoralityList(['villain', 'hero']).items).toStrictEqual(['hero', 'villain'])
      expect(new MoralityList(['primal', 'all', 'hero']).items).toStrictEqual(['hero', 'vigilante', 'villain', 'rogue', 'resistance', 'loyalist'])
      expect(new MoralityList(['hero', 'primal', 'all']).items).toStrictEqual(['hero', 'vigilante', 'villain', 'rogue', 'resistance', 'loyalist'])
      expect(new MoralityList(['all', 'hero', 'primal']).items).toStrictEqual(['hero', 'vigilante', 'villain', 'rogue', 'resistance', 'loyalist'])
    })

    test('should treat undefined as all values', () => {
      expect(new MoralityList().items).toStrictEqual(['hero', 'vigilante', 'villain', 'rogue', 'resistance', 'loyalist'])
    })

    test('should treat explicit empty as no values', () => {
      expect(new MoralityList([]).items).toStrictEqual([])
    })
  })

  describe('values', () => {
    test('should all be true when undefined', () => {
      const moralitys = new MoralityList()
      expect(moralitys.hero).toBeTruthy()
      expect(moralitys.vigilante).toBeTruthy()
      expect(moralitys.villain).toBeTruthy()
      expect(moralitys.rogue).toBeTruthy()
      expect(moralitys.resistance).toBeTruthy()
      expect(moralitys.loyalist).toBeTruthy()
      expect(moralitys.primal).toBeTruthy()
      expect(moralitys.praetorian).toBeTruthy()
      expect(moralitys.heroic).toBeTruthy()
      expect(moralitys.villainous).toBeTruthy()
      expect(moralitys.paragonCityAccess).toBeTruthy()
      expect(moralitys.rogueIslesAccess).toBeTruthy()
      expect(moralitys.all).toBeTruthy()
    })

    test('should all be false when empty', () => {
      const moralitys = new MoralityList([])
      expect(moralitys.hero).toBeFalsy()
      expect(moralitys.vigilante).toBeFalsy()
      expect(moralitys.villain).toBeFalsy()
      expect(moralitys.rogue).toBeFalsy()
      expect(moralitys.resistance).toBeFalsy()
      expect(moralitys.loyalist).toBeFalsy()
      expect(moralitys.primal).toBeFalsy()
      expect(moralitys.praetorian).toBeFalsy()
      expect(moralitys.heroic).toBeFalsy()
      expect(moralitys.villainous).toBeFalsy()
      expect(moralitys.paragonCityAccess).toBeFalsy()
      expect(moralitys.rogueIslesAccess).toBeFalsy()
      expect(moralitys.all).toBeFalsy()
    })
  })

  describe('hero', () => {
    test('should detect a hero', () => {
      expect(new MoralityList(['hero', 'villain']).hero).toBeTruthy()
    })

    test('should detect primal', () => {
      expect(new MoralityList(['primal']).hero).toBeTruthy()
    })

    test('should detect heroic', () => {
      expect(new MoralityList(['heroic']).hero).toBeTruthy()
    })

    test('should detect paragon-city-access', () => {
      expect(new MoralityList(['paragon-city-access']).hero).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new MoralityList(['all']).hero).toBeTruthy()
    })

    test('should not falsely detect a hero', () => {
      expect(new MoralityList(['villain']).hero).toBeFalsy()
    })
  })

  describe('vigilante', () => {
    test('should detect a vigilante', () => {
      expect(new MoralityList(['vigilante', 'villain']).vigilante).toBeTruthy()
    })

    test('should detect primal', () => {
      expect(new MoralityList(['primal']).vigilante).toBeTruthy()
    })

    test('should detect heroic', () => {
      expect(new MoralityList(['heroic']).vigilante).toBeTruthy()
    })

    test('should detect paragon-city-access', () => {
      expect(new MoralityList(['paragon-city-access']).vigilante).toBeTruthy()
    })

    test('should detect rogue-isles-access', () => {
      expect(new MoralityList(['rogue-isles-access']).vigilante).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new MoralityList(['all']).vigilante).toBeTruthy()
    })

    test('should not falsely detect a vigilante', () => {
      expect(new MoralityList(['villain']).vigilante).toBeFalsy()
    })
  })

  describe('villain', () => {
    test('should detect a villain', () => {
      expect(new MoralityList(['hero', 'villain']).villain).toBeTruthy()
    })

    test('should detect primal', () => {
      expect(new MoralityList(['primal']).villain).toBeTruthy()
    })

    test('should detect villainous', () => {
      expect(new MoralityList(['villainous']).villain).toBeTruthy()
    })

    test('should detect rogue-isles-access', () => {
      expect(new MoralityList(['rogue-isles-access']).villain).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new MoralityList(['all']).villain).toBeTruthy()
    })

    test('should not falsely detect a villain', () => {
      expect(new MoralityList(['hero']).villain).toBeFalsy()
    })
  })

  describe('rogue', () => {
    test('should detect a rogue', () => {
      expect(new MoralityList(['hero', 'rogue']).rogue).toBeTruthy()
    })

    test('should detect primal', () => {
      expect(new MoralityList(['primal']).rogue).toBeTruthy()
    })

    test('should detect villainous', () => {
      expect(new MoralityList(['villainous']).rogue).toBeTruthy()
    })

    test('should detect paragon-city-access', () => {
      expect(new MoralityList(['paragon-city-access']).rogue).toBeTruthy()
    })

    test('should detect rogue-isles-access', () => {
      expect(new MoralityList(['rogue-isles-access']).rogue).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new MoralityList(['all']).rogue).toBeTruthy()
    })

    test('should not falsely detect a rogue', () => {
      expect(new MoralityList(['hero']).rogue).toBeFalsy()
    })
  })

  describe('primal', () => {
    test('should detect hero, vigilante, villain and rogue', () => {
      expect(new MoralityList(['hero', 'vigilante', 'villain', 'rogue']).primal).toBeTruthy()
    })

    test('should detect primal', () => {
      expect(new MoralityList(['primal']).primal).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new MoralityList(['all']).primal).toBeTruthy()
    })

    test('should not falsely detect a primal', () => {
      expect(new MoralityList(['villain']).primal).toBeFalsy()
      expect(new MoralityList(['praetorian']).primal).toBeFalsy()
      expect(new MoralityList(['hero', 'villain']).primal).toBeFalsy()
    })
  })

  describe('praetorian', () => {
    test('should detect resistance and loyalist', () => {
      expect(new MoralityList(['resistance', 'loyalist']).praetorian).toBeTruthy()
    })

    test('should detect praetorian', () => {
      expect(new MoralityList(['praetorian']).praetorian).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new MoralityList(['all']).praetorian).toBeTruthy()
    })

    test('should not falsely detect a praetorian', () => {
      expect(new MoralityList(['villain']).praetorian).toBeFalsy()
      expect(new MoralityList(['primal']).praetorian).toBeFalsy()
      expect(new MoralityList(['hero', 'villain']).praetorian).toBeFalsy()
    })
  })

  describe('heroic', () => {
    test('should detect hero and vigilante', () => {
      expect(new MoralityList(['hero', 'vigilante']).heroic).toBeTruthy()
    })

    test('should detect heroic', () => {
      expect(new MoralityList(['heroic']).heroic).toBeTruthy()
    })

    test('should detect paragon-city-access', () => {
      expect(new MoralityList(['paragon-city-access']).heroic).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new MoralityList(['all']).heroic).toBeTruthy()
    })

    test('should not falsely detect heroic', () => {
      expect(new MoralityList(['villain']).heroic).toBeFalsy()
      expect(new MoralityList(['praetorian']).heroic).toBeFalsy()
      expect(new MoralityList(['villain', 'rogue']).heroic).toBeFalsy()
    })
  })

  describe('villainous', () => {
    test('should detect villain and rogue', () => {
      expect(new MoralityList(['villain', 'rogue']).villainous).toBeTruthy()
    })

    test('should detect villainous', () => {
      expect(new MoralityList(['villainous']).villainous).toBeTruthy()
    })

    test('should detect rogue-isles-access', () => {
      expect(new MoralityList(['rogue-isles-access']).villainous).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new MoralityList(['all']).villainous).toBeTruthy()
    })

    test('should not falsely detect villainous', () => {
      expect(new MoralityList(['villain']).villainous).toBeFalsy()
      expect(new MoralityList(['praetorian']).villainous).toBeFalsy()
      expect(new MoralityList(['hero', 'vigilante']).villainous).toBeFalsy()
    })
  })

  describe('paragonCityAccess', () => {
    test('should detect hero, vigilante and rogue', () => {
      expect(new MoralityList(['hero', 'vigilante', 'rogue']).paragonCityAccess).toBeTruthy()
    })

    test('should detect paragon-city-access', () => {
      expect(new MoralityList(['paragon-city-access']).paragonCityAccess).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new MoralityList(['all']).paragonCityAccess).toBeTruthy()
    })

    test('should not falsely detect paragonCityAccess', () => {
      expect(new MoralityList(['villain']).paragonCityAccess).toBeFalsy()
      expect(new MoralityList(['praetorian']).paragonCityAccess).toBeFalsy()
      expect(new MoralityList(['hero', 'vigilante']).paragonCityAccess).toBeFalsy()
    })
  })

  describe('rogueIslesAccess', () => {
    test('should detect villain, rogue and vigilante', () => {
      expect(new MoralityList(['villain', 'rogue', 'vigilante']).rogueIslesAccess).toBeTruthy()
    })

    test('should detect rogue-isles-access', () => {
      expect(new MoralityList(['rogue-isles-access']).rogueIslesAccess).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new MoralityList(['all']).rogueIslesAccess).toBeTruthy()
    })

    test('should not falsely detect rogueIslesAccess', () => {
      expect(new MoralityList(['villain']).rogueIslesAccess).toBeFalsy()
      expect(new MoralityList(['praetorian']).rogueIslesAccess).toBeFalsy()
      expect(new MoralityList(['hero', 'vigilante']).rogueIslesAccess).toBeFalsy()
    })
  })

  describe('all', () => {
    test('should detect when all are present', () => {
      expect(new MoralityList(['hero', 'vigilante', 'villain', 'rogue', 'resistance', 'loyalist']).all).toBeTruthy()
      expect(new MoralityList(['heroic', 'villainous', 'praetorian']).all).toBeTruthy()
      expect(new MoralityList(['primal', 'praetorian']).all).toBeTruthy()
    })

    test('should detect all', () => {
      expect(new MoralityList(['all']).all).toBeTruthy()
    })

    test('should not falsely detect all', () => {
      expect(new MoralityList(['villain']).all).toBeFalsy()
      expect(new MoralityList(['praetorian']).all).toBeFalsy()
      expect(new MoralityList(['primal']).all).toBeFalsy()
    })
  })

  describe('has', () => {
    test('should return true if present', () => {
      expect(new MoralityList(['villain']).has('villain')).toBeTruthy()
      expect(new MoralityList(['hero', 'loyalist']).has('loyalist')).toBeTruthy()
    })

    test('should return false if absent', () => {
      expect(new MoralityList(['hero']).has('villain')).toBeFalsy()
      expect(new MoralityList(['heroic']).has('villain')).toBeFalsy()
      expect(new MoralityList(['hero', 'praetorian']).has('primal')).toBeFalsy()
    })

    test('should return false if undefined', () => {
      expect(new MoralityList(['hero']).has()).toBeFalsy()
    })

    test('should test hero correctly', () => {
      expect(new MoralityList(['hero']).has('hero')).toBeTruthy()
      expect(new MoralityList(['heroic']).has('hero')).toBeTruthy()
      expect(new MoralityList(['primal']).has('hero')).toBeTruthy()
      expect(new MoralityList(['all']).has('hero')).toBeTruthy()

      expect(new MoralityList(['villain']).has('hero')).toBeFalsy()
    })

    test('should test vigilante correctly', () => {
      expect(new MoralityList(['hero', 'vigilante']).has('vigilante')).toBeTruthy()
      expect(new MoralityList(['heroic']).has('vigilante')).toBeTruthy()
      expect(new MoralityList(['primal']).has('vigilante')).toBeTruthy()
      expect(new MoralityList(['all']).has('vigilante')).toBeTruthy()

      expect(new MoralityList(['villain']).has('vigilante')).toBeFalsy()
    })

    test('should test villain correctly', () => {
      expect(new MoralityList(['villain']).has('villain')).toBeTruthy()
      expect(new MoralityList(['villainous']).has('villain')).toBeTruthy()
      expect(new MoralityList(['primal']).has('villain')).toBeTruthy()
      expect(new MoralityList(['all']).has('villain')).toBeTruthy()

      expect(new MoralityList(['hero']).has('villain')).toBeFalsy()
    })

    test('should test rogue correctly', () => {
      expect(new MoralityList(['rogue']).has('rogue')).toBeTruthy()
      expect(new MoralityList(['villainous']).has('rogue')).toBeTruthy()
      expect(new MoralityList(['primal']).has('rogue')).toBeTruthy()
      expect(new MoralityList(['all']).has('rogue')).toBeTruthy()

      expect(new MoralityList(['hero']).has('rogue')).toBeFalsy()
    })

    test('should test resistance correctly', () => {
      expect(new MoralityList(['resistance']).has('resistance')).toBeTruthy()
      expect(new MoralityList(['praetorian']).has('resistance')).toBeTruthy()
      expect(new MoralityList(['all']).has('resistance')).toBeTruthy()

      expect(new MoralityList(['villain']).has('resistance')).toBeFalsy()
    })

    test('should test loyalist correctly', () => {
      expect(new MoralityList(['loyalist']).has('loyalist')).toBeTruthy()
      expect(new MoralityList(['praetorian']).has('loyalist')).toBeTruthy()
      expect(new MoralityList(['all']).has('loyalist')).toBeTruthy()

      expect(new MoralityList(['villain']).has('loyalist')).toBeFalsy()
    })

    test('should test primal correctly', () => {
      expect(new MoralityList(['hero', 'vigilante', 'villain', 'rogue']).has('primal')).toBeTruthy()
      expect(new MoralityList(['heroic', 'villainous']).has('primal')).toBeTruthy()
      expect(new MoralityList(['primal']).has('primal')).toBeTruthy()
      expect(new MoralityList(['all']).has('primal')).toBeTruthy()

      expect(new MoralityList(['villain']).has('primal')).toBeFalsy()
    })

    test('should test praetorian correctly', () => {
      expect(new MoralityList(['resistance', 'loyalist']).has('praetorian')).toBeTruthy()
      expect(new MoralityList(['praetorian']).has('praetorian')).toBeTruthy()
      expect(new MoralityList(['all']).has('praetorian')).toBeTruthy()

      expect(new MoralityList(['villain']).has('praetorian')).toBeFalsy()
    })

    test('should test heroic correctly', () => {
      expect(new MoralityList(['hero', 'vigilante']).has('heroic')).toBeTruthy()
      expect(new MoralityList(['heroic']).has('heroic')).toBeTruthy()
      expect(new MoralityList(['all']).has('heroic')).toBeTruthy()

      expect(new MoralityList(['villain']).has('heroic')).toBeFalsy()
    })

    test('should test villainous correctly', () => {
      expect(new MoralityList(['villain', 'rogue']).has('villainous')).toBeTruthy()
      expect(new MoralityList(['villainous']).has('villainous')).toBeTruthy()
      expect(new MoralityList(['all']).has('villainous')).toBeTruthy()

      expect(new MoralityList(['villain']).has('villainous')).toBeFalsy()
    })

    test('should test paragon-city-access correctly', () => {
      expect(new MoralityList(['hero', 'vigilante', 'rogue']).has('paragon-city-access')).toBeTruthy()
      expect(new MoralityList(['heroic', 'rogue']).has('paragon-city-access')).toBeTruthy()
      expect(new MoralityList(['all']).has('paragon-city-access')).toBeTruthy()

      expect(new MoralityList(['villain']).has('paragon-city-access')).toBeFalsy()
    })

    test('should test rogue-isles-access correctly', () => {
      expect(new MoralityList(['villain', 'rogue', 'vigilante']).has('rogue-isles-access')).toBeTruthy()
      expect(new MoralityList(['villainous', 'vigilante']).has('rogue-isles-access')).toBeTruthy()
      expect(new MoralityList(['all']).has('rogue-isles-access')).toBeTruthy()

      expect(new MoralityList(['villain']).has('rogue-isles-access')).toBeFalsy()
    })

    test('should test all correctly', () => {
      expect(new MoralityList(['hero', 'vigilante', 'villain', 'rogue', 'resistance', 'loyalist']).has('all')).toBeTruthy()
      expect(new MoralityList(['primal', 'praetorian']).has('all')).toBeTruthy()
      expect(new MoralityList(['heroic', 'villainous', 'praetorian']).has('all')).toBeTruthy()
      expect(new MoralityList(['all']).has('all')).toBeTruthy()

      expect(new MoralityList(['villain']).has('all')).toBeFalsy()
    })
  })
})
