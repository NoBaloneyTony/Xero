//functions.js

function login(browser, username, password, done){

    this.username = username;
    this.password = password;

    browser
        .elementByCss('#email')
        .type(this.username)
        .elementByCss('#password')
        .type(this.password)
        .elementByCss('#submitButton')
        .click()
        .nodeify(done);
}

exports.login = login;


function logout(browser, done){
    
	browser
		.elementByXPath("//a[@class='username']")
		.click()
		.elementByXPath("//a[text()='Logout']")
		.click()
        .nodeify(done);
}

exports.logout = logout;