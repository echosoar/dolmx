import { formatAttr } from './utils';
export enum ElementStatue {
  MatchName,
  MatchProps,
  MatchValue,
  Complete,
}

export class Element {
  public name = '';
  public status = ElementStatue.MatchName;
  public parent;
  private childs;
  private attribute = {};
  private attrList;
  private valueStr;
  private notChangeValue = false;

  constructor(parent?) {
    this.parent = parent || {};
  }

  public add(element) {
    const { name } = element;
    if (!this.childs) {
      this.childs = {};
    }
    if (this.childs[name]) {
      if (Array.isArray(this.childs[name])) {
        this.childs[name].push(element);
      } else {
        this.childs[name] = [this.childs[name], element];
      }
    } else {
      this.childs[name] = element;
    }
  }

  public end() {
    this.status = ElementStatue.Complete;
    if (this.attrList?.length) {
      this.attribute = formatAttr(this.attrList);
    }
    const parent: any = this.parent;
    if (parent.add) {
      parent.add(this);
    }
    return this.parent;
  }

  public toObject() {
    let childs;
    if (this.childs) {
      Object.keys(this.childs).forEach((childName) => {
        if (!childs) {
          childs = {};
        }
        childs[childName] = Array.isArray(this.childs[childName]) ? this.childs[childName].map((item) => item.toObject()) : this.childs[childName].toObject();
      });
    }
    const result = {
      ...childs,
    };
    if (!childs) {
      result._value = this.valueStr;
    }
    const attrKeys = Object.keys(this.attribute);
    if (attrKeys.length) {
      result._attr = this.attribute;
    }
    return result;
  }
  public attr(char) {
    if (!this.attrList) {
      this.attrList = [];
    }
    this.attrList.push(char);
  }

  public value(char, notChangeValue?) {
    if (this.notChangeValue) {
      return;
    }
    this.notChangeValue = notChangeValue;
    if (notChangeValue) {
      this.valueStr = char;
      return;
    }
    if (!this.valueStr) {
      this.valueStr = '';
    }
    this.valueStr += char;
  }
}
