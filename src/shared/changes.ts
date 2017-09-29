interface BaseChange {
    path: string[];
}

interface SetChange extends BaseChange {
    kind: 'set';
    value: any;
}

interface PushChange extends BaseChange {
    kind: 'push';
    values: any[];
}

interface PopChange extends BaseChange {
    kind: 'pop';
}

interface SpliceChange extends BaseChange {
    kind: 'splice';
    index: number;
    deleteCount?: number;
    items?: any[];
}

export type Change = SetChange | PushChange | PopChange | SpliceChange;