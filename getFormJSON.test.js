import { expect } from 'chai';
import { getFormJSON } from './forms';

describe('forms tests', () => {
  it('should return a JSON representation of a form', () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.name = 'test';
    input.value = 'value';
    form.appendChild(input);
    const number = document.createElement('input');
    number.type = 'number';
    number.name = 'int';
    number.value = 10;
    form.appendChild(number);

    const result = getFormJSON(form);
    expect(result).to.deep.equal({
      test: 'value',
      int: '10',
    });
    form.remove();
  });

  it('should handle no form', () => {
    const form = document.createElement('form');
    const result = getFormJSON(form);
    expect(result).to.deep.equal({});
    form.remove();
  });

  it('should get a list of values if there are more than one input with the same name in the form', () => {
    const form = document.createElement('form');
    const input = document.createElement('input');
    input.name = 'test';
    input.value = 'value';
    form.appendChild(input);
    const input2 = document.createElement('input');
    input2.name = 'test';
    input2.value = 'value2';
    form.appendChild(input2);
    const number = document.createElement('input');
    number.type = 'number';
    number.name = 'int';
    number.value = 10;
    form.appendChild(number);

    const result = getFormJSON(form);
    expect(result).to.deep.equal({
      test: ['value', 'value2'],
      int: '10',
    });
    form.remove();
  });
});
