# Xero E2E Automated Test
by Tony Bosevski

Summary: 

I chose to automate using nodejs and a package called WD, which requires a selenium server to run tests using specific browsers, in combination with a BDD based testing framework called mocha. 

I selected nodejs because it is a lightweight programming application of Javascript. I liked the simple syntax of WD for coding the automated script in preference to other popular packages. I also selected mocha as the test runner tool of choice on the basis of its feature rich BDD based testing framework. 

I will now explain both the setup of my automated test framework and the details pertaining to the automation of the Xero end-to-end (E2E) test sample. 


Dev Environment: Linux 64-bit system 

Tools/Apps: nodejs, mocha, WD, selenium-standalone, terminal client, Sublime Text 2, Chrome browser, chromedriver

Priviledges: Administrator (su) level access to install some npm packages globally

Zip folder structure:

Xero 	
- config > config.json
- lib > functions.js
- node_modules > ...
- result > spec.html
- test > mocha_xero.js, mocha.opts
- util > util.js 

package.json, 
makefile, 
closure.js (sample .js file)

Firstly install a stable version of nodejs (e.g. v5.3): https://nodejs.org/en/download/stable/

Install nodejs packages as per package.json file (refer to Xero root folder). 

Since the package.json file is already defined, open a terminal window and under the nodejs folder just type 'npm install' to install the required packages for the purpose of this test.

To explain the package.json file in more detail, read on...

To create a dependencies package under the root folder (nodejs), type 'npm init' to create the package.json file and follow the prompts. The package.json file contains all the relevant project information (meta data) necessary for setting up packages and running scripts.

Note: To install individual packages and save the dependencies to package.json file you must use nodejs' package manager, npm: for example, to  install an npm package,  open a terminal window (or cmd window) and type 'npm install wd', Whenever a package is installed in a folder, the packages are placed under node_modules folder by default if installed locally. To install packages globally, you must use the -g option, e.g. 'npm install mocha -g' where the -g option implies a global setting but let's not worry about the -g option for now as mocha is not listed as a dependency in package.json when using the '-g' option. 

Essential installs include the selenium-standalone npm package which will be used to launch the browser driver and chrome driver because the intention is to use the better performing Chrome browser to run the tests instead of the default Firefox browser.

The selenium-standalone npm package can be installed by following the excellent instructions shown here: https://www.npmjs.com/package/selenium-standalone.

The Chrome driver binary can be found here: http://chromedriver.storage.googleapis.com/index.html. In Linux the driver script (google-chrome bin) was extracted to the /usr/bin/ folder as per recommendations.

To install mocha as the testing framework, run the following command at the terminal/command prompt: 
'npm install mocha -g'

The next step is to run the script created to automate an end-to-end scenario using a Xero Demo (AU) application to satisfy instructions related to Task A. To execute the automated mocha script, there are several ways to add more flexibilty in executing automated scripts. 

i) Start a new terminal session and start the selenium-standalone server using the following terminal (or cmd) command: 'selenium-standalone start'.

ii) Create a Makefile to tell mocha where the mocha runner is installed and which folder to find the mocha tests. For the purpose of this test, the mocha scripts are installed under the nodejs > test folder.

iii) To specify default mocha related options, create a mocha.opts file to specify default options and place this file under the test folder. For the purpose of this test, the timeout has been increased to 60s as denoted by the option, --timeout 60000.

To execute the Task A script, open a new terminal session (or cmd window) and enter the following commands: 

i) 'cd nodejs/test'
- By default, mocha runs scripts in the test folder. For the purpose of this test, however, the User should navigate to the nodejs/test folder to run the following command.

ii) 'mocha mocha_xero.js -t 60000 -R doc  > ../result/spec.html'
- The above command runs mocha_xero.js automated test script using the mocha test runner. 

- The -t 60000 option is to ensure the timeout is set to 60s at runtime. This timeout value is already set as a default value in the mocha.opts file but I notice that this value is not set at times.
- The -R doc is the reporting format chosen to display the results of the test as an html output. 
- the test result is published as 'spec.html' under the result folder.

Hopefully reading the mocha_xero.js script is self explanatory. For the purpose of this demo, some actions were peformed manually to simplify the automated script. 

For example, the Repetition table was manually set up with reminders for invoices which have not been paid within 14 days after the due payment date. Therefore, the task was to verify that the reminders were resent to the Contact's email address for the Invoice References listed in the Repeating table.

The manual actions described were set as pending tasks within the mocha_xero.js script as denoted by the mocha BDD hook 'it.skip' which sets specific tests as 'pending' at run time.

The script is designed to be simple and very readable. Debugging information is turned on, which makes trouble shooting potential script related problems a relatively straightforward exercise.

For example, the command call is shown, the subsequent get/post information is described as is the corresponding message response. This information can be turned off to reduce screen clutter.

I have used some configuration settings (i.e. nodejs > config > config.json) for username and password instead of exposing this information within the script. 

Certain utility functions are stored under nodejs > util > util.js file. For example, files which generate random alphanumeric data although I have also installed the handy faker package to randomise personal parameters such as firstnames, surnames, gender, postal addresses, email addresses, personal phone numbers, DOB, Company Name, Position Title, etc... in case I need better content to draw data from.

Improvements to script maintenance and modularity can be made if more page objects and/or script workflows are created as function libraries. For the sake of keeping the automated test as simple as practical, I only applied 2 library functions to this automated test, the 'login' and 'logout' functions found in the ./lib/functions.js pathname. For example, the selection of items within the menu bar and/or tabs can be incorporated as functions to simplify automation maintenance.

In my mind I like the framework chosen because of its level of simplicity, practicality and feedback for the purpose of this demo.

<EOF>


 
