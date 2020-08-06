export declare enum ElementStatue {
    MatchName = 0,
    MatchProps = 1,
    MatchValue = 2,
    Complete = 3
}
export declare class Element {
    name: string;
    status: ElementStatue;
    parent: any;
    private childs;
    private attribute;
    private attrList;
    private valueStr;
    private notChangeValue;
    constructor(parent?: any);
    add(element: any): void;
    end(): any;
    toObject(): any;
    attr(char: any): void;
    value(char: any, notChangeValue?: any): void;
}
