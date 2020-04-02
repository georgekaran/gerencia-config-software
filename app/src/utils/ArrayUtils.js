export const sortDescendingBy = (array, property) => {
  const arrayCopy = Array.from(array);

  function sortByComparable(a, b) {
    if (a[property] < b[property])
      return -1;
    if (a[property]> b[property])
      return 1;
    return 0;
  }

  return arrayCopy.sort(sortByComparable).reverse();
};