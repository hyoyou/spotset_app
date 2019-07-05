class PromiseFactory {
  createResolve(data) {
    return new Promise(((resolve, reject) => {
      resolve(data);
    }));
  }

  createReject(data) {
    return new Promise(((resolve, reject) => {
      reject(data);
    }));
  }
}

export default new PromiseFactory();
