import { formatAttr, error } from './utils';
class Element {
  public name = '';
  public matchName = true;
  public matchValue = false;
  public matchProps = false;
  public parent = {};
  private childs;
  private attribute = {};
  private attrList;
  private valueStr;
  constructor(parent) {
    this.parent = parent;
  }

  public add(element) {
    const { name } = element;
    if (!this.childs) {
      this.childs = {};
    }
    if (this.childs[name]) {
      this.childs[name].push(element);
    } else {
      this.childs[name] = [element];
    }
  }

  public end() {
    this.matchName = false;
    this.matchProps = false;
    this.matchValue = false;
    if (this.attrList?.length) {
      this.attribute = formatAttr(this.attrList);
    }
  }

  public toObject() {
    const childs = {};
    if (this.childs) {
      Object.keys(this.childs).forEach((childName) => {
        childs[childName] = this.childs[childName].map((item) => item.toObject());
      });
    }
    return {
      _attr: this.attribute,
      _value: this.valueStr,
      childs,
    };
  }
  public attr(char) {
    if (!this.attrList) {
      this.attrList = [];
    }
    this.attrList.push(char);
  }

  public value(char) {
    if (!this.valueStr) {
      this.valueStr = '';
    }
    this.valueStr += char;
  }
}

const dolmx = (xml: string) => {
  /*
  遇到 < ，并且当前指针元素的状态为已完成 就新建元素，指针指向当前元素
  遇到 </ 或 /> 就结束当前元素，指针指向上一层
  */
  const xmlChars = xml.split('');
  const result = new Element({});
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
        const ele = pointer;
        ele.end();
        pointer = pointer.parent;
        pointer.add(ele);
      } else { // 新建
        if (xmlChars[0] === '?') {
          xmlChars.shift(); // <?xml
        }
        pointer = new Element(pointer);
      }
    } else if (current === '/' || current === '?') {
      if (xmlChars[0] === '>') {
        xmlChars.shift();
        const ele = pointer;
        ele.end();
        pointer = pointer.parent;
        pointer.add(ele);
      }
    } else if (current === '>') {
      pointer.matchName = false;
      pointer.matchProps = false;
      pointer.matchValue = true;
    } else if (pointer.matchName) {
      if (current === ' ') {
        pointer.matchName = false;
        pointer.matchProps = true;
      } else {
        pointer.name += current;
      }
    } else if (pointer.matchProps) {
      pointer.attr(current);
    } else if (pointer.value) {
      pointer.value(current);
    }
  }
  return result.toObject().childs;
};

export default dolmx;
