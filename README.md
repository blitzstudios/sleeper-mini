# Sleeper-Mini template

![Sleeper](https://user-images.githubusercontent.com/61988202/223927288-c54734de-39f9-40c5-bb24-d1b193c9c374.png)


# Getting Started

This template project provides a starting point for developing a Sleeper Mini. At a high level, minis are developed in react-native and packaged into bundles for the Sleeper app to load at runtime. The simplest way to get started is by using docker, which will prepare the correct environment. Have a separate simulator/emulator for mini development can be useful, but is not required.

## Requirements:

- Git
- Enable developer-mode on Sleeper App (ask Sleeper Employee)

## Optional Software Requirements

- Docker
- XCode Simulator
- Android Emulator (part of Android Studio)

## Quick Start using Docker

1. git clone this Repo
2. install docker
3. open command line and navigate to template folder
4. open Sleeper app on any device with developer-mode enabled
5. use Developer mini overlay to get the IP of your device
6. Update your device IP in app.json and save
5. execute "docker compose up" -- this begins the packager and connects to the Sleeper App
6. on Sleeper app, navigate to minis tab and see template mini
7. you should see compiling messages on the command line

### Special Notes for IOS Simulator

- Using ios Simulator will require a manual installations

### Special Notes for Android Emulator if using Docker

1. After following quick start, open a separate console and navigate to template folder
2. execute "docker compose exec environment sh ./buildapk.sh" (this step may take a while)
3. open any Android emulator
4. find file template/mini-debug.apk and drag to emulator
5. run template app on android emulator

## Manual Installation

1. This project requires a working setup of [React Native](https://reactnative.dev/docs/environment-setup?guide=native). Follow the steps in this guide under the `React Native CLI Quickstart` tab.
2. Sleeper uses the following tool versions for development. If you run into any issues with setup, you can try changing your environment to point to these versions. We recommend a version manager like [asdf](https://asdf-vm.com/) to automate switching these between projects.

| Tool | Version |
| --- | --- |
| XCode | 15.0 |
| MacOS | 13.6 |
| java | zulu-11.56.19 |
| nodejs | 20.10.0 |
| ruby | 3.1.0 |
| cocoapods | 1.12.1 |

3. Install the latest version of our custom vscode-react-native [plugin](https://github.com/blitzstudios/sleeper-mini/blob/main/template/dev_tools/vscode-react-native-3.3.0.vsix). This is a [fork](https://github.com/blitzstudios/vscode-react-native/commits/release/3.3) of the official project that includes fixes to run webpack with react native.
4. Clone this repo locally.
5. Run `yarn` from the `template/` folder and `pod install` from `template/ios` to set up node modules and native dependencies.
6. If running in VS code, make sure to start the app from the [vscode project file](https://github.com/blitzstudios/sleeper-mini/blob/main/template.code-workspace). This will automatically set your webpack dev server to the correct ports.
7. If running manually, make sure to run with `yarn start` and `yarn ios`. These will also make sure your dev ports are set up correctly.

## To connect with a running prod app on your local network:

1. Contact us to enable developer mode on your account.
2. Start up the Sleeper app. This can be the production app, a development mode app in a simulator or on device, or a [Mac Catalyst](https://apps.apple.com/us/app/sleeper-fantasy-sports/id987367543) build.
3. If your account is marked as a developer, you may, at any point, <b>physically shake</b> your phone to open up a connection window. This displays your device's IP, current connection status to this template project on your computer, and buttons to refresh + send data manually to your PC at any time.
4. Tap on the last tab in the tab bar at the bottom of the screen. Select "Developer Mini" from the list.

<img width="330" alt="Simulator Screen Shot - iPhone 13 - 2023-04-07 at 14 38 02" src="https://github.com/blitzstudios/sleeper-mini/assets/61988202/71607a24-14ad-45a2-a9b7-e70f32e02f53">

5. Copy the IP address from the dev menu, and paste it in [app.json](https://github.com/blitzstudios/sleeper-mini/blob/main/template/app.json).
6. Launch this app by following the steps in [Manual Installation](#Manual-Installation) above.
7. If all goes well, the Sleeper app will automatically connect after a few seconds.
8. You can now make any change you want in the mini, and when you hit the "refresh" button in Sleeper, the new code will update.

## Editing the app

1. We've prepackaged this project with a few starter templates, located [here](https://github.com/blitzstudios/sleeper-mini/tree/main/template/src).
2. Select a project to start with by editing [app.json](https://github.com/blitzstudios/sleeper-mini/blob/6938294b47fb4f764f9e5e70e8b7d00749f38b4e/template/app.json#L6) and changing the selected sample ID. Restart your packager each time you change this value.
3. All user changes should hook into the main index.js file of the sample you selected from [these folders](https://github.com/blitzstudios/sleeper-mini/tree/main/template/src). Feel free to delete or modify components as necessary, but refrain from modifying any library files or [index.tsx](https://github.com/blitzstudios/sleeper-mini/blob/main/template/index.tsx), as those handle some behind the scenes communication events.
4. Feel free to edit the top level `package.json` and add new packages to your project. Note that these packages either must already exist within Sleeper (if they include native code), or must be entirely comprised of javascript. For a list of packages included in Sleeper, check out [mini_packages.json](https://github.com/blitzstudios/sleeper-mini/blob/main/template/mini_packages.json).
5. Some types and components have been provided for use through an included `@sleeperhq/mini-core` package. You can check out the repo [here](https://github.com/blitzstudios/sleeper-mini-core).
6. Further documentation and API hooks are in development.

## Troubleshooting

### Auto refresh stops working, or socket-related errors appear in the console.
Try restarting the phone that Sleeper is running on. Also stop and restart the packager for your development app.

### How do I submit my mini?
You can run `yarn build-mini` to generate a .zip file containing all of your source code. Please contact us and send this file over when you are ready to release. In the future, this process will be automated.
