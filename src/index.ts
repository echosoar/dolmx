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
  let index = 0;
  outer:
  while (index < xmlChars.length) {
    const current = xmlChars[index];
    if (current === '<') {
      if (xmlChars[index + 1] === '/') { // 完结
        index += 2;
        const currentElementNameLength = pointer.name.length;
        if (!currentElementNameLength) {
          error('Element need name');
        }
        const nextCharList = xmlChars.slice(index, index + currentElementNameLength).join('');
        if (nextCharList !== pointer.name) {
          error('Element need close');
        }
        index += currentElementNameLength;
        let next = xmlChars[index];
        while (next === ' ') {
          index++;
          next = xmlChars[index];
        }
        if (next !== '>') {
          error(`Element end need </${pointer.name}>, ${next}`);
        }
        index++;
        pointer = pointer.end();
        continue outer;
      } else if (xmlChars[index + 1] === '!' && xmlChars.slice(index + 1, index + 9).join('') === '![CDATA[') {
        index += 9;
        // value
        let valueEndIndex = -1;
        for (let start = index; start < xmlChars.length; start++) {
          if (xmlChars[start] === ']' && xmlChars[start + 1] === ']' && xmlChars[start + 2] === '>') {
            valueEndIndex = start;
            break;
          }
        }
        if (valueEndIndex === -1) {
          error('CDATA need close');
        }
        const cdata = xmlChars.slice(index, valueEndIndex).join('');

        pointer.value(cdata, true);
        // remove ]]>
        index = valueEndIndex + 3;
        continue outer;
      } else { // 新建
        if (xmlChars[index + 1] === '?') {
          index++; // <?xml
        }
        pointer = new Element(pointer);
      }
    } else if (current === '/' || current === '?') {
      if (xmlChars[index + 1] === '>') {
        index++;
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
    index++;
  }
  return result.toObject();
};

export default dolmx;
