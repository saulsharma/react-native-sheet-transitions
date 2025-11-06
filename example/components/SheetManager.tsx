import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { SheetScreen, useSheet } from 'react-native-sheet-transitions'
import type { SheetScreenProps } from 'react-native-sheet-transitions'

interface SheetConfig extends Partial<Omit<SheetScreenProps, 'children' | 'onClose'>> {
  content: ReactNode
}

interface SheetManagerContextType {
  openSheet: (config: SheetConfig) => void
  closeSheet: () => void
}

const SheetManagerContext = createContext<SheetManagerContextType | null>(null)

const OVERLAY_ID = 'global-sheet'

export function SheetManagerProvider({ children }: { children: ReactNode }) {
  const [sheetConfig, setSheetConfig] = useState<SheetConfig | null>(null)
  const { registerOverlay, unregisterOverlay } = useSheet()

  const openSheet = useCallback((config: SheetConfig) => {
    setSheetConfig(config)
  }, [])

  const closeSheet = useCallback(() => {
    setSheetConfig(null)
  }, [])

  // Register/unregister overlay with SheetProvider
  useEffect(() => {
    if (sheetConfig) {
      registerOverlay(
        OVERLAY_ID,
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <SheetScreen
            {...sheetConfig}
            onClose={closeSheet}
            disableRootScale={true}
          >
            {sheetConfig.content}
          </SheetScreen>
        </View>
      )
    } else {
      unregisterOverlay(OVERLAY_ID)
    }

    return () => {
      unregisterOverlay(OVERLAY_ID)
    }
  }, [sheetConfig, registerOverlay, unregisterOverlay, closeSheet])

  return (
    <SheetManagerContext.Provider value={{ openSheet, closeSheet }}>
      {children}
    </SheetManagerContext.Provider>
  )
}

export function useSheetManager() {
  const context = useContext(SheetManagerContext)
  if (!context) {
    throw new Error('useSheetManager must be used within SheetManagerProvider')
  }
  return context
}
