import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SheetScreen } from 'react-native-sheet-transitions'

export default function ModalExample() {
  const [sheetVisible, setSheetVisible] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Modal Sheet</Text>
        <Text style={styles.description}>
          Custom spring configuration with opacity effects for a modal feel.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSheetVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Open Modal</Text>
        </TouchableOpacity>
      </View>

      {sheetVisible && (
        <SheetScreen
          onClose={() => setSheetVisible(false)}
          scaleFactor={0.92}
          springConfig={{
            damping: 20,
            stiffness: 90,
            mass: 0.8,
          }}
          opacityOnGestureMove={true}
        >
          <View style={styles.sheet}>
            <View style={styles.handle} />

            <View style={styles.iconContainer}>
              <Text style={styles.icon}>🎨</Text>
            </View>

            <Text style={styles.sheetTitle}>Custom Physics</Text>
            <Text style={styles.sheetText}>
              This modal uses custom spring configuration for a slower, more deliberate animation.
            </Text>

            <View style={styles.physicsInfo}>
              <View style={styles.physicsRow}>
                <Text style={styles.physicsLabel}>Damping:</Text>
                <Text style={styles.physicsValue}>20</Text>
              </View>
              <View style={styles.physicsRow}>
                <Text style={styles.physicsLabel}>Stiffness:</Text>
                <Text style={styles.physicsValue}>90</Text>
              </View>
              <View style={styles.physicsRow}>
                <Text style={styles.physicsLabel}>Mass:</Text>
                <Text style={styles.physicsValue}>0.8</Text>
              </View>
            </View>

            <Text style={styles.sheetText}>
              Notice how the drag gesture feels heavier and the background fades as you drag.
            </Text>

            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={() => setSheetVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </SheetScreen>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#A0A0A0',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#F3E8FF',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  icon: {
    fontSize: 40,
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  sheetText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
    paddingHorizontal: 12,
  },
  physicsInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 20,
  },
  physicsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  physicsLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  physicsValue: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '700',
  },
  closeButton: {
    marginTop: 12,
  },
})
