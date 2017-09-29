import { ChangeList } from 'server/change-list';

export var observable = (function () {
    var properties = {
        isObservable: Symbol('isObservable'),
        path: Symbol('path')
    };

    var isPrimitive = function (val: any): val is object {
        var valType = typeof val;
        return (valType !== 'object' && valType !== 'function') || (val == null);
    }

    var interceptorCreators: {[key: string]: (changeList: ChangeList, path: string[], target: any[]) => Function} = {
        push: function (changeList, path, target) {
            return function (...values: any[]) {
                changeList.addChange({
                    kind: 'push',
                    path: path,
                    values: values
                });
                return target.push(...values);
            }
        },
        pop: function (changeList, path, target) {
            return function () {
                changeList.addChange({
                    kind: 'pop',
                    path: path
                });
                return target.pop();
            }
        },
        splice:  function (changeList, path, target) {
            return function (index: number, deleteCount?: number, ...items: any[]) {
                changeList.addChange({
                    kind: 'splice',
                    path: path,
                    index,
                    deleteCount,
                    items
                });
                if (deleteCount == null) {
                    return target.splice(index);
                } else if (!items || items.length < 1) {
                    return target.splice(index, deleteCount);
                } else {
                    return target.splice(index, deleteCount, ...items);
                }
            }
        }
    };

    return function (store: any, changeList: ChangeList, path: string[]) {
        var interceptedMethods: {
            [key: string]: Function
        } = {};

        return new Proxy(store, {
            get(target, property) {
                if (property === properties.isObservable) {
                    return true;
                }

                if (property === properties.path) {
                    return path;
                }

                var value = target[property];

                if (isPrimitive(value) || value[properties.isObservable]) {
                    return value;
                }

                if (interceptorCreators.hasOwnProperty(property)) {
                    if (!interceptedMethods[property]) {
                        interceptedMethods[property] = interceptorCreators[property](changeList, path, target);
                    }
                    return interceptedMethods[property];
                }

                target[property] = observable(value, changeList, path.concat([property.toString()]));
                return target[property];
            },

            set(target, property, value) {
                target[property] = value;
                changeList.addChange({
                    kind: 'set',
                    path: path.concat([property.toString()]),
                    value: value
                });
                
                return true;
            }
        });
    }
})();