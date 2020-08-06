"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatAttr = exports.error = void 0;
exports.error = (errorMessage) => {
    throw new Error(errorMessage);
};
exports.formatAttr = (attr) => {
    const attrObj = {};
    if (!attr || !attr.length) {
        return attrObj;
    }
    let key = '';
    let value;
    let matchKey = true;
    let valueSplit = '';
    for (const char of attr) {
        if (matchKey) {
            if (char === ' ' || char === '\n' || char === '\t') {
                continue;
            }
            else if (char === '=') {
                if (!key) {
                    exports.error('xml property name cannot is empty');
                }
                attrObj[key] = true;
                matchKey = false;
            }
            else {
                if (!key && !/[a-z_]/i.test(char)) {
                    exports.error('xml property name must be start with a-z or _, but current is ' + char);
                }
                if (!/[\w-:]/i.test(char)) {
                    exports.error('xml property name must be use a-z/0-9/-/_');
                }
                key += char;
            }
        }
        else {
            if (value === undefined) {
                if (char === '"' || char === `'`) {
                    valueSplit = char;
                    value = '';
                }
                else if (char !== ' ') {
                    exports.error('xml property value must be start with \' or "');
                }
            }
            else {
                if (char === valueSplit) {
                    matchKey = true;
                    attrObj[key] = value;
                    value = undefined;
                    key = '';
                }
                else {
                    value += char;
                }
            }
        }
    }
    if (key) {
        attrObj[key] = value === undefined ? true : value;
    }
    return attrObj;
};
