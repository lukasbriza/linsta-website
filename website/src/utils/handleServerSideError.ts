export function handleServerSideError(
  instance: any,
  predicate: any,
  returnObj: object
) {
  if (predicate instanceof instance) {
    console.log(predicate);
    return returnObj;
  }
}
