import {Settings} from '../algorithms-info/settings';
import {Symbol} from '../algorithms-info/algorithms/symbol';

describe('Get code indexes test', () => {
  const algorithm = new Symbol(new Settings());

  it('text', () => {
    checkRelation('text', 'zfdz');
  });

  it('Vasya', () => {
    checkRelation('Vasya', 'Bgyeg');
  });

  it('GlAdIaToR', () => {
    checkRelation('GlAdIaToR', 'NrGkPgZuX');
  });

  it('MASTER', () => {
    checkRelation('MASTER', 'SGYZFX');
  });

  it('youTUBE', () => {
    checkRelation('youTUBE', 'euvZVHF');
  });

  it('heroes', () => {
    checkRelation('heroes', 'ofxufy');
  });

  it('algoRITHM', () => {
    checkRelation('algoRITHM', 'grnuXPZOS');
  });

  it('testCases', () => {
    checkRelation('testCases', 'zfyzIgyfy');
  });

  it('PROfi', () => {
    checkRelation('PROfi', 'QXUmp');
  });

  it('GodLike', () => {
    checkRelation('GodLike', 'NukRplf');
  });

  it('JobIsLife', () => {
    checkNotBack('JobIsLife', 'PuhPyRpmf');
    checkBack('IobIsLife', 'PuhPyRpmf');
  });

  it('Job Is атб Life1', () => {
    checkNotBack('Job Is атб Life1', 'PuhPyRpmf');
    checkBack('IobIsLife', 'PuhPyRpmf');
  });

  function checkRelation(text, numbers): void {
    checkNotBack(text, numbers);
    checkBack(text, numbers);
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

