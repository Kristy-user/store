class RouterHelper {
  static pathToRegex = (path) =>
    new RegExp('^' + path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)') + '$');

  static getParams = (match) => {
    const values = match.result.slice(1);

    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
      (result) => result[1]
    );
    console.log(
      match,
      values,
      keys,
      Object.fromEntries(
        keys.map((key, i) => {
          return [key, values[i]];
        })
      )
    );
    return Object.fromEntries(
      keys.map((key, i) => {
        return [key, values[i]];
      })
    );
  };
}

export default RouterHelper;
