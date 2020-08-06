"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Element = exports.ElementStatue = void 0;
const utils_1 = require("./utils");
var ElementStatue;
(function (ElementStatue) {
    ElementStatue[ElementStatue["MatchName"] = 0] = "MatchName";
    ElementStatue[ElementStatue["MatchProps"] = 1] = "MatchProps";
    ElementStatue[ElementStatue["MatchValue"] = 2] = "MatchValue";
    ElementStatue[ElementStatue["Complete"] = 3] = "Complete";
})(ElementStatue = exports.ElementStatue || (exports.ElementStatue = {}));
class Element {
    constructor(parent) {
        this.name = '';
        this.status = ElementStatue.MatchName;
        this.attribute = {};
        this.notChangeValue = false;
        this.parent = parent || {};
    }
    add(element) {
        const { name } = element;
        if (!this.childs) {
            this.childs = {};
        }
        if (this.childs[name]) {
            if (Array.isArray(this.childs[name])) {
                this.childs[name].push(element);
            }
            else {
                this.childs[name] = [this.childs[name], element];
            }
        }
        else {
            this.childs[name] = element;
        }
    }
    end() {
        var _a;
        this.status = ElementStatue.Complete;
        if ((_a = this.attrList) === null || _a === void 0 ? void 0 : _a.length) {
            this.attribute = utils_1.formatAttr(this.attrList);
        }
        const parent = this.parent;
        if (parent.add) {
            parent.add(this);
        }
        return this.parent;
    }
    toObject() {
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
    attr(char) {
        if (!this.attrList) {
            this.attrList = [];
        }
        this.attrList.push(char);
    }
    value(char, notChangeValue) {
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
exports.Element = Element;
