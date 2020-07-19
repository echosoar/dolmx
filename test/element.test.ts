import * as assert from 'assert';
import dolmx from '../src';
describe('/test/element.test.ts', () => {
  it('normal', async () => {
    const result: any = dolmx(`<text>123</text>`);
    assert(result.text[0]._value === '123');
  });
  it('self close', async () => {
    const result: any = dolmx(`<text />`);
    assert(result.text);
  });
  it('nesting', async () => {
    const result: any = dolmx(`<text a="123"><text>123</text></text>`);
    assert(result.text[0]._attr.a === '123');
    assert(result.text[0].childs.text[0]._value === '123');
  });
  it('multi', async () => {
    const result: any = dolmx(`<item>
      <item>1</item>
      <item>2</item>
      <item>
        <item>3</item>
      </item>
    </item>`);
    console.log('result', JSON.stringify(result, null, ' '));
  });
});
