import React, { useEffect, useCallback } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
  cancelAnimation,
} from 'react-native-reanimated'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import { useSheet } from './SheetProvider'
import type { SpringConfig, DragDirections } from './types'
import { ScrollHandler } from './ScrollHandler'
import { PHYSICS, SCREEN_SIZE, ACCESSIBILITY } from './constants'
import { useReducedMotion } from './utils'

interface Props {
  children: React.ReactNode
  onClose: () => void
  scaleFactor?: number
  dragThreshold?: number
  springConfig?: SpringConfig
  dragDirections?: DragDirections
  isScrollable?: boolean
  style?: any
  opacityOnGestureMove?: boolean
  containerRadiusSync?: boolean
  initialBorderRadius?: number
  disableSyncScaleOnDragDown?: boolean
  customBackground?: React.ReactNode
  onOpenStart?: () => void
  onOpenEnd?: () => void
  onCloseStart?: () => void
  onCloseEnd?: () => void
  onBelowThreshold?: () => void
  disableRootScale?: boolean
  disableSheetContentResizeOnDragDown?: boolean
}

export function SheetScreen({
  children,
  onClose,
  scaleFactor = 0.83,
  dragThreshold, // Now optional - will use adaptive default
  springConfig, // Now optional - will use physics-based default
  dragDirections = {
    toTop: false,
    toBottom: true,
    toLeft: false,
    toRight: false,
  },
  isScrollable = false,
  style,
  opacityOnGestureMove = false,
  initialBorderRadius = 50,
  disableSyncScaleOnDragDown = false,
  customBackground,
  onOpenStart,
  onOpenEnd,
  onCloseStart,
  onCloseEnd = onClose,
  onBelowThreshold,
  disableRootScale = false,
  disableSheetContentResizeOnDragDown = false,
}: Props) {
  const { setScale, resizeType, enableForWeb, currentScale } = useSheet()
  const reducedMotion = useReducedMotion()

  // Pre-compute values that will be needed in worklets
  const effectiveThreshold = dragThreshold ?? PHYSICS.ADAPTIVE_DRAG_THRESHOLD
  const significantVelocityThreshold = PHYSICS.SIGNIFICANT_VELOCITY
  const screenHeight = SCREEN_SIZE.height
  const screenWidth = SCREEN_SIZE.width
  const reducedMotionDuration = PHYSICS.REDUCED_MOTION_DURATION
  const minOpacity = ACCESSIBILITY.PREFER_CROSS_FADE_THRESHOLD

  // Pre-compute spring config
  const baseSpringConfig = springConfig ?? PHYSICS.SPRING_CONFIGS.interactive
  const effectiveSpringConfig: { damping: number; stiffness: number; mass: number } = {
    damping: baseSpringConfig.damping ?? 25,
    stiffness: baseSpringConfig.stiffness ?? 350,
    mass: baseSpringConfig.mass ?? 0.6,
  }

  const finalSpringConfig = reducedMotion
    ? PHYSICS.SPRING_CONFIGS.reducedMotion
    : effectiveSpringConfig
  const translateY = useSharedValue(0)
  const translateX = useSharedValue(0)
  const opacity = useSharedValue(1)
  const borderRadius = useSharedValue(initialBorderRadius)
  const hasPassedThreshold = useSharedValue(false)
  const isMounted = useSharedValue(true)
  const previousScale = useSharedValue(1)
  const scrollState = useSharedValue({
    isAtTop: true,
    isAtBottom: false,
    scrollY: 0,
    velocity: 0,
  })
  const isDragging = useSharedValue(false)

  const shouldEnableScale = Platform.OS === 'ios' && !disableRootScale

  useEffect(() => {
    return () => {
      isMounted.value = false
      cancelAnimation(translateY)
      cancelAnimation(translateX)
      cancelAnimation(opacity)
      cancelAnimation(borderRadius)
    }
  }, [])

  const updateScale = React.useCallback(
    (newScale: number) => {
      if (Platform.OS === 'android' || !isMounted.value) {
        return
      }
      setScale(newScale)
    },
    [setScale]
  )

  useEffect(() => {
    if (!shouldEnableScale) {
      if (__DEV__) {
        console.log('Background scaling is disabled on Android and Web. Only available on iOS.')
      }
      return
    }

    // Save the current scale before changing it
    previousScale.value = currentScale.value

    const initialScale = resizeType === 'incremental' ? 1.15 : scaleFactor
    if (onOpenStart) onOpenStart()
    setScale(initialScale)
    setTimeout(() => {
      if (onOpenEnd) onOpenEnd()
    }, 300)

    // Restore the previous scale when closing
    return () => setScale(previousScale.value)
  }, [scaleFactor, resizeType, shouldEnableScale])

  const effectiveDragDirections = React.useMemo(
    () => ({
      ...dragDirections,
      toTop: isScrollable ? scrollState.value.isAtBottom : dragDirections.toTop,
      toBottom: isScrollable ? scrollState.value.isAtTop : dragDirections.toBottom,
    }),
    [dragDirections, isScrollable, scrollState.value]
  )

  const handleScrollStateChange = useCallback(
    (state: { isAtTop: boolean; isAtBottom: boolean; scrollY: number; velocity: number }) => {
      scrollState.value = state
    },
    []
  )

  const panGesture = React.useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          'worklet'
          if (!isMounted.value) return
          hasPassedThreshold.value = false

          if (scrollState.value.isAtTop) {
            isDragging.value = true
            translateY.value = 0
          }
        })
        .onUpdate(event => {
          'worklet'
          if (!isMounted.value) return
          const { translationX, translationY } = event

          if ((scrollState.value.isAtTop || !isScrollable) && isDragging.value) {
            if (
              (effectiveDragDirections.toBottom && translationY > 0) ||
              (effectiveDragDirections.toTop && translationY < 0)
            ) {
              translateY.value = translationY
            }
          }

          if (effectiveDragDirections.toRight || effectiveDragDirections.toLeft) {
            if (
              (effectiveDragDirections.toRight && translationX > 0) ||
              (effectiveDragDirections.toLeft && translationX < 0)
            ) {
              translateX.value = translationX
            }
          }

          const translation = Math.max(
            effectiveDragDirections.toBottom || effectiveDragDirections.toTop
              ? Math.abs(translationY)
              : 0,
            effectiveDragDirections.toLeft || effectiveDragDirections.toRight
              ? Math.abs(translationX)
              : 0
          )

          const willClose = translation > effectiveThreshold

          if (willClose !== hasPassedThreshold.value) {
            hasPassedThreshold.value = willClose
            if (willClose) {
              if (onCloseStart) runOnJS(onCloseStart)()
            } else {
              if (onBelowThreshold) runOnJS(onBelowThreshold)()
            }
          }

          const progress = Math.min(
            translation / (effectiveDragDirections.toBottom ? screenHeight : screenWidth),
            1
          )

          if (!disableSyncScaleOnDragDown && shouldEnableScale) {
            const newScale =
              resizeType === 'incremental'
                ? 1.15 - progress * 0.15
                : scaleFactor + progress * (1 - scaleFactor)
            runOnJS(updateScale)(newScale)
          }

          if (opacityOnGestureMove) {
            // Use 70% minimum opacity to maintain context (progressive disclosure best practice)
            opacity.value = interpolate(
              progress * screenHeight,
              [0, screenHeight * 0.5],
              [1, minOpacity],
              Extrapolate.CLAMP
            )
          }
        })
        .onEnd(event => {
          'worklet'
          isDragging.value = false
          const { velocityX, velocityY, translationX, translationY } = event

          const isClosingAllowed =
            (translationY > 0 && effectiveDragDirections.toBottom) ||
            (translationY < 0 && effectiveDragDirections.toTop) ||
            (translationX > 0 && effectiveDragDirections.toRight) ||
            (translationX < 0 && effectiveDragDirections.toLeft)

          if (!isClosingAllowed) {
            // Not in allowed direction, return to original position
            translateY.value = withSpring(0, {
              velocity: velocityY,
              ...finalSpringConfig,
            })
            translateX.value = withSpring(0, {
              velocity: velocityX,
              ...finalSpringConfig,
            })
            opacity.value = withSpring(1)
            borderRadius.value = withSpring(initialBorderRadius)
            if (shouldEnableScale) {
              runOnJS(updateScale)(resizeType === 'incremental' ? 1.15 : scaleFactor)
            }
            return
          }

          // Calculate primary translation and velocity
          const primaryTranslation =
            effectiveDragDirections.toBottom || effectiveDragDirections.toTop
              ? Math.abs(translationY)
              : Math.abs(translationX)

          const primaryVelocity =
            effectiveDragDirections.toBottom || effectiveDragDirections.toTop
              ? Math.abs(velocityY)
              : Math.abs(velocityX)

          // Convert velocity to dp/s (velocity from gesture is in px/ms)
          const velocityInDpPerSecond = primaryVelocity * 1000

          // Determine if should dismiss based on velocity and distance
          const isFastFling =
            velocityInDpPerSecond > significantVelocityThreshold &&
            primaryTranslation > effectiveThreshold * 0.3
          const crossedThreshold = primaryTranslation > effectiveThreshold
          const shouldClose = isFastFling || crossedThreshold

          if (shouldClose) {
            const finalTranslation =
              effectiveDragDirections.toBottom || effectiveDragDirections.toTop
                ? screenHeight
                : screenWidth

            if (reducedMotion) {
              // Use timing animation for reduced motion
              const duration = reducedMotionDuration
              translateY.value = withTiming(
                effectiveDragDirections.toBottom
                  ? finalTranslation
                  : effectiveDragDirections.toTop
                    ? -finalTranslation
                    : 0,
                { duration }
              )
              translateX.value = withTiming(
                effectiveDragDirections.toRight
                  ? finalTranslation
                  : effectiveDragDirections.toLeft
                    ? -finalTranslation
                    : 0,
                { duration }
              )
              opacity.value = withTiming(0, { duration })
              borderRadius.value = withTiming(0, { duration })
            } else {
              // For high velocity, add more damping to prevent overshoot
              const dampingMultiplier = velocityInDpPerSecond > 2000 ? 1.2 : 1.0
              const adaptiveConfig = {
                ...finalSpringConfig,
                damping: finalSpringConfig.damping * dampingMultiplier,
              }

              translateY.value = withSpring(
                effectiveDragDirections.toBottom
                  ? finalTranslation
                  : effectiveDragDirections.toTop
                    ? -finalTranslation
                    : 0,
                {
                  velocity: velocityY,
                  ...adaptiveConfig,
                }
              )
              translateX.value = withSpring(
                effectiveDragDirections.toRight
                  ? finalTranslation
                  : effectiveDragDirections.toLeft
                    ? -finalTranslation
                    : 0,
                {
                  velocity: velocityX,
                  ...adaptiveConfig,
                }
              )
              opacity.value = withSpring(0)
              borderRadius.value = withSpring(0)
            }

            if (shouldEnableScale) {
              runOnJS(updateScale)(1)
            }
            runOnJS(onCloseEnd)()
          } else {
            // Return to original position
            const dampingMultiplier = velocityInDpPerSecond > 2000 ? 1.2 : 1.0
            const returnConfig = {
              ...finalSpringConfig,
              damping: finalSpringConfig.damping * dampingMultiplier,
            }

            translateY.value = withSpring(0, {
              velocity: velocityY,
              ...returnConfig,
            })
            translateX.value = withSpring(0, {
              velocity: velocityX,
              ...returnConfig,
            })
            opacity.value = withSpring(1)
            borderRadius.value = withSpring(initialBorderRadius)
            if (shouldEnableScale) {
              runOnJS(updateScale)(resizeType === 'incremental' ? 1.15 : scaleFactor)
            }
          }
        }),
    [effectiveDragDirections, isScrollable, scrollState]
  )

  const animatedStyle = useAnimatedStyle(() => {
    if (!isMounted.value) return {}

    const scale = disableSheetContentResizeOnDragDown
      ? 1
      : interpolate(
          Math.max(Math.abs(translateY.value), Math.abs(translateX.value)),
          [0, effectiveDragDirections.toBottom ? screenHeight : screenWidth],
          resizeType === 'incremental' ? [1.15, 1] : [1, 0.85],
          Extrapolate.CLAMP
        )

    return {
      transform: [{ translateY: translateY.value }, { translateX: translateX.value }, { scale }],
      opacity: opacity.value,
      borderRadius: borderRadius.value,
    }
  }, [disableSheetContentResizeOnDragDown])

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }))

  const renderContent = () => {
    if (!isScrollable) return children

    return (
      <ScrollHandler panGesture={panGesture} onScrollStateChange={handleScrollStateChange}>
        {children}
      </ScrollHandler>
    )
  }

  if (!enableForWeb) {
    return (
      <View style={StyleSheet.absoluteFill}>
        {customBackground && <View style={StyleSheet.absoluteFill}>{customBackground}</View>}
        <View style={[styles.container, style]}>{renderContent()}</View>
      </View>
    )
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      {customBackground && (
        <Animated.View style={backgroundStyle}>{customBackground}</Animated.View>
      )}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.container, style, animatedStyle]}>
          {renderContent()}
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
})
