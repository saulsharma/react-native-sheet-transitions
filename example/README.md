# React Native Sheet Transitions - Example App

This is a comprehensive example app demonstrating all the features of the `react-native-sheet-transitions` library.

## Features Demonstrated

### 1. Basic Bottom Sheet

- Simple bottom sheet with default configuration
- Drag-to-dismiss functionality
- Background scaling effect
- Smooth spring animations

### 2. Modal Sheet

- Custom spring configuration
- Opacity animation on gesture
- Custom border radius
- Different animation feel

### 3. Drag Directions

- Multi-directional drag support
- Drag down, left, or right to dismiss
- Flexible gesture handling

### 4. Nested Sheets

- Multiple layers of sheets
- Depth effect with background scaling
- Complex navigation flows

## Running the Example

### Prerequisites

- Node.js 18+ or Bun 1.0+
- iOS Simulator (for iOS) or Android Emulator (for Android)
- Expo Go app (for physical device testing)

### Installation

```bash
# From the example directory
bun install

# Or using npm
npm install
```

### Start the App

```bash
# Start Expo dev server
bun start

# Run on iOS
bun ios

# Run on Android
bun android

# Run on web
bun web
```

## Code Structure

The example app is organized as a single `App.tsx` file containing:

- Main navigation with demo cards
- Individual demo components for each feature
- Comprehensive styling and layout examples

## Learning from the Examples

Each demo showcases different configuration options:

**Basic Sheet:**

```tsx
<SheetScreen
  onClose={onClose}
  scaleFactor={0.9}
  dragThreshold={150}
>
```

**Custom Springs:**

```tsx
<SheetScreen
  springConfig={{
    damping: 20,
    stiffness: 90,
    mass: 0.8,
  }}
  opacityOnGestureMove={true}
>
```

**Drag Directions:**

```tsx
<SheetScreen
  dragDirections={{
    toBottom: true,
    toLeft: true,
    toRight: true,
  }}
>
```

## Tips

- Try different spring configurations to see how they affect the animation feel
- Experiment with scale factors to see the background effect
- Nest multiple sheets to understand the depth effect
- Test on both iOS and Android to see platform-specific behaviors

## Need Help?

Check out the [main README](../README.md) for full API documentation and more examples.
