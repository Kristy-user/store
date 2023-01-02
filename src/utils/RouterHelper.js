class RouterHelper {
  static checkId = (path) => {
    const pathArray = path.split('/');
    if (pathArray.length !== 2) {
      return false;
    }
    const id = Number(pathArray.slice(-1).join(''));
    return id;
  };

  static setFilter = (path) => {
    if (path && path.includes('?')) {
      const filtersString = path.split('?')[1].replace('/', '');
      const filters = {};
      filtersString.split('&').forEach((elem) => {
        const [key, valuesString] = elem.split('=');
        const values = valuesString.split('+');
        filters[key] = values;
      });

      return filters;
    }
    return {};
  };
}

export default RouterHelper;
