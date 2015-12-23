# Izeberg-calendar

Setup
-----
Clone the repository and install the dependencies.

    $ git clone https://github.com/PacciniBruno/izberg-calendar/.git my-project
    $ cd my-project
    $ npm install
    $ gulp serve

Do not forget to install globally gulp if not installed yet.

Build
------
If you want to build the project run.

    $ gulp build

It will compile the project and put the result under `dist` directory.

    $ gulp serve:dist

Testing
---------
Two options exists to run tests, the first one is for development process.

    $ gulp tdd

It will open a Google Chrome instance and run all tests on it, when a file is updated tests will be run again. You can see the rests as a notification or in the console.

The other option to run tests is for CI/deploy purposes, it will run all the tests against PanthomJS and output a tape format file for analysis.

    $ gulp test

You can get the results at `.tmp/test-results.xml`.


