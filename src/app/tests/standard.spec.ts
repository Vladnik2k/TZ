import {Standard} from '../algorithms-info/algorithms/standard';
import {Settings} from '../algorithms-info/settings';

describe('Get code indexes test', () => {
  const algorithm = new Standard(new Settings());

  it('text', () => {
    checkRelation('text', '44155344');
  });

  it('Vasya', () => {
    checkRelation('Vasya', '5111435411');
  });

  it('GlAdIaToR', () => {
    checkRelation('GlAdIaToR', '223111142411443442');
  });

  it('MASTER', () => {
    checkRelation('MASTER', '321143441542');
  });

  it('youTUBE', () => {
    checkRelation('youTUBE', '54344544451215');
  });

  it('heroes', () => {
    checkRelation('heroes', '231542341543');
  });

  it('algoRITHM', () => {
    checkRelation('algoRITHM', '113122344224442332');
  });

  it('testCases', () => {
    checkRelation('testCases', '441543441311431543');
  });

  function checkRelation(text, numbers): void {
    checkNotBack(text, numbers);
    checkBack(text.toLowerCase(), numbers);
  }

  function checkNotBack(text, numbers): void {
    algorithm.settings.isBack = false;
    algorithm.startAlgorithm(text);
    expect(algorithm.result).toEqual(numbers);
  }

  function checkBack(text, numbers): void {
    algorithm.settings.isBack = true;
    algorithm.startAlgorithm(numbers);
    expect(algorithm.result).toEqual(text);
  }
});

