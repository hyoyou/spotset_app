class PromiseFactory {
  createResolve(data) {
    return new Promise((resolve, _reject) => {
      resolve(data);
    });
  }

  createReject(data) {
    return new Promise((_resolve, reject) => {
      reject(data);
    });
  }
}

export default new PromiseFactory();
