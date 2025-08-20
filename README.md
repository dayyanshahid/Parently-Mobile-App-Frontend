# Parently - Your Life Admin Assistant

A React Native Expo app powered by AI, designed to help parents manage their daily tasks, events, and family schedules with responsive design optimized for both iOS and Android.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- Yarn package manager
- Expo CLI
- For iOS: Xcode (macOS only)
- For Android: Android Studio

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd /path/to/parently
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   yarn start
   # or
   expo start --dev-client
   ```

## 📱 Development Testing

### Option 1: Expo Go App (Recommended for quick testing)
1. Install Expo Go on your device from App Store/Play Store
2. Scan the QR code from the terminal/browser
3. The app will load directly on your device

### Option 2: Device Simulators
```bash
# iOS Simulator (macOS only)
yarn ios
# or
expo run:ios

# Android Emulator
yarn android
# or
expo run:android
```

### Option 3: Web Browser
```bash
yarn web
# or
expo start --web
```

## 🏗️ Production Builds

### EAS Build (Cloud Building - Recommended)

#### Setup EAS CLI
```bash
# Install EAS CLI globally
npm install -g @expo/eas-cli

# Login to your Expo account
eas login
```

#### Build for Android (APK)
```bash
# Development/Preview APK (for testing)
eas build --platform android --profile preview

# Production APK
eas build --platform android --profile production-apk

# Production App Bundle (for Play Store)
eas build --platform android --profile production
```

#### Build for iOS
```bash
# iOS Simulator build (no Apple Developer account needed)
eas build --platform ios --profile preview

# Production iOS build (requires Apple Developer account)
eas build --platform ios --profile production
```

#### Build for Both Platforms
```bash
# Build both platforms simultaneously
eas build --platform all --profile preview
```

### Local Android Build (Alternative)

#### Using Gradle directly:
```bash
# Make the script executable
chmod +x build-android.sh

# Build debug APK
./build-android.sh

# Or manually:
cd android
./gradlew assembleDebug
# APK will be in: android/app/build/outputs/apk/debug/
```

#### Using npm scripts:
```bash
# Build debug APK
yarn build:android:debug

# Build release APK (requires signing)
yarn build:android:release
```

## 📋 Available Scripts

```bash
# Development
yarn start              # Start Expo development server
yarn ios                # Run on iOS simulator
yarn android            # Run on Android emulator
yarn web                # Run in web browser

# Building
yarn build:android:debug    # Build debug APK locally
yarn build:android:release  # Build release APK locally

# EAS Building
eas build --platform android --profile preview     # Android APK
eas build --platform ios --profile preview         # iOS Simulator
eas build --platform all --profile production      # Both platforms (production)
```

## 🎯 Key Features

- **Responsive Design**: Automatically adapts to different screen sizes and orientations
- **Cross-Platform**: Optimized for both iOS and Android with platform-specific adjustments
- **AI-Powered**: Life admin assistant functionality
- **Event Management**: Create, manage, and track family events
- **Task Management**: Organize and complete daily tasks
- **Calendar Integration**: Visual calendar with event scheduling
- **Family Profiles**: Manage multiple family members
- **Notifications**: Stay updated with reminders and alerts

## 🛠️ Technical Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **Styling**: Custom responsive design system
- **State Management**: React Hooks
- **Build System**: EAS Build
- **Icons**: Expo Vector Icons, React Native Iconify

## 📱 Responsive Design System

The app includes a comprehensive responsive design system located in `utils/`:

- **`utils/responsive.ts`**: Scaling functions and responsive utilities
- **`utils/platform.ts`**: Platform-specific styling helpers
- **`utils/theme.ts`**: Consistent theme system with disabled system influences

### Key Responsive Features:
- Automatic scaling based on device dimensions
- Platform-specific adjustments for iOS and Android
- Tablet and phone optimizations
- Consistent typography and spacing across devices
- Disabled system theme influences (light/dark mode override)

## 📁 Project Structure

```
parently/
├── app/                    # Screen components (Expo Router)
├── components/             # Reusable UI components
├── utils/                  # Responsive design system & utilities
├── assets/                 # Images, fonts, and static assets
├── android/                # Android native code
├── ios/                    # iOS native code
├── hooks/                  # Custom React hooks
├── eas.json               # EAS Build configuration
├── app.json               # Expo configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration Files

- **`eas.json`**: EAS Build profiles and configuration
- **`app.json`**: Expo app configuration with iOS/Android settings
- **`metro.config.js`**: Metro bundler configuration
- **`tsconfig.json`**: TypeScript configuration
- **`.easignore`**: Files to exclude from EAS builds

## 🚀 Deployment

### Android Play Store
1. Build production app bundle: `eas build --platform android --profile production`
2. Download the `.aab` file from EAS dashboard
3. Upload to Google Play Console

### iOS App Store
1. Build production iOS app: `eas build --platform ios --profile production`
2. Download the `.ipa` file from EAS dashboard
3. Upload to App Store Connect using Xcode or Transporter

### Testing Builds
- **Android**: Install the `.apk` file directly on Android devices
- **iOS**: Use the simulator build or distribute via TestFlight

## 🐛 Troubleshooting

### Common Issues:

1. **Metro bundler issues:**
   ```bash
   yarn start --clear
   ```

2. **iOS build issues:**
   - Ensure Xcode is updated
   - Check iOS deployment target (15.1+)

3. **Android build issues:**
   - Verify Android SDK and build tools
   - Check Java version compatibility

4. **EAS Build issues:**
   - Verify EAS CLI is logged in: `eas whoami`
   - Check build logs in EAS dashboard

### Build Size Optimization:
- The `.easignore` file excludes unnecessary files from builds
- Current build size: ~357MB (can be reduced further)

## 📞 Support

For issues and questions:
1. Check the build logs in EAS dashboard
2. Review the troubleshooting section above
3. Ensure all prerequisites are properly installed

## 🎉 Success Indicators

✅ **Development**: App runs smoothly on Expo Go and simulators
✅ **Responsive Design**: UI adapts perfectly to different screen sizes
✅ **Cross-Platform**: Consistent experience on iOS and Android
✅ **Production Ready**: Builds successfully generate installable files

---

**Happy coding! 🚀**
