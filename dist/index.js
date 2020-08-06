"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const element_1 = require("./element");
const dolmx = (xml) => {
    const xmlChars = xml.split('');
    const result = new element_1.Element();
    let pointer = result;
    while (xmlChars && xmlChars.length) {
        const current = xmlChars.shift();
        if (current === '<') {
            if (xmlChars[0] === '/') {
                xmlChars.shift();
                const currentElementNameLength = pointer.name.length;
                if (!currentElementNameLength) {
                    utils_1.error('Element need name');
                }
                const nextCharList = xmlChars.splice(0, currentElementNameLength).join('');
                if (nextCharList !== pointer.name) {
                    utils_1.error('Element need close');
                }
                let next = xmlChars.shift();
                while (next === ' ') {
                    next = xmlChars.shift();
                }
                if (next !== '>') {
                    utils_1.error(`Element end need </${pointer.name}>, ${next}`);
                }
                pointer = pointer.end();
            }
            else if (xmlChars[0] === '!' && xmlChars.slice(0, 8).join('') === '![CDATA[') {
                xmlChars.splice(0, 8);
                const valueIndex = xmlChars.findIndex((value, index) => {
                    return value === ']' && xmlChars[index + 1] === ']' && xmlChars[index + 2] === '>';
                });
                if (valueIndex === -1) {
                    utils_1.error('CDATA need close');
                }
                const cdata = xmlChars.splice(0, valueIndex).join('');
                pointer.value(cdata, true);
                xmlChars.splice(0, 3);
            }
            else {
                if (xmlChars[0] === '?') {
                    xmlChars.shift();
                }
                pointer = new element_1.Element(pointer);
            }
        }
        else if (current === '/' || current === '?') {
            if (xmlChars[0] === '>') {
                xmlChars.shift();
                pointer = pointer.end();
            }
        }
        else if (current === '>') {
            pointer.status = element_1.ElementStatue.MatchValue;
        }
        else if (pointer.status === element_1.ElementStatue.MatchName) {
            if (current === ' ') {
                pointer.status = element_1.ElementStatue.MatchProps;
            }
            else {
                pointer.name += current;
            }
        }
        else if (pointer.status === element_1.ElementStatue.MatchProps) {
            pointer.attr(current);
        }
        else if (pointer.value) {
            pointer.value(current);
        }
    }
    return result.toObject();
};
exports.default = dolmx;
