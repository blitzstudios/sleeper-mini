# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0

FROM --platform=linux/amd64 node:${NODE_VERSION}

# Use production node environment by default.
ENV YARN_VERSION 1.22.21
RUN yarn policies set-version $YARN_VERSION

WORKDIR /usr/src/template

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.yarn to speed up subsequent builds.
# Leverage a bind mounts to package.json and yarn.lock to avoid having to copy them into
# into this layer.
RUN apt clean
RUN apt-get update
RUN apt-get install -y git

# Install Ruby and Bundler
RUN apt-get install -y ruby ruby-dev ruby-bundler

# Install build tools for native extensions
RUN apt-get install -y bash unzip libc6
RUN apt-get install -y build-essential

# Install Java (required for Android SDK)
RUN wget "https://download.java.net/java/GA/jdk11/9/GPL/openjdk-11.0.2_linux-x64_bin.tar.gz"
RUN tar -xzvf openjdk-11.0.2_linux-x64_bin.tar.gz
RUN mv jdk-11.0.2 /usr/lib/jvm/
ENV JAVA_HOME /usr/lib/jvm/
ENV PATH=$JAVA_HOME/bin:$PATH

RUN apt-get install -y ninja-build

# Download and unzip Android command-line tools
RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip -O /tmp/cmdline-tools.zip
RUN mkdir -p /usr/local/android-sdk/cmdline-tools
RUN unzip /tmp/cmdline-tools.zip -d /usr/local/android-sdk/cmdline-tools
RUN mv /usr/local/android-sdk/cmdline-tools/cmdline-tools /usr/local/android-sdk/cmdline-tools/latest
RUN rm /tmp/cmdline-tools.zip

# Set environment variables
ENV ANDROID_HOME /usr/local/android-sdk
ENV PATH $PATH:$ANDROID_HOME/cmdline-tools/latest/bin:$ANDROID_HOME/platform-tools
ENV ANDROID_NDK_HOME /usr/local/android-sdk/ndk/23.1.7779620
ENV PATH $PATH:$ANDROID_NDK_HOME/toolchains/llvm/prebuilt/linux-x86_64/bin

# Accept Android SDK licenses
RUN yes | sdkmanager --licenses

# Install specific Android SDK packages
RUN sdkmanager "platform-tools" "build-tools;33.0.0" "platforms;android-33" "ndk;23.1.7779620" "cmake;3.22.1"

# Expose the port that the application listens on.
EXPOSE 9000

ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.255.255.255"

# Run the application.
CMD yarn && yarn start

