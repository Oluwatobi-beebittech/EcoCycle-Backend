![EcoCycle Banner](https://res.cloudinary.com/dfybu7w8o/image/upload/v1670102878/ecocycle_banner_728X90_zc2ftp.png)
# :recycle: :seedling: EcoCycle (Backend)

EcoCycle is a waste recycling-focused service which seeks to harmonise, reward, and empower actors involved in waste recycling and climate change mitigation, especially in Africa.

This is the backend repository of the EcoCycle application.

## :hammer_and_wrench: Built with
- Nest JS
- TypeORM
- Typescript
- Ethers JS
### Third-Party Integrations
- - **Lazerpay**, for payments in stablecoins. Lazerpay will enable EcoCycle users topup their accounts using their country currency, withdraw funds to local bank accounts, and manage EcoProduct listings.

Currently, users of EcoCycle need to register seperately on Lazerpay and then link their public and secret keys to EcoCycle manually. A partnership with Lazerpay will ensure users only signup to EcoCycle while EcoCycle handles the user's registration on Lazerpay. Consequently, the process will be seamless for the user compared to the current setup.

## :gem: EcoCycle Application Repositories
- [**EcoCycle Frontend**](https://github.com/Oluwatobi-beebittech/EcoCycle#readme) https://github.com/Oluwatobi-beebittech/EcoCycle#readme
- [**EcoCycle Backend**](https://github.com/Oluwatobi-beebittech/EcoCycle-Backend#readme) https://github.com/Oluwatobi-beebittech/EcoCycle-Backend#readme
- [**EcoCycle Smart Contract (EcoToken)**](https://github.com/Oluwatobi-beebittech/EcoToken#readme) https://github.com/Oluwatobi-beebittech/EcoToken#readme
## :control_knobs: Smart Contract Details
- Token Name: EcoToken (ECO)
- Initial Supply: 20,000,000
- Decimals: 2
- Contract Deployed Address: 0x300aca0433775D4848675D8876c9c604BC0887F0
- Contract Verified at: https://mumbai.polygonscan.com/address/0x300aca0433775D4848675D8876c9c604BC0887F0#code

## Getting Started (Backend)
1. Clone repo using `git clone https://github.com/Oluwatobi-beebittech/EcoCycle-Backend.git`.
2. Ensure [Node Version Manager(NVM)](https://github.com/nvm-sh/nvm) is installed. The version of node used is 16.15.0.
3. Run `nvm use` to use node version 16.15.0.
4. Install all the application's packages using `npm install`.
5. Ensure you have docker desktop application installed. This application is dockerised for easy configuration and setup across devices and environments.
6. Create a `.env` file and insert the appropriate values for each environment variable. Check the `.env.example` file for the environment keys needed.
7. Run `docker compose build`.
8. Once the build is done, run `docker compose up` to power on the application.
9. Visit `http://localhost:3001` to see the app running

`.env.example sample`
```
APP_SERVER_PORT=3001
DB_TYPE=mariadb
DB_SERVER=mariadb:10.5.8
DB_HOST=ecocycle-mysql-server
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=ecocycle_db
DB_MIGRATIONS_RUN_ON_START=true
IS_PROD=false
JWT_SECRET=secret
ECO_ALCHEMY_API_KEY=
ECO_ALCHEMY_NETWORK_URL=
ECO_ALCHEMY_NETWORK_NAME=maticmum
ECO_TOKEN_CONTRACT_ADDRESS=0x300aca0433775D4848675D8876c9c604BC0887F0
ECO_TOKEN_DECIMALS=2
FRONTEND_BASE_URL=http://localhost:3000
LAZER_PAY_BASE_API_URL=https://api.lazerpay.engineering/api/v1/
```
