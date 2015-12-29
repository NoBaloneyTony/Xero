//mocha_xero.js
//author: Tony Bosevski

require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();
var config = require("../config/config.json");
var username = config.xero.username;
var password = config.xero.password;
var lib = require("../lib/functions");

var wd;
try {
  wd = require('wd');
} catch( err ) {
  wd = require('../../lib/main');
}

var browser;

before(function (done) {
  browser = wd.promiseChainRemote();
  // optional extra logging
  browser.on('status', function(info) {
    console.log(info.cyan);
  });
  browser.on('command', function(eventType, command, response) {
    console.log(' > ' + eventType.cyan, command, (response || '').grey);
  });
  browser.on('http', function(meth, path, data) {
    console.log(' > ' + meth.magenta, path, (data || '').grey);
  });
  browser
    .init({browserName:'chrome'})
    .get("https://www.xero.com/au/")
    .nodeify(done);  //same as : .then(function() { done(); });
});

after(function (done) {
  //lib.logout(browser, done);
  browser
    .elementByXPath("//a[@class='username']")
    .click()
    .elementByXPath("//a[text()='Logout']")
    .click()
    .quit()
    .nodeify(done);
});

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// regular mocha usage is also an option
describe("Xero E2E Automation Test", function() {

    it("should retrieve the page title of main page", function (done) {
      browser
        .title()
        .then(function (title) {
          title.should.include("Accounting Software & Online Bookkeeping | Xero");
        })
        .nodeify(done);
    });

    it("should navigate User to the login page", function (done) {
      browser
	    .elementByXPath("//li/a[contains(., 'Login')]")
	    .click()
	    .eval("window.location.href")
	    .should.eventually.include('https://login.xero.com/')
      .nodeify(done);
    });

    it("should enter valid credentials to log in", function (done) {
        lib.login(browser, username, password, done);
    });

    it("should land at the Dashboard page", function (done) {
        browser
        .title()
        .then(function (title) {
          title.should.include("Xero | Dashboard");
        })
        .nodeify(done);
    });

    it("should select Demo Company (AU) from the menu list", function (done) {
      browser
        .elementByCss('h2.org-name')
        .click()
        .elementByXPath("//a[text()='Demo Company (AU)']")
        .click()
        .title().should.become("Xero | Dashboard | Demo Company (AU)")	
        .nodeify(done);
    });

    it("should select Sales from the Accounts menu and click the Repeating tab", function (done) {
      browser
       //select Accounts > Sales option from the menu bar
        .elementByCss('#Accounts')
        .click()
        .elementByXPath("//li/a[text()='Sales']")
        .click()
        .elementByXPath("//a[text()='Repeating']")
        .click()
        .nodeify(done);
    });

    it.skip("should select the Repeating tab (Task A)", function (done) {
      browser
       	//"There are no items to display."" text is shown by default.
        // Had to manually turn on repeat options for the records with overdue payments (> 14 days) as described in the Awaiting Payment table.
        .nodeify(done);
    });

    it("should verify that Repeating Invoices with references ORC1012, ORC1002 belong to City Limousines (Task B)", function (done) {
      browser
        .elementByXPath("//table/tbody/tr/td/a[text()='City Limousines']/../../td[contains(.,'ORC1012')]").text()
        .should.become('ORC1012')   //Reference number is verified for City Limousines
        .elementByXPath("//table/tbody/tr/td/a[text()='City Limousines']/../../td[contains(.,'ORC1002')]").text()
        .should.become('ORC1002')   //Reference number is verified for City Limousines      
        .nodeify(done);
    });

    it.skip("should check that the contact has a valid email address (Task B)", function (done) {
      browser
       //Manual task performed.
        .nodeify(done);   
    });

    it.skip("should turn on Invoice Reminders via Invoice Options for each Reference number (Task B)", function (done) {
      browser
       //Manual task performed.
        .nodeify(done);   
    });

    it.skip("should correct invoice balance amount to $250 as $850 has already been paid for ORC1012 (Task B)", function (done) {
      browser
       //Manual task performed.
        .nodeify(done);   
    });

    it.skip("should verify the number of Invoices in the Repeating table matches the number in the Awaiting Payments table (Task B)", function (done) {
      browser
       	//set the table into a defined state with Repeats turned on for Awaiting Payments records older than 14 days.
       	//verify the number of invoices equals 2
        //check that the invoice number equals ORC1012
        //check that the other invoice number equals ORC1002
        .nodeify(done);   
    });

    it.skip("should resend the Invoices where Payments > 14 days are Overdue to the Contact (Task B)", function (done) {
      browser
       //Manual task performed.
        .nodeify(done);   
    });

    it.skip("should verify that an email was correctly sent to the Contact for ORC1012 (Task B)", function (done) {
      browser
       //Manual task performed.
        .nodeify(done);   
    });

});
