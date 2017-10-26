const url = 'http://localhost:3000/'

const api = {
  getSuggestions: (text, callback) => {
    makeRequest('GET', url + 'getSuggestions/' + text, callback)
  }
}

function makeRequest (method, url, done) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = function () {
    done(null, JSON.parse(xhr.response));
  };
  xhr.onerror = function () {
    done(xhr.response);
  };
  xhr.send();
}

export default api
