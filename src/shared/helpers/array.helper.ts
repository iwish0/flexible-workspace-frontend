export class ArrayHelper {

    public static find<T, K extends keyof T>(
        list: T[],
        key: K,
        condition: T[K]
    ): T | undefined {
        return list.find((item: T) => item[key] === condition);
    }
}