import { AccessibilityInfo } from 'react-native'
import { useEffect, useState } from 'react'

/**
 * Hook to detect if user prefers reduced motion
 * Respects system accessibility settings
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Check initial state
    AccessibilityInfo.isReduceMotionEnabled().then(enabled => {
      setReducedMotion(enabled)
    })

    // Listen for changes
    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', enabled => {
      setReducedMotion(enabled)
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return reducedMotion
}

/**
 * Calculate velocity in dp/second from pixels/ms
 */
export function calculateVelocity(velocity: number): number {
  // velocity from gesture is in pixels/ms, convert to pixels/second
  return Math.abs(velocity * 1000)
}

/**
 * Determine if gesture should trigger dismiss based on velocity and distance
 */
export function shouldDismiss(
  translation: number,
  velocity: number,
  threshold: number,
  significantVelocity: number
): boolean {
  const absTranslation = Math.abs(translation)
  const absVelocity = calculateVelocity(velocity)

  // Fast fling with minimum distance
  if (absVelocity > significantVelocity && absTranslation > threshold * 0.3) {
    return true
  }

  // Crossed threshold
  if (absTranslation > threshold) {
    return true
  }

  return false
}

/**
 * Calculate appropriate spring config based on velocity
 */
export function getSpringConfig(
  velocity: number,
  reducedMotion: boolean,
  baseConfig: { damping: number; stiffness: number; mass: number }
): { damping: number; stiffness: number; mass: number } {
  if (reducedMotion) {
    return {
      damping: 50,
      stiffness: 500,
      mass: 0.3,
    }
  }

  const absVelocity = calculateVelocity(velocity)

  // For high velocity, use more damping to avoid excessive overshoot
  if (absVelocity > 2000) {
    return {
      ...baseConfig,
      damping: baseConfig.damping * 1.2,
    }
  }

  return baseConfig
}
