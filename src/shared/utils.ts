export function getRandomId(length: number): string {
    var result = '';
    while (result.length < length) {
        result += Math.random().toString(36).slice(2);
    }
    return result.slice(0, length).toUpperCase();
}

export function getRandomReal(min: number, max: number): number {
    return min + Math.random() * (max - min);
}

export function getRandomInteger(min: number, max: number): number {
    return Math.floor(getRandomReal(min, max));
}

export function getRandomBoolean(): boolean {
    return Boolean(getRandomInteger(0, 2));
}

export function getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function noop(...args: any[]) {

}

export function identity<T>(value: T): T {
    return value;
}

export function constant<T>(value: T): (...args: any[]) => T {
    return function() {
        return value;
    }
}