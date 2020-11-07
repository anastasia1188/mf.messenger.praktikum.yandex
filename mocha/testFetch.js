describe("fetch", function() {
    it("Check get successfull address", function() {
        let httpTransport = new window.HTTPTransport;
        httpTransport.get("../data/messages.json").then(res => assert.isDefined(res.responseText, "data has been received"));
    });
    it("Check get wrong address", function() {
        let httpTransport = new window.HTTPTransport;
        httpTransport.get("../data/messages1.json").then(res => assert.equal(res.statusText, 'Not Found', "Wrong address"));
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
        httpTransport.post('user.json', options).then(res => assert.equal(res.statusText, 'OK', 'Status text is valid'));
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
            data: JSON.stringify(user),
        };

        let httpTransport = new window.HTTPTransport;
        httpTransport.put('user.json', options).then(res => assert.equal(res.statusText, 'OK', 'Status text is valid'));
    });

    it("Check delete", function() {
        let httpTransport = new window.HTTPTransport;
        let options = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        };
        httpTransport.delete('user.json', options).then(res => {
            assert.equal(res.statusText, 'OK', 'Status text is valid')
        });
    });

});