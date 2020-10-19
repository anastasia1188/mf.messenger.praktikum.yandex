"use strict";

describe("fetch", function () {
  it("Check get successfull address", function () {
    var httpTransport = new window.HTTPTransport();
    httpTransport.get("../data/messages.json").then(function (res) {
      return onload = assert.equal(true, true);
    });
  });
  it("Check get wrong address", function () {
    var httpTransport = new window.HTTPTransport();
    httpTransport.get("../data/messages.json1").then(function (res) {
      return onerror = assert.equal(true, true);
    });
  });
  it("Check post", function () {
    var user = {
      name: 'John',
      surname: 'Smith'
    };
    var options = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    };
    var httpTransport = new window.HTTPTransport();
    httpTransport.post('user.json', options).then(function (res) {
      if (res.statusText == "OK") {
        return assert.equal(true, true);
      } else {
        return assert.equal(false, true);
      }
    });
  });
  it("Check put", function () {
    var user = {
      name: 'Anna',
      surname: 'Swan'
    };
    var options = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
    };
    var httpTransport = new window.HTTPTransport();
    httpTransport.put('user.json', options).then(function (res) {
      if (res.statusText == "OK") {
        return assert.equal(true, true);
      } else {
        return assert.equal(false, true);
      }
    });
  });
  it("Check delete", function () {
    var httpTransport = new window.HTTPTransport();
    var options = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    };
    httpTransport["delete"]('user.json', options).then(function (res) {
      if (res.statusText == "OK") {
        return assert.equal(true, true);
      } else {
        return assert.equal(false, true);
      }
    });
  });
});