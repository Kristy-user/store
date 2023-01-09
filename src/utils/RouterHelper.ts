import IFilters from '../interfaces/filters';

class RouterHelper {
  static checkId = (path: string): number | boolean => {
    const pathArray = path.split('/');
    if (pathArray.length !== 2) {
      return false;
    }
    const id = Number(pathArray.slice(-1).join(''));
    return id;
  };

  static setFilter = (path: string): IFilters => {
    if (path && path.includes('?')) {
      const filtersString: string = path.split('?')[1].replace('/', '');
      const filters: IFilters = {};
      filtersString.split('&').forEach((elem) => {
        const [key, valuesString] = elem.includes('=') ? elem.split('=') : elem;
        const values = valuesString.split('+');
        filters[key] = values;
      });

      return filters;
    }
    return {};
  };
}

export default RouterHelper;
