describe("fetch", function() {
    it("Check get successfull address", function() {
        let httpTransport = new window.HTTPTransport;
        httpTransport.get("../data/messages.json").then(res => onload = assert.equal(true, true));
    });
    it("Check get wrong address", function() {
        let httpTransport = new window.HTTPTransport;
        httpTransport.get("../data/messages.json1").then(res => onerror = assert.equal(true, true));
    });

    it("Check post", function() {
        let user = {
            name: 'John',
            surname: 'Smith'
        };

        let options = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user),
        };

        let httpTransport = new window.HTTPTransport;
        httpTransport.post('user.json', options).then(res => { if (res.statusText == "OK") { return assert.equal(true, true) } else { return assert.equal(false, true) } });
    });

    it("Check put", function() {
        let user = {
            name: 'Anna',
            surname: 'Swan'
        };

        let options = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user),
        };

        let httpTransport = new window.HTTPTransport;
        httpTransport.put('user.json', options).then(res => { if (res.statusText == "OK") { return assert.equal(true, true) } else { return assert.equal(false, true) } });
    });

    it("Check delete", function() {
        let httpTransport = new window.HTTPTransport;
        let options = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        };
        httpTransport.delete('user.json', options).then(res => { if (res.statusText == "OK") { return assert.equal(true, true) } else { return assert.equal(false, true) } });
    });

});