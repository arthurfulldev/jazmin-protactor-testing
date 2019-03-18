import { Person } from './person';

describe('Pruebas para la clase Person', () => {
  let persona: Person;
  beforeEach(() => {
    persona = new Person(
      'Arturo',
      'Hernandez',
      23,
      40,
      1.65
    );
  });

  describe('Preubas para ', () => {
    it('Checkear atributos', () => {
      expect(persona.name).toEqual('Arturo');
      expect(persona.lastname).toEqual('Hernandez');
      expect(persona.age).toEqual(23);
      expect(persona.weight).toEqual(40);
      expect(persona.height).toEqual(1.65);
    });
  });

  describe('Pruebas para calcular el IMC', () => {
    it('Deberia retornar string "down"', () => {
      persona.weight = 40;
      expect(persona.calcIMC()).toEqual('down');
    });

    it('Deberia retornar string "normal"', () => {
      persona.weight = 58;
      expect(persona.calcIMC()).toEqual('normal');
    });

    it('Deberia retornar string "overweight"', () => {
      persona.weight = 68;
      expect(persona.calcIMC()).toEqual('overweight');
    });

    it('Deberia retornar string "overweight level 1"', () => {
      persona.weight = 75;
      expect(persona.calcIMC()).toEqual('overweight level 1');
    });

    it('Deberia retornsr string "overweight level 2"', () => {
      persona.weight = 90;
      expect(persona.calcIMC()).toEqual('overweight level 2');
    });

    it('Deberia retornsr string "overweight level 3"', () => {
      persona.weight = 120;
      expect(persona.calcIMC()).toEqual('overweight level 3');
    });

    it('Deberia retornar string: "not found"', () => {
      persona.weight = -48;
      expect(persona.calcIMC()).toEqual('no found');
      persona.weight = -48;
      persona.height = -1.70;
      expect(persona.calcIMC()).toEqual('no found');
    });
  });

});
