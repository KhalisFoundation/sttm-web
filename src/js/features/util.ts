export function createAction<A>(type: A): () => { type: A };
export function createAction<A, P>(
  type: A
): (payload: P) => { type: A; payload: P };
export function createAction<A, M, P>(
  type: A,
  meta: M
): (payload: P) => { type: A; meta: M; payload: P };
export function createAction<A, M, P>(type: A, meta?: M) {
  return (payload?: P) => ({
    type,
    meta,
    payload,
  });
}
