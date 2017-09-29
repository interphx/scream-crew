import { Change } from 'shared/changes';

export interface ChangeList {
    addChange(change: Change): void;
    getChangesForTree(root: string[]): Change[];
    clear(): void;
}

export class SimpleChangeList implements ChangeList {
    protected changes: Change[] = [];

    constructor() {

    }

    addChange(change: Change) {
        this.changes.push(change);
    }

    getChangesForTree(root: string[]): Change[] {
        var result: Change[] = [];
        for (var change of this.changes) {
            if (change.path.length < root.length) {
                continue;
            }

            var valid: boolean = true;
            for (var i = 0; i < root.length; ++i) {
                if (change.path[i] !== root[i]) {
                    valid = false;
                    break;
                }
            }
            
            if (!valid) {
                continue;
            }

            result.push(change);
        }
        return result;
    }

    clear() {
        this.changes.length = 0;
    }
}