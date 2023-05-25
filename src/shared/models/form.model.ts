export type Field<T> = {
    value: T;
    isValid: boolean;
    errorMessage?: string;
}