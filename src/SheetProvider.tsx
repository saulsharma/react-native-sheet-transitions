import React, { createContext, useContext, useCallback, useEffect, useState } from 'react'
import { Platform, View } from 'react-native'
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  cancelAnimation,
  SharedValue,
} from 'react-native-reanimated'

interface SheetContextType {
  scale: SharedValue<number>
  setScale: (scale: number) => void
  resizeType: 'incremental' | 'decremental'
  enableForWeb: boolean
  currentScale: SharedValue<number>
  registerOverlay: (id: string, component: React.ReactNode) => void
  unregisterOverlay: (id: string) => void
}

interface SheetProviderProps {
  children: React.ReactNode
  resizeType?: 'incremental' | 'decremental'
  enableForWeb?: boolean
}

const SheetContext = createContext<SheetContextType | null>(null)

export function SheetProvider({
  children,
  resizeType = 'decremental',
  enableForWeb = false,
}: SheetProviderProps) {
  const scale = useSharedValue(1)
  const currentScale = useSharedValue(1)
  const isMounted = useSharedValue(false)
  const [overlays, setOverlays] = useState<Map<string, React.ReactNode>>(new Map())

  useEffect(() => {
    // Delay setting isMounted to ensure view is ready
    requestAnimationFrame(() => {
      isMounted.value = true
    })

    return () => {
      isMounted.value = false
      cancelAnimation(scale)
    }
  }, [])

  const setScale = useCallback((newScale: number) => {
    if (!isMounted.value) return

    currentScale.value = newScale

    if (Platform.OS === 'android') {
      scale.value = newScale
      return
    }

    scale.value = withSpring(newScale, {
      damping: 20,
      stiffness: 300,
      mass: 0.3,
    })
  }, [])

  const registerOverlay = useCallback((id: string, component: React.ReactNode) => {
    setOverlays((prev) => new Map(prev).set(id, component))
  }, [])

  const unregisterOverlay = useCallback((id: string) => {
    setOverlays((prev) => {
      const next = new Map(prev)
      next.delete(id)
      return next
    })
  }, [])

  const animatedStyle = useAnimatedStyle(() => {
    if (!isMounted.value) return {}

    return {
      transform: [{ scale: scale.value }],
    }
  }, [])

  const isEnabled = Platform.OS === 'web' ? enableForWeb : true

  return (
    <SheetContext.Provider
      value={{
        scale,
        setScale,
        resizeType,
        enableForWeb: isEnabled,
        currentScale,
        registerOverlay,
        unregisterOverlay,
      }}
    >
      <View style={{ flex: 1 }}>
        {/* Scaled content */}
        <Animated.View
          style={[
            {
              flex: 1,
              backfaceVisibility: 'hidden',
            },
            Platform.OS === 'ios' ? animatedStyle : null,
          ]}
          collapsable={false}
        >
          {children}
        </Animated.View>

        {/* Overlays render here, outside the scaled Animated.View */}
        {Array.from(overlays.entries()).map(([id, component]) => (
          <React.Fragment key={id}>{component}</React.Fragment>
        ))}
      </View>
    </SheetContext.Provider>
  )
}

export function useSheet() {
  const context = useContext(SheetContext)
  if (!context) {
    throw new Error('useSheet must be used within a SheetProvider')
  }
  return context
}
