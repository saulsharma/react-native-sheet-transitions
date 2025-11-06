import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SheetScreen } from 'react-native-sheet-transitions'

export default function DirectionsExample() {
  const [sheetVisible, setSheetVisible] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Drag Directions</Text>
        <Text style={styles.description}>
          Swipe down, left, or right to dismiss the sheet.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSheetVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Open Sheet</Text>
        </TouchableOpacity>
      </View>

      {sheetVisible && (
        <SheetScreen
          onClose={() => setSheetVisible(false)}
          scaleFactor={0.88}
          dragDirections={{
            toTop: false,
            toBottom: true,
            toLeft: true,
            toRight: true,
          }}
        >
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>Multi-Directional Gestures 🎯</Text>

            <View style={styles.directionsContainer}>
              <View style={styles.directionCard}>
                <Text style={styles.directionIcon}>⬇️</Text>
                <Text style={styles.directionLabel}>Swipe Down</Text>
                <Text style={styles.directionStatus}>✓ Enabled</Text>
              </View>

              <View style={styles.directionCard}>
                <Text style={styles.directionIcon}>⬅️</Text>
                <Text style={styles.directionLabel}>Swipe Left</Text>
                <Text style={styles.directionStatus}>✓ Enabled</Text>
              </View>

              <View style={styles.directionCard}>
                <Text style={styles.directionIcon}>➡️</Text>
                <Text style={styles.directionLabel}>Swipe Right</Text>
                <Text style={styles.directionStatus}>✓ Enabled</Text>
              </View>

              <View style={[styles.directionCard, styles.disabledCard]}>
                <Text style={styles.directionIcon}>⬆️</Text>
                <Text style={styles.directionLabel}>Swipe Up</Text>
                <Text style={styles.directionStatusDisabled}>✗ Disabled</Text>
              </View>
            </View>

            <Text style={styles.infoText}>
              Try swiping in any enabled direction to dismiss the sheet!
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSheetVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButtonText}>Close</Text>
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
    backgroundColor: '#10B981',
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
  sheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 24,
    textAlign: 'center',
  },
  directionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  directionCard: {
    width: '48%',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  disabledCard: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  directionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  directionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  directionStatus: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  directionStatusDisabled: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  infoText: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  closeButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})
