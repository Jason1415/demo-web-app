/**
 * Taken from redux toolkit.
 * @returns {(t: T) => {payload : T}}
 */
export function withPayloadType<T>() {
    return (t : T) => ({ payload: t });
}
