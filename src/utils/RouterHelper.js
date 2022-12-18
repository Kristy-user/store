class RouterHelper {
  static checkId = (path) => {
    const pathArray = path.split('/');
    console.log(pathArray);
    if (pathArray.length !== 2) {
      return false;
    }
    const id = Number(pathArray.slice(-1).join(''));
    return id;
  };

  static setFilter = (path) => {
    //// здесь нужна ф-ия для выбора критериев из строки запроса
  };
}

export default RouterHelper;
