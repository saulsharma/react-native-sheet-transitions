import { Dimensions, PixelRatio } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

/**
 * Convert dp (density-independent pixels) to actual pixels
 * Ensures consistent sizes across different screen densities
 */
export const dp = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size)
}

/**
 * Physics constants based on platform guidelines
 */
export const PHYSICS = {
  // Velocity thresholds (dp/second)
  SIGNIFICANT_VELOCITY: dp(1200), // Matches Material Design guidelines
  MIN_FLING_VELOCITY: dp(500),
  MAX_FLING_VELOCITY: dp(8000),

  // Distance thresholds (device-independent)
  MIN_DRAG_THRESHOLD: dp(80), // Minimum for small devices
  DEFAULT_DRAG_THRESHOLD: dp(120), // Default for most devices
  MAX_DRAG_THRESHOLD: dp(200), // Maximum for large devices

  // Calculate adaptive threshold based on screen size
  ADAPTIVE_DRAG_THRESHOLD: Math.max(
    dp(80),
    Math.min(dp(200), SCREEN_HEIGHT * 0.15) // 15% of screen height
  ),

  // Spring configurations optimized for smooth, realistic motion
  SPRING_CONFIGS: {
    // Quick, snappy response (for dismiss/open)
    responsive: {
      damping: 30,
      stiffness: 400,
      mass: 0.5,
    },
    // Smooth, gentle (for settling)
    gentle: {
      damping: 35,
      stiffness: 300,
      mass: 0.8,
    },
    // Bouncy but controlled (for interactive drag)
    interactive: {
      damping: 25,
      stiffness: 350,
      mass: 0.6,
    },
    // Reduced motion alternative (faster, no overshoot)
    reducedMotion: {
      damping: 50, // Higher damping = less oscillation
      stiffness: 500, // Higher stiffness = faster
      mass: 0.3,
    },
  },

  // Gesture recognition
  MIN_DISTANCE_FOR_DRAG: dp(8), // Minimum movement to consider as drag
  TOUCH_SLOP: dp(8), // Platform touch slop

  // Animation durations (ms) for reduced motion
  REDUCED_MOTION_DURATION: 200,
  DEFAULT_ANIMATION_DURATION: 350,
}

/**
 * Screen size categories for adaptive behavior
 */
export const SCREEN_SIZE = {
  isSmall: SCREEN_HEIGHT < 700,
  isMedium: SCREEN_HEIGHT >= 700 && SCREEN_HEIGHT < 900,
  isLarge: SCREEN_HEIGHT >= 900,
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
}

/**
 * Accessibility constants
 */
export const ACCESSIBILITY = {
  // Minimum touch target size (44x44 points per iOS, 48x48 dp per Android)
  MIN_TOUCH_TARGET: dp(48),
  // Reduce animation duration for accessibility
  PREFER_CROSS_FADE_THRESHOLD: 0.7, // 70% to prevent full fade-out
}
