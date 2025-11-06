import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SheetScreen } from 'react-native-sheet-transitions'
import { BlurView } from 'expo-blur'

export default function LumaExample() {
  const [sheetVisible, setSheetVisible] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✨ PREMIUM</Text>
        </View>
        <Text style={styles.heading}>Luma Style</Text>
        <Text style={styles.description}>
          Inspired by Luma's elegant design with frosted glass blur effects.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSheetVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Open Luma Sheet</Text>
        </TouchableOpacity>
      </View>

      {sheetVisible && (
        <SheetScreen
          onClose={() => setSheetVisible(false)}
          scaleFactor={0.88}
          opacityOnGestureMove={true}
          initialBorderRadius={40}
          customBackground={
            <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
          }
        >
          <View style={styles.sheet}>
            <BlurView intensity={100} tint="light" style={styles.blurContainer}>
              <View style={styles.handle} />

              <View style={styles.header}>
                <Text style={styles.sheetTitle}>Create Event</Text>
                <Text style={styles.sheetSubtitle}>Set up your next gathering</Text>
              </View>

              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Event Name</Text>
                  <View style={styles.input}>
                    <Text style={styles.inputPlaceholder}>Coffee & Code</Text>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Date & Time</Text>
                  <View style={styles.input}>
                    <Text style={styles.inputPlaceholder}>Tomorrow at 3:00 PM</Text>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Location</Text>
                  <View style={styles.input}>
                    <Text style={styles.inputPlaceholder}>Local Coffee Shop</Text>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Description</Text>
                  <View style={[styles.input, styles.textArea]}>
                    <Text style={styles.inputPlaceholder}>
                      A casual meetup for developers to share ideas and collaborate
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.secondaryButton]}
                  onPress={() => setSheetVisible(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.secondaryButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.primaryButton]}
                  onPress={() => setSheetVisible(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>Create Event</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
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
  badge: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.5)',
  },
  badgeText: {
    color: '#FCD34D',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
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
    backgroundColor: '#F59E0B',
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
  },
  blurContainer: {
    flex: 1,
    padding: 24,
    overflow: 'hidden',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
    marginBottom: 24,
    alignSelf: 'center',
  },
  header: {
    marginBottom: 32,
  },
  sheetTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 4,
  },
  sheetSubtitle: {
    fontSize: 15,
    color: '#666666',
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  textArea: {
    minHeight: 80,
  },
  inputPlaceholder: {
    fontSize: 15,
    color: '#666666',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  primaryButton: {
    backgroundColor: '#000000',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
})
