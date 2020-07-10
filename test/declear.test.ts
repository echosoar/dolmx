import * as assert from 'assert';
import dolmx from '../src';
describe('/test/index.test.ts', () => {
  it('declare', async () => {
    const result: any = dolmx(`<?xml version="1.0" encoding="UTF-8"?>`);
    assert(result.xml._attr.version === '1.0');
    assert(result.xml._attr.encoding === 'UTF-8');
  });
  it('declare error', async () => {
    const result: any = dolmx(`<?xml version="1.0 encoding="UTF-8"?>`);
    assert(result.xml._attr.version === '1.0 encoding=');
    assert(result.xml._attr['UTF-8"'] === true);
  });
  it('declare property with space', async () => {
    const result: any = dolmx(`<?xml version = " 1.0 "?>`);
    assert(result.xml._attr.version === ' 1.0 ');
  });
  it('declare escape', async () => {
    const result: any = dolmx(`<?xml version = " 1.0 "?>`);
    assert(result);
  });
});
