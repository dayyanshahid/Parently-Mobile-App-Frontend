#!/bin/bash

# Parently Android Build Script
# Usage: ./build-android.sh [debug|release|bundle]

set -e

echo "🚀 Parently Android Build Script"
echo "================================="

# Default to release if no argument provided
BUILD_TYPE=${1:-release}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status()   { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success()  { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning()  { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error()    { echo -e "${RED}[ERROR]${NC} $1"; }

# --- ENVIRONMENT CHECK FUNCTIONS ---
check_command() {
    if command -v "$1" &>/dev/null; then
        print_status "$1 found at $(command -v $1)"
    else
        print_error "$1 not found in PATH!"
        MISSING_TOOLS=true
    fi
}

check_env() {
    if [ -z "$ANDROID_HOME" ]; then
        print_error "ANDROID_HOME is not set!"
        MISSING_TOOLS=true
    else
        print_status "ANDROID_HOME=$ANDROID_HOME"
        if [ ! -d "$ANDROID_HOME" ]; then
            print_error "ANDROID_HOME directory does not exist: $ANDROID_HOME"
            MISSING_TOOLS=true
        fi
    fi
}

check_build_env() {
    print_status "Checking Android Build Environment..."
    MISSING_TOOLS=false

    check_env
    check_command java
    check_command adb
    check_command sdkmanager

    # Java version
    if command -v java &>/dev/null; then
        JAVA_VERSION=$(java -version 2>&1 | head -n 1)
        print_status "Java Version: $JAVA_VERSION"
    fi

    # List SDK platforms
    if [ -d "$ANDROID_HOME/platforms" ]; then
        print_status "Installed SDK platforms:"
        ls "$ANDROID_HOME/platforms"
    else
        print_warning "No platforms installed in $ANDROID_HOME/platforms"
    fi

    if [ "$MISSING_TOOLS" = true ]; then
        print_error "Build environment is not correctly set up. Please fix the above issues."
        exit 1
    fi

    print_success "Android build environment looks good ✅"
}

# Ensure we’re in project root
if [ ! -f "package.json" ] || [ ! -d "android" ]; then
    print_error "Please run this script from the project root directory"
    exit 1
fi

# Ensure gradlew exists
if [ ! -f "android/gradlew" ]; then
    print_error "gradlew not found in android directory"
    exit 1
fi
chmod +x android/gradlew

# --- ANDROID SDK CHECK ---
if [ -z "$ANDROID_HOME" ] && [ ! -f "android/local.properties" ]; then
    print_warning "ANDROID_HOME not set and no local.properties found!"
    echo "Please set ANDROID_HOME or create android/local.properties with sdk.dir=<path>"
    exit 1
fi

# If ANDROID_HOME is set but no local.properties, create one
if [ -n "$ANDROID_HOME" ] && [ ! -f "android/local.properties" ]; then
    echo "sdk.dir=$ANDROID_HOME" > android/local.properties
    print_status "Created android/local.properties with sdk.dir=$ANDROID_HOME"
fi

# Disable Gradle configuration cache (avoids Expo + RN build issues)
GRADLE_PROPS="android/gradle.properties"
if ! grep -q "org.gradle.configuration-cache=false" "$GRADLE_PROPS" 2>/dev/null; then
    echo "org.gradle.configuration-cache=false" >> "$GRADLE_PROPS"
    print_status "Disabled Gradle configuration cache in gradle.properties"
fi

# --- RUN ENVIRONMENT CHECK ---
check_build_env

print_status "Starting build process..."
print_status "Build type: $BUILD_TYPE"

# Clean previous builds
cd android
print_status "Cleaning previous builds..."
./gradlew clean --no-configuration-cache

case $BUILD_TYPE in
    "debug")
        print_status "Building debug APK..."
        ./gradlew assembleDebug --no-configuration-cache
        APK_PATH="app/build/outputs/apk/debug/app-debug.apk"
        if [ -f "$APK_PATH" ]; then
            print_success "Debug APK built successfully!"
            print_status "APK location: $APK_PATH"
            print_status "APK size: $(du -h "$APK_PATH" | cut -f1)"
        else
            print_error "Debug build failed!"
            exit 1
        fi
        ;;
        
    "release")
        print_status "Building release APK..."
        ./gradlew assembleRelease --no-configuration-cache
        APK_PATH="app/build/outputs/apk/release/app-release.apk"
        if [ -f "$APK_PATH" ]; then
            print_success "Release APK built successfully!"
            print_status "APK location: $APK_PATH"
            print_status "APK size: $(du -h "$APK_PATH" | cut -f1)"
        else
            print_error "Release build failed!"
            exit 1
        fi
        ;;
        
    "bundle")
        print_status "Building release bundle (AAB)..."
        ./gradlew bundleRelease --no-configuration-cache
        BUNDLE_PATH="app/build/outputs/bundle/release/app-release.aab"
        if [ -f "$BUNDLE_PATH" ]; then
            print_success "Release bundle built successfully!"
            print_status "Bundle location: $BUNDLE_PATH"
            print_status "Bundle size: $(du -h "$BUNDLE_PATH" | cut -f1)"
        else
            print_error "Bundle build failed!"
            exit 1
        fi
        ;;
        
    *)
        print_error "Invalid build type: $BUILD_TYPE"
        print_status "Usage: ./build-android.sh [debug|release|bundle]"
        exit 1
        ;;
esac

cd ..

print_success "Build completed successfully! 🎉"
echo ""
echo "📱 Next Steps:"
case $BUILD_TYPE in
    "debug")   echo "   • Install: adb install android/app/build/outputs/apk/debug/app-debug.apk" ;;
    "release") echo "   • Install: adb install android/app/build/outputs/apk/release/app-release.apk" ;;
    "bundle")  echo "   • Upload to Google Play Console: android/app/build/outputs/bundle/release/app-release.aab" ;;
esac
