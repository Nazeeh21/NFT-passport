# Scaffold-Eth 2

Youtube video link: https://youtu.be/qb0VusN3qMg

# NFT Passport
NFT Passport is a decentralized application that allows users to create and collect virtual passport stamps as NFTs based on the countries they visit. It is built on top of Ethereum and uses ERC-721 tokens to represent passports and country stamps.

## Features
- Create a personal passport as an NFT
- Collect country stamps as NFTs when visiting countries
- Showcase your travel history with NFTs

## Usage
1. Connect your Ethereum wallet by clicking the "Connect Wallet" button in the top right corner.
2. Create a passport NFT by clicking "Create Passport".
3. To collect stamps, navigate to the https://nft-passport.vercel.app/collectStamp route and upload any photo of a country you have visited or whose stamp you wanna collect. I am not storing image, just using the location stored in the image and using that to verify whether user has visited or not.
4. Once, location is verified, you can collect the stamp by clicking "Collect Stamp" button.

## Future enhancements
- Store onchain svgs of stamps instead of using images
- Allow only the contract owner to create stamps
- Enhance UI/UX
- Show more info about the user like number of stamps collected, when he/she visited the country etc.