import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SheetProvider, SheetScreen } from 'react-native-sheet-transitions'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

type Demo = {
  id: string
  title: string
  description: string
}

const demos: Demo[] = [
  {
    id: 'basic',
    title: 'Basic Bottom Sheet',
    description: 'Simple bottom sheet with default configuration',
  },
  {
    id: 'modal',
    title: 'Modal Sheet',
    description: 'Full screen modal with custom spring animations',
  },
  {
    id: 'directions',
    title: 'Drag Directions',
    description: 'Sheet with multiple drag directions enabled',
  },
  {
    id: 'nested',
    title: 'Nested Sheets',
    description: 'Demo showing sheets opening from within sheets',
  },
]

export default function App() {
  const [activeDemo, setActiveDemo] = useState<string | null>(null)
  const [nestedSheet, setNestedSheet] = useState(false)

  const renderDemo = () => {
    switch (activeDemo) {
      case 'basic':
        return <BasicSheetDemo onClose={() => setActiveDemo(null)} />
      case 'modal':
        return <ModalSheetDemo onClose={() => setActiveDemo(null)} />
      case 'directions':
        return <DirectionsDemo onClose={() => setActiveDemo(null)} />
      case 'nested':
        return (
          <NestedSheetsDemo
            onClose={() => setActiveDemo(null)}
            nestedSheet={nestedSheet}
            setNestedSheet={setNestedSheet}
          />
        )
      default:
        return null
    }
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SheetProvider resizeType="decremental">
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <Text style={styles.title}>Sheet Transitions Demo</Text>
          <Text style={styles.subtitle}>React Native Sheet Transitions Library Examples</Text>

          <ScrollView style={styles.demoList} contentContainerStyle={styles.demoListContent}>
            {demos.map(demo => (
              <TouchableOpacity
                key={demo.id}
                style={styles.demoCard}
                onPress={() => setActiveDemo(demo.id)}
              >
                <Text style={styles.demoTitle}>{demo.title}</Text>
                <Text style={styles.demoDescription}>{demo.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>

        {activeDemo && renderDemo()}
      </SheetProvider>
    </GestureHandlerRootView>
  )
}

// Basic Sheet Demo
function BasicSheetDemo({ onClose }: { onClose: () => void }) {
  return (
    <SheetScreen onClose={onClose} scaleFactor={0.9} dragThreshold={150}>
      <View style={styles.sheetContent}>
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>Basic Bottom Sheet</Text>
        <Text style={styles.sheetText}>
          This is a basic bottom sheet with default configuration. Drag down to dismiss.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Features:</Text>
          <Text style={styles.infoText}>• Drag to dismiss</Text>
          <Text style={styles.infoText}>• Background scaling effect</Text>
          <Text style={styles.infoText}>• Smooth spring animations</Text>
          <Text style={styles.infoText}>• Threshold-based dismissal</Text>
        </View>

        <View style={styles.spacer} />
      </View>
    </SheetScreen>
  )
}

// Modal Sheet Demo
function ModalSheetDemo({ onClose }: { onClose: () => void }) {
  return (
    <SheetScreen
      onClose={onClose}
      scaleFactor={0.85}
      dragThreshold={100}
      springConfig={{
        damping: 20,
        stiffness: 90,
        mass: 0.8,
      }}
      opacityOnGestureMove={true}
      initialBorderRadius={30}
    >
      <View style={[styles.sheetContent, styles.modalContent]}>
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>Modal Sheet</Text>
        <Text style={styles.sheetText}>
          This modal uses custom spring configuration for different animation feel.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Custom Configuration:</Text>
          <Text style={styles.infoText}>• Damping: 20</Text>
          <Text style={styles.infoText}>• Stiffness: 90</Text>
          <Text style={styles.infoText}>• Mass: 0.8</Text>
          <Text style={styles.infoText}>• Opacity animation enabled</Text>
          <Text style={styles.infoText}>• Border radius: 30</Text>
        </View>

        <View style={styles.spacer} />
      </View>
    </SheetScreen>
  )
}

// Directions Demo
function DirectionsDemo({ onClose }: { onClose: () => void }) {
  return (
    <SheetScreen
      onClose={onClose}
      dragDirections={{
        toTop: false,
        toBottom: true,
        toLeft: true,
        toRight: true,
      }}
      dragThreshold={120}
    >
      <View style={styles.sheetContent}>
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>Multi-Direction Drag</Text>
        <Text style={styles.sheetText}>
          This sheet can be dragged in multiple directions to dismiss.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Enabled Directions:</Text>
          <Text style={styles.infoText}>• ⬇️ Drag down to dismiss</Text>
          <Text style={styles.infoText}>• ⬅️ Drag left to dismiss</Text>
          <Text style={styles.infoText}>• ➡️ Drag right to dismiss</Text>
        </View>

        <Text style={[styles.sheetText, { marginTop: 20 }]}>
          Try dragging in different directions!
        </Text>

        <View style={styles.spacer} />
      </View>
    </SheetScreen>
  )
}

// Nested Sheets Demo
function NestedSheetsDemo({
  onClose,
  nestedSheet,
  setNestedSheet,
}: {
  onClose: () => void
  nestedSheet: boolean
  setNestedSheet: (value: boolean) => void
}) {
  return (
    <>
      <SheetScreen onClose={onClose} scaleFactor={0.88}>
        <View style={styles.sheetContent}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Nested Sheets</Text>
          <Text style={styles.sheetText}>
            You can open sheets from within sheets for complex flows.
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => setNestedSheet(true)}>
            <Text style={styles.buttonText}>Open Nested Sheet</Text>
          </TouchableOpacity>

          <View style={styles.spacer} />
        </View>
      </SheetScreen>

      {nestedSheet && (
        <SheetScreen onClose={() => setNestedSheet(false)} scaleFactor={0.78}>
          <View style={styles.sheetContent}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>Nested Sheet</Text>
            <Text style={styles.sheetText}>This is a sheet opened from within another sheet!</Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>Note:</Text>
              <Text style={styles.infoText}>
                The background continues to scale with each level of nesting, creating a natural
                depth effect.
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => setNestedSheet(false)}>
              <Text style={styles.buttonText}>Close This Sheet</Text>
            </TouchableOpacity>

            <View style={styles.spacer} />
          </View>
        </SheetScreen>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  demoList: {
    flex: 1,
  },
  demoListContent: {
    padding: 16,
  },
  demoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  demoDescription: {
    fontSize: 14,
    color: '#666',
  },
  sheetContent: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  modalContent: {
    backgroundColor: '#f9f9f9',
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ddd',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  sheetText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  infoBox: {
    backgroundColor: '#e8f4f8',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0066cc',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#0066cc',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 100,
  },
})
