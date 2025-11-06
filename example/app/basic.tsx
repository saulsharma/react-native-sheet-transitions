import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useSheetManager } from '../components/SheetManager'

export default function BasicExample() {
  const { openSheet, closeSheet } = useSheetManager()

  const handleOpenSheet = () => {
    openSheet({
      scaleFactor: 0.9,
      opacityOnGestureMove: false,
      content: (
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Welcome! 👋</Text>
          <Text style={styles.sheetText}>
            This is a basic bottom sheet. Drag down to dismiss it.
          </Text>
          <Text style={styles.sheetText}>
            Notice how the background scaled down while the sheet stays full size!
          </Text>
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={closeSheet}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      ),
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Basic Bottom Sheet</Text>
        <Text style={styles.description}>
          Simplest configuration with default physics and scaling behavior.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={handleOpenSheet}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Open Sheet</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#6366F1',
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
    marginBottom: 16,
  },
  sheetText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  closeButton: {
    marginTop: 24,
  },
})
