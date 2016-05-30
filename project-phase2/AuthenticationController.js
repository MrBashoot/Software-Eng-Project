'use strict'

class AuthenticationController {
    constructor() {
        this.authenticationRepository = require('./AuthenticationRepository');
    }

    login(req, res) {
        let credentials = req.body;
        console.log("app.post(/api/login).req.body", credentials);

        this.authenticationRepository.login(credentials).then(userInfo => res.json(userInfo))
            .catch(err => {
                console.log(err);
                res.statusMessage = err;
                res.status(400).end();
            });
    }
}

module.exports = new AuthenticationController();

