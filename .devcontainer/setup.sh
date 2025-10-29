#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# Store the original working directory (should be the workspace root)
ORIGINAL_DIR=$(pwd)
echo "--- Starting Android SDK setup in ${ORIGINAL_DIR} ---"

# 1. Define SDK installation directory within the container's home
SDK_DIR="/home/vscode/android-sdk"
echo "Target SDK Installation directory: ${SDK_DIR}"
mkdir -p "${SDK_DIR}" # Ensure SDK root directory exists

# Use a temporary directory for download and unzip
TEMP_DIR=$(mktemp -d)
echo "Working temporarily in ${TEMP_DIR}"
cd "${TEMP_DIR}" # Change into temp dir

# 2. Download the latest command-line tools
#    Note: Check for the latest URL/version if this script fails years later
CMDLINE_TOOLS_URL="https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip"
echo "Downloading command-line tools from ${CMDLINE_TOOLS_URL}..."
curl -fsSL -o commandlinetools.zip "${CMDLINE_TOOLS_URL}"

# 3. Unzip the tools
echo "Unzipping tools..."
unzip -q commandlinetools.zip

# 4. Prepare final SDK structure directory
mkdir -p "${SDK_DIR}/cmdline-tools"

# 5. Move the unzipped 'cmdline-tools' directory to the final location
echo "Moving tools to final destination: ${SDK_DIR}/cmdline-tools/latest"
# The unzipped folder is named 'cmdline-tools', move its contents
mv "${TEMP_DIR}/cmdline-tools" "${SDK_DIR}/cmdline-tools/latest"

# 6. Clean up the temporary directory
echo "Cleaning up temporary directory ${TEMP_DIR}..."
# IMPORTANT: Change back to the original directory *before* removing temp dir
cd "${ORIGINAL_DIR}"
rm -rf "${TEMP_DIR}"
echo "Returned to ${ORIGINAL_DIR}"

# 7. Set Environment Variables for *this script's execution*
#    These help sdkmanager run correctly within this script.
#    Gradle primarily uses the local.properties file (created later).
echo "Setting temporary environment variables for SDK Manager..."
export ANDROID_SDK_ROOT="${SDK_DIR}"
export ANDROID_HOME="${SDK_DIR}" # Some tools might still prefer ANDROID_HOME
export PATH="${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools:${PATH}"
echo "ANDROID_SDK_ROOT=${ANDROID_SDK_ROOT}"
echo "Updated PATH includes SDK tools temporarily"

# Define the path to sdkmanager
SDKMANAGER="${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin/sdkmanager"

# 8. Verify sdkmanager
echo "Verifying sdkmanager..."
"${SDKMANAGER}" --version

# 9. Accept licenses automatically
echo "Accepting licenses..."
yes | "${SDKMANAGER}" --licenses > /dev/null

# 10. Install required SDK components
#     Adjust versions based on your React Native project requirements
PLATFORMS_VERSION="android-34"
BUILD_TOOLS_VERSION="34.0.0"
# Check React Native docs for the recommended NDK version for your RN version
NDK_VERSION="26.1.10909125"
echo "Installing SDK components: platform-tools, platforms;${PLATFORMS_VERSION}, build-tools;${BUILD_TOOLS_VERSION}, ndk;${NDK_VERSION}"
"${SDKMANAGER}" "platform-tools" "platforms;${PLATFORMS_VERSION}" "build-tools;${BUILD_TOOLS_VERSION}" "ndk;${NDK_VERSION}"

# 11. Create local.properties for Gradle
#     Assumes an 'android' directory exists at the project root.
#     This tells Gradle where to find the SDK.
echo "Creating/Updating android/local.properties with SDK path..."
if [ -d "android" ]; then
  echo "sdk.dir=${SDK_DIR}" > android/local.properties
  echo "Created android/local.properties"
else
  echo "Warning: 'android' directory not found at project root. Skipping creation of local.properties."
  echo "You may need to create this file manually inside your 'android' directory: echo 'sdk.dir=${SDK_DIR}' > android/local.properties"
fi

echo "--- Android SDK setup script finished successfully ---"

# Optional: Add a reminder about .gitignore
echo "*** REMINDER: Ensure 'local.properties' is listed in your /android/.gitignore file! ***"
