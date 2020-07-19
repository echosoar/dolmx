import * as assert from 'assert';
import dolmx from '../src';
describe('/test/index.test.ts', () => {
  it('declare', async () => {
    const result: any = dolmx(`<?xml version="1.0" encoding="UTF-8"?>`);
    assert(result.xml[0]._attr.version === '1.0');
    assert(result.xml[0]._attr.encoding === 'UTF-8');
  });
  it('declare error', async () => {
    try {
      dolmx(`<?xml xx+?>`);
    } catch (e) {
      assert(e.message === 'xml property name must be use a-z/0-9/-/_');
    }
  });
  it('declare property with space', async () => {
    const result: any = dolmx(`<?xml version = " 1.0 "?>`);
    assert(result.xml[0]._attr.version === ' 1.0 ');
  });
});
