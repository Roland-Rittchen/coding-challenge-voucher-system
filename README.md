# Coding challenge - Voucher codes

The challenge description was:
"To offer rewards for people getting the COVID 19 vaccination - we want to
create a shop to buy & redeem vouchers from
our moonshiner online shop to get some cool Hoodie merch. - Our motto
will be “Stitch for Jab” "

MVP Requirements:
● Enterprise customers can buy an unlimited number of Individual
Vouchers to send out to their employees
● CSV exports of available bought vouchers
● Voucher Redemption using a very basic frontend form
● Secure Transaction Database Model
● Unit tests

## Technologies used

<p align="left"><a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a> <a href="https://nextjs.org/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://github.com/puppeteer/puppeteer" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/pptrdev/pptrdev-official.svg" alt="puppeteer" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

## Implementation

Enterprise Customers can register/login. Once logged in they will see a link to the vouchers page in the header.
On the vouchers page they can select the number of codes they want to purchase. The codes will be displayed on the page, and a CSV file with the codes is available for download.

On the main home page any visitor (logged in or not logged in) can redeem a voucher code for the hoodie. As confirmation for the successful transaction an alert message will pop up.

Testing of the entire process from beginning to end is implemented with jest-puppeteer.
The test is also integrated in github actions and thus visible in the github repo.

Currently no live deployment - Heroku's github integration is down due to a security incident.
