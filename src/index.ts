import { error } from './utils';
import { Element, ElementStatue } from './element';
const dolmx = (xml: string) => {
  /*
  遇到 < ，并且当前指针元素的状态为已完成 就新建元素，指针指向当前元素
  遇到 </ 或 /> 就结束当前元素，指针指向上一层
  */
  const xmlChars = xml.split('');
  const result = new Element();
  let pointer: any = result;
  while (xmlChars && xmlChars.length) {
    const current = xmlChars.shift();

    if (current === '<') {
      if (xmlChars[0] === '/') { // 完结
        xmlChars.shift();
        const currentElementNameLength = pointer.name.length;
        if (!currentElementNameLength) {
          error('Element need name');
        }
        const nextCharList = xmlChars.splice(0, currentElementNameLength).join('');
        if (nextCharList !== pointer.name) {
          error('Element need close');
        }
        let next = xmlChars.shift();
        while (next === ' ') {
          next = xmlChars.shift();
        }
        if (next !== '>') {
          error(`Element end need </${pointer.name}>, ${next}`);
        }
        pointer = pointer.end();
      } else if (xmlChars[0] === '!' && xmlChars.slice(0, 8).join('') === '![CDATA[') {
        xmlChars.splice(0, 8);
        // value
        const valueIndex = xmlChars.findIndex((value, index) => {
          return value === ']' && xmlChars[index + 1] === ']' && xmlChars[index + 2] === '>';
        });
        if (valueIndex === -1) {
          error('CDATA need close');
        }
        const cdata = xmlChars.splice(0, valueIndex).join('');
        pointer.value(cdata, true);
        // remove ]]>
        xmlChars.splice(0, 3);
      } else { // 新建
        if (xmlChars[0] === '?') {
          xmlChars.shift(); // <?xml
        }
        pointer = new Element(pointer);
      }
    } else if (current === '/' || current === '?') {
      if (xmlChars[0] === '>') {
        xmlChars.shift();
        pointer = pointer.end();
      } else {
        pointer.value(current);
      }
    } else if (current === '>') {
      pointer.status = ElementStatue.MatchValue;
    } else if (pointer.status === ElementStatue.MatchName) {
      if (current === ' ') {
        pointer.status = ElementStatue.MatchProps;
      } else {
        pointer.name += current;
      }
    } else if (pointer.status === ElementStatue.MatchProps) {
      pointer.attr(current);
    } else if (pointer.value) {
      pointer.value(current);
    }
  }
  return result.toObject();
};

export default dolmx;
