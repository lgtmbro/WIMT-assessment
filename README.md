# Transport feedback scoring assessment

## Getting Started

- Install project dependencies: `npm i`
- Perhaps run all tests to ensure there isn't an issue: `npm test`
- Build the project `npm run build`
- Add `reference-data.txt` and `scores.txt` to `./data`
- Run the application `npm start`
- **Test, Build and Run in one step `npm run all`**

#

### `Promise.all()` getting ready to read all the files for the report.

![](https://media.giphy.com/media/l4FGpPki5v2Bcd6Ss/giphy-downsized.gif)

#

### Notes

- Padded sample scores with extra 0 to make it 2 decimal places, so 1.0 becomes 1.00
- Added `reference-data.txt` and `scores.txt` to `./data` to make the person that evaluates this codes life easier
- The project is currently only configured output results for Transport Feedback, however I have made it easy to adapt it into CLI tool that you can pass files and report plugin names to and get an output.
