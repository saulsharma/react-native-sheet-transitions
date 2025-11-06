import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SheetProvider } from 'react-native-sheet-transitions'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SheetManagerProvider } from '../components/SheetManager'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* SheetProvider wraps everything to provide context */}
        <SheetProvider resizeType="decremental" enableForWeb={false}>
          <SheetManagerProvider>
            {/* Stack gets scaled when sheets open */}
            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#000',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            >
              <Stack.Screen name="index" options={{ title: 'Sheet Transitions Examples' }} />
              <Stack.Screen name="basic" options={{ title: 'Basic Bottom Sheet' }} />
              <Stack.Screen name="modal" options={{ title: 'Modal Sheet' }} />
              <Stack.Screen name="scroll" options={{ title: 'Scrollable Content' }} />
              <Stack.Screen name="luma" options={{ title: 'Luma Style' }} />
              <Stack.Screen name="directions" options={{ title: 'Drag Directions' }} />
              <Stack.Screen name="nested" options={{ title: 'Nested Sheets' }} />
            </Stack>
            {/* Sheets render here with absolute positioning and disableRootScale */}
          </SheetManagerProvider>
        </SheetProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
