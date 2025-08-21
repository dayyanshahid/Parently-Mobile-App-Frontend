# 📱 iOS Release Testing Guide (Ubuntu Linux)

Since you're on Ubuntu Linux and need to provide iOS test builds to clients without TestFlight, here are the recommended approaches:

## 🚀 Recommended Solution: EAS Build + Direct Distribution

### Option 1: EAS Build with Ad Hoc Distribution (Recommended)

```bash
# 1. Install EAS CLI
npm install -g eas-cli

# 2. Login to Expo
eas login

# 3. Configure iOS build for ad hoc distribution
eas build:configure
```

**Update your `eas.json` for ad hoc distribution:**

```json
{
  "build": {
    "ios-adhoc": {
      "extends": "production",
      "distribution": "internal",
      "ios": {
        "buildConfiguration": "Release",
        "enterpriseProvisioning": "adhoc"
      }
    }
  }
}
```

**Build and distribute:**

```bash
# Build ad hoc IPA
eas build --platform ios --profile ios-adhoc

# After build completes, you'll get a download link
# Share this IPA file directly with your client
```

### Option 2: Expo Development Build + OTA Updates

```bash
# 1. Create development build for iOS
eas build --platform ios --profile development

# 2. Client installs the development build once
# 3. Push updates via Expo Updates (no rebuild needed)
eas update --branch production --message "Release candidate for testing"
```

## 📋 Client Installation Process

### For Ad Hoc Distribution:
1. **Client needs to provide their device UDID**
   - Settings → General → About → scroll to find UDID
   - Or use iTunes/Finder to get UDID

2. **Add UDID to Apple Developer Console**
   - Login to developer.apple.com
   - Certificates, Identifiers & Profiles → Devices
   - Add client's device UDID

3. **Rebuild with updated provisioning profile**
   ```bash
   eas build --platform ios --profile ios-adhoc --clear-cache
   ```

4. **Client installation:**
   - Download IPA file from EAS build link
   - Install via AltStore, Sideloadly, or Xcode (if they have Mac)

### For Development Build + OTA:
1. Client installs development build once (same UDID process)
2. Future updates are delivered over-the-air automatically
3. No need to reinstall the app for updates

## 🛠️ Alternative Tools for IPA Installation

### AltStore (Recommended for clients)
- Free tool for installing IPAs on iOS
- Works on Windows/Mac
- Client can install without developer account

### Sideloadly
- Free tool for sideloading IPAs
- Works on Windows/Mac/Linux
- Easy for non-technical users

### Diawi
- Web service for distributing IPAs
- Upload IPA, get shareable link
- Client opens link on iOS device to install

## 📝 Step-by-Step Process

### 1. Prepare for iOS Build
```bash
# Update app.json with iOS configuration
# (already done in your project)

# Ensure you have Apple Developer account
# Add client device UDIDs to developer console
```

### 2. Build iOS Release
```bash
# Build ad hoc distribution
eas build --platform ios --profile ios-adhoc

# Or build development version for OTA updates
eas build --platform ios --profile development
```

### 3. Distribute to Client
```bash
# Option A: Direct IPA sharing
# Download IPA from EAS build link
# Share IPA file with client + installation instructions

# Option B: Web distribution via Diawi
# Upload IPA to diawi.com
# Share the generated link with client
```

## 🔧 Updated EAS Configuration

Add this to your `eas.json`:

```json
{
  "cli": {
    "version": ">= 12.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      }
    },
    "ios-adhoc": {
      "extends": "production",
      "distribution": "internal",
      "ios": {
        "buildConfiguration": "Release",
        "enterpriseProvisioning": "adhoc",
        "resourceClass": "m-medium"
      }
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "resourceClass": "m-medium"
      }
    },
    "production": {
      "ios": {
        "resourceClass": "m-medium"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

## 💡 Pro Tips

1. **For Multiple Testers:** Use development build + OTA updates
2. **For Single Client:** Ad hoc distribution works well
3. **Keep UDIDs:** Save client device UDIDs for future builds
4. **Test First:** Always test the IPA on a test device before sharing

## 🚨 Important Notes

- **Apple Developer Account Required:** You need a paid Apple Developer account ($99/year)
- **Device Limit:** Ad hoc distribution limited to 100 devices per year
- **UDID Required:** Each test device must be registered with Apple
- **Certificate Management:** EAS handles certificates automatically

## 🎯 Recommended Workflow

1. Get client's device UDID
2. Add UDID to Apple Developer Console
3. Build with EAS: `eas build --platform ios --profile ios-adhoc`
4. Share IPA download link with client
5. Provide installation instructions (AltStore/Sideloadly)

This approach lets you build and distribute iOS apps from Ubuntu Linux without needing a Mac or TestFlight!
