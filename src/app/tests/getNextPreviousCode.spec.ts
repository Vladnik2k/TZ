import {Settings} from '../settings';
import {Algorithm} from '../algorithm';
import {languagesWithCodes} from '../constants';

/**
 * next = checking next method
 * prev = checking previous method
 * row = checking the row
 * col = checking the column
 * minus = checking with minus value
 * one = checking only for one value changes
 * more = checking more than one value changes
 * more_M = checking more than one value changes (with cycle)
 * en = checking with en codes
 */
describe('Get next / previous code test', () => {
  const settings = new Settings();

  it('next (row one) en', () => {
    patchSettings(1, 0);
    checkIsNextTrue(languagesWithCodes.en[2][1]);
  });

  it('next (row more) en', () => {
    patchSettings(2, 0);
    checkIsNextTrue(languagesWithCodes.en[3][1]);
  });

  it('next (row more_M) en', () => {
    patchSettings(7, 0);
    checkIsNextTrue(languagesWithCodes.en[3][1]);
  });

  it('next (row minus one) en', () => {
    patchSettings(-1, 0);
    checkIsNextTrue(languagesWithCodes.en[0][1]);
  });

  it('next (row minus more) en', () => {
    patchSettings(-2, 0);
    checkIsNextTrue(languagesWithCodes.en[4][1]);
  });

  it('next (row minus more_M) en', () => {
    patchSettings(-7, 0);
    checkIsNextTrue(languagesWithCodes.en[4][1]);
  });

  it('next (col one) en', () => {
    patchSettings(0, 1);
    checkIsNextTrue(languagesWithCodes.en[1][2]);
  });

  it('next (col more) en', () => {
    patchSettings(0, 2);
    checkIsNextTrue(languagesWithCodes.en[1][3][0]);
  });

  it('next (col more_M) en', () => {
    patchSettings(0, 7);
    checkIsNextTrue(languagesWithCodes.en[1][3][0]);
  });

  it('next (col minus one) en', () => {
    patchSettings(0, -1);
    checkIsNextTrue(languagesWithCodes.en[1][0]);
  });

  it('next (col minus more) en', () => {
    patchSettings(0, -2);
    checkIsNextTrue(languagesWithCodes.en[1][4]);
  });

  it('next (col minus more_M) en', () => {
    patchSettings(0, -7);
    checkIsNextTrue(languagesWithCodes.en[1][4]);
  });

  it('next (row one)(col minus more_M) en', () => {
    patchSettings(1, -7);
    checkIsNextTrue(languagesWithCodes.en[2][4]);
  });

  it('next (row more_M)(col minus one) en', () => {
    patchSettings(5, -1);
    checkIsNextTrue(languagesWithCodes.en[1][0]);
  });

  it('prev (row more_M)(col minus one) en', () => {
    patchSettings(5, -1);
    checkIsPrevTrue(languagesWithCodes.en[1][2]);
  });

  it('prev (row one)(col minus more) en', () => {
    patchSettings(1, -3);
    checkIsPrevTrue(languagesWithCodes.en[0][4]);
  });

  function patchSettings(i: number, j: number): void {
    settings.additionalRowIndex = i;
    settings.additionalColIndex = j;
  }

  function checkIsNextTrue(expectedCode: string): void {
    const algorithm = new Algorithm(settings);
    expect(algorithm.getNextCode(1, 1)).toEqual(expectedCode);
  }

  function checkIsPrevTrue(expectedCode: string): void {
    const algorithm = new Algorithm(settings);
    expect(algorithm.getPreviousCode(1, 1)).toEqual(expectedCode);
  }
});

