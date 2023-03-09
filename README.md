# Sleeper-Mini template

![Sleeper](https://user-images.githubusercontent.com/61988202/223927288-c54734de-39f9-40c5-bb24-d1b193c9c374.png)

## How to run

1. Install the latest version of our custom vscode-react-native [plugin](https://github.com/blitzstudios/sleeper-mini/blob/main/template/dev_tools/vscode-react-native-3.1.0.vsix). This is a [fork](https://github.com/blitzstudios/vscode-react-native/commits/release/3.0) of the official project that includes fixes to run webpack with react native.
2. Clone this repo locally.
3. Run `yarn` and `pod install` to set up node modules and native dependencies.
4. If running in VS code, make sure to start the app from the [vscode project file](https://github.com/blitzstudios/sleeper-mini/blob/main/template.code-workspace). This will automatically set your webpack dev server to the correct ports.
5. If running manually, make sure to run with `yarn start` and `yarn ios`. These will also make sure your dev ports are set up correctly.

## To connect with a running prod app on your local network:

1. Contact us to enable developer mode on your account.
2. Start up the Sleeper app. This can be the production app, a development mode app in a simulator or on device, or a [Mac Catalyst](https://apps.apple.com/us/app/sleeper-fantasy-sports/id987367543) build.
3. Scroll to the right panel. Tap on the `Mini` button.
4. You will see the device's IP address listed on the debug window.

![Screen Shot 2023-03-08 at 9 27 06 PM](https://user-images.githubusercontent.com/61988202/223928554-ee2acd51-d38f-4b74-a43d-5dcb0e734053.png)

5. Copy this IP address, and paste it in [app.json](https://github.com/blitzstudios/sleeper-mini/blob/main/template/app.json).
6. Launch this app by following the steps in [how to run](#how-to-run) above.
7. If all goes well, the Sleeper app will automatically connect after a few seconds.
8. You can now make any change you want in the mini, and when you hit the "refresh" button in Sleeper, the new code will update.

## Troubleshooting

### Auto refresh stops working, or socket-related errors appear in the console.
Try restarting the phone that Sleeper is running on. Also stop and restart the packager for your development app.

### Adding a new npm package is causing errors.
Packages with native code cannot be added to mini projects. However, you are safe to add pure javascript packages.

### How do I submit my mini?
This is a work in progress. More details will be available soon.
