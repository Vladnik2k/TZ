import {Algorithm} from '../algorithm';
import {Settings} from '../settings';

describe('Get code indexes test', () => {
  const algorithm = new Algorithm(new Settings());

  it('validation number', () => {
    expect(algorithm.getCodeIndexes('1')).toEqual('');
  });

  it('validation big number', () => {
    expect(algorithm.getCodeIndexes('123456789')).toEqual('');
  });

  it('validation ukrainian code', () => {
    expect(algorithm.getCodeIndexes('і')).toEqual('');
  });

  it('validation ukrainian code (uppercase)', () => {
    expect(algorithm.getCodeIndexes('І')).toEqual('');
  });

  it('validation incorrect code', () => {
    expect(algorithm.getCodeIndexes('/')).toEqual('');
  });

  it('normal code (lowercase)', () => {
    expect(algorithm.getCodeIndexes('g')).toEqual('1 1');
  });

  it('normal code (uppercase)', () => {
    expect(algorithm.getCodeIndexes('G')).toEqual('1 1');
  });

  it('part of code (lowercase)', () => {
    expect(algorithm.getCodeIndexes('j')).toEqual('1 3');
  });

  it('part of code (uppercase)', () => {
    expect(algorithm.getCodeIndexes('J')).toEqual('1 3');
  });
});

