export function flattenObjectToArray<T>(
  obj: Record<string, unknown>,
  matcher: (obj: any) => obj is T,
  acc = [],
): Array<T> {
  return Object.values(obj).reduce<Array<T>>(
    (subAcc: Array<T>, subObj: Record<string, unknown>) => {
      if (matcher(subObj)) {
        subAcc.push(subObj);
      } else if (typeof subObj === 'object') {
        flattenObjectToArray(subObj, matcher, subAcc);
      }
      return subAcc;
    },
    acc,
  );
}
