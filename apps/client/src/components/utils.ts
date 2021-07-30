export const isString = (value: unknown): value is string => typeof value === 'string';

export const useSetTitle = () => (title: string) => document.title = title;
