# 🚀 Parently - Release Build Instructions

## Prerequisites

### Required Software
- **Node.js** 18+ 
- **Java Development Kit (JDK)** 17 or 11
- **Android SDK** (via Android Studio or command line tools)
- **Yarn** package manager

### Environment Setup
```bash
# Verify Java version
java -version

# Verify Android SDK
echo $ANDROID_HOME

# Install dependencies
yarn install
```

## 📱 Building with Gradlew

### Quick Build Commands

#### 🔧 Debug Build (for testing)
```bash
# Using build script (recommended)
./build-android.sh debug

# Or manually
cd android && ./gradlew assembleDebug
```

#### 🚀 Release APK (for distribution)
```bash
# Using build script (recommended)
./build-android.sh release

# Or manually
cd android && ./gradlew assembleRelease
```

#### 📦 Release Bundle (for Google Play Store)
```bash
# Using build script (recommended)
./build-android.sh bundle

# Or manually
cd android && ./gradlew bundleRelease
```

### Build Outputs

| Build Type | Output Location | Use Case |
|------------|----------------|----------|
| Debug APK | `android/app/build/outputs/apk/debug/app-debug.apk` | Development & Testing |
| Release APK | `android/app/build/outputs/apk/release/app-release.apk` | Direct Distribution |
| Release Bundle | `android/app/build/outputs/bundle/release/app-release.aab` | Google Play Store |

## 🔧 Build Configuration

### Optimizations Applied
- ✅ **Hardware Acceleration** enabled
- ✅ **Proguard** minification for release builds
- ✅ **Resource Shrinking** to reduce APK size
- ✅ **PNG Crunching** for optimized images
- ✅ **Hermes** JavaScript engine for better performance
- ✅ **New Architecture** (Fabric + TurboModules) enabled
- ✅ **Multidex** support for large apps

### Architecture Support
- **Release builds**: `armeabi-v7a`, `arm64-v8a` (optimized for production)
- **Debug builds**: All architectures for testing

## 🛠️ Advanced Build Options

### Clean Build
```bash
cd android && ./gradlew clean
```

### Build Specific Architecture
```bash
cd android && ./gradlew assembleRelease -PreactNativeArchitectures=arm64-v8a
```

### Build with Verbose Output
```bash
cd android && ./gradlew assembleRelease --info
```

### Generate Build Report
```bash
cd android && ./gradlew assembleRelease --profile
```

## 📋 Pre-Release Checklist

### Before Building
- [ ] Update version in `app.json` and `android/app/build.gradle`
- [ ] Test on physical devices (various screen sizes)
- [ ] Run `yarn type-check` for TypeScript errors
- [ ] Run `yarn lint` for code quality
- [ ] Verify all assets are included in `assets/` folder
- [ ] Test offline functionality
- [ ] Verify app permissions in `android/app/src/main/AndroidManifest.xml`

### After Building
- [ ] Test APK installation on clean device
- [ ] Verify app launches correctly
- [ ] Test core functionality
- [ ] Check app size (should be optimized)
- [ ] Test on different Android versions

## 🔐 Signing Configuration

### Debug Signing
- Uses default debug keystore
- Automatically configured

### Release Signing
- Configure in `android/app/build.gradle`
- Update keystore path and credentials
- **Important**: Keep keystore file secure and backed up

```gradle
signingConfigs {
    release {
        storeFile file('your-release-key.keystore')
        storePassword 'your-store-password'
        keyAlias 'your-key-alias'
        keyPassword 'your-key-password'
    }
}
```

## 🚨 Troubleshooting

### Common Issues

#### Build Fails with Memory Error
```bash
# Increase Gradle memory in android/gradle.properties
org.gradle.jvmargs=-Xmx4096m -XX:MaxMetaspaceSize=1024m
```

#### Metro Bundle Error
```bash
# Clear Metro cache
yarn start --reset-cache
```

#### Gradle Daemon Issues
```bash
cd android && ./gradlew --stop
```

#### Clean Everything
```bash
# Clean all caches
yarn start --reset-cache
cd android && ./gradlew clean
rm -rf node_modules && yarn install
```

## 📊 Build Performance Tips

### Faster Builds
- Enable Gradle parallel builds (already configured)
- Use Gradle build cache (already configured)
- Use file system watching (already configured)
- Close unnecessary applications during build

### Smaller APK Size
- Use release builds (Proguard enabled)
- Enable resource shrinking (already configured)
- Remove unused assets
- Optimize images before adding to assets

## 🎯 Distribution

### Direct APK Distribution
1. Build release APK: `./build-android.sh release`
2. Share APK file with testers
3. Enable "Install from Unknown Sources" on test devices

### Google Play Store
1. Build release bundle: `./build-android.sh bundle`
2. Upload AAB to Google Play Console
3. Follow Google Play review process

## 📞 Support

If you encounter issues:
1. Check this documentation
2. Review build logs for specific errors
3. Ensure all prerequisites are installed
4. Try cleaning and rebuilding

---

**Happy Building! 🎉**
