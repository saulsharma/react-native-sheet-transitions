import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SheetScreen } from 'react-native-sheet-transitions'

export default function NestedExample() {
  const [firstSheetVisible, setFirstSheetVisible] = useState(false)
  const [secondSheetVisible, setSecondSheetVisible] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Nested Sheets</Text>
        <Text style={styles.description}>
          Progressive scaling: each sheet scales the previous one independently.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setFirstSheetVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Open First Sheet</Text>
        </TouchableOpacity>
      </View>

      {firstSheetVisible && (
        <SheetScreen onClose={() => setFirstSheetVisible(false)} scaleFactor={0.9}>
          <View style={[styles.sheet, styles.firstSheet]}>
            <View style={styles.handle} />
            <View style={styles.sheetHeader}>
              <View style={styles.levelBadge}>
                <Text style={styles.levelBadgeText}>LEVEL 1</Text>
              </View>
            </View>

            <Text style={styles.sheetTitle}>First Sheet 📄</Text>
            <Text style={styles.sheetText}>
              This is the first sheet. Notice how the background scaled down.
            </Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>💡 Try This:</Text>
              <Text style={styles.infoText}>
                Open the second sheet to see progressive scaling in action!
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.openNestedButton]}
              onPress={() => setSecondSheetVisible(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Open Second Sheet</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.textButton}
              onPress={() => setFirstSheetVisible(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.textButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </SheetScreen>
      )}

      {secondSheetVisible && (
        <SheetScreen onClose={() => setSecondSheetVisible(false)} scaleFactor={0.85}>
          <View style={[styles.sheet, styles.secondSheet]}>
            <View style={styles.handle} />
            <View style={styles.sheetHeader}>
              <View style={[styles.levelBadge, styles.level2Badge]}>
                <Text style={styles.levelBadgeText}>LEVEL 2</Text>
              </View>
            </View>

            <Text style={styles.sheetTitle}>Second Sheet 📋</Text>
            <Text style={styles.sheetText}>
              Now you can see both sheets! The first sheet is scaled independently from the
              background.
            </Text>

            <View style={[styles.infoBox, styles.level2InfoBox]}>
              <Text style={styles.infoTitle}>✨ Progressive Scaling:</Text>
              <Text style={styles.infoText}>
                • Background: 90% scale
              </Text>
              <Text style={styles.infoText}>
                • First sheet: 85% scale
              </Text>
              <Text style={styles.infoText}>
                • Each sheet maintains its own scale state
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.button, styles.closeNestedButton]}
              onPress={() => setSecondSheetVisible(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Close This Sheet</Text>
            </TouchableOpacity>

            <Text style={styles.helperText}>
              Try dragging this sheet down to see the spring physics!
            </Text>
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
    padding: 24,
    alignItems: 'center',
  },
  firstSheet: {
    backgroundColor: '#DBEAFE',
  },
  secondSheet: {
    backgroundColor: '#FEF3C7',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
    marginBottom: 16,
  },
  sheetHeader: {
    marginBottom: 16,
  },
  levelBadge: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  level2Badge: {
    backgroundColor: '#F59E0B',
  },
  levelBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sheetTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
    textAlign: 'center',
  },
  sheetText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    paddingHorizontal: 12,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  level2InfoBox: {
    borderColor: '#F59E0B',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
    lineHeight: 20,
  },
  openNestedButton: {
    backgroundColor: '#2563EB',
    marginBottom: 16,
  },
  closeNestedButton: {
    backgroundColor: '#F59E0B',
    marginBottom: 16,
  },
  textButton: {
    paddingVertical: 12,
  },
  textButtonText: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
  },
  helperText: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
})
