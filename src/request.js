const MAX_REQUEST = 6;
const MAX_INTERVAL = 1005;
class Request {
  constructor(){
    this.rateLimit = MAX_REQUEST;
    setInterval(() => {
      this.rateLimit = MAX_REQUEST;
    }, MAX_INTERVAL);
  }
  async fetchAsync(url, { res, forceResolve }, attemptNumber = 1, id) {
    if (attemptNumber !== 1) {
      console.warn(`Attempt${attemptNumber} url: ${id}`)
    }
    if (this.rateLimit === 0 && forceResolve) {
      // keep trying until resolved
      return new Promise((res) => {
        setTimeout(() => {
          this.fetchAsync(url, {res, forceResolve}, attemptNumber + 1, id)
        }, 100)
      });
    } else {
      this.rateLimit--;
      const jsonPromise = (await fetch(url)).json();
      if (attemptNumber !== 1) {
        console.log(`SUC${attemptNumber} url: ${id}`)
      }
      if (res && forceResolve) {
        res(jsonPromise);
      }
      return jsonPromise;
    }
  }
}


export default new Request();
