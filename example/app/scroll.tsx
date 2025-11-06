import { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SheetScreen } from 'react-native-sheet-transitions'

export default function ScrollExample() {
  const [sheetVisible, setSheetVisible] = useState(false)

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.heading}>Scrollable Content</Text>
        <Text style={styles.description}>
          Demonstrates gesture composition: drag to dismiss when scrolled to top, otherwise scroll normally.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSheetVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Open Scrollable Sheet</Text>
        </TouchableOpacity>
      </View>

      {sheetVisible && (
        <SheetScreen
          onClose={() => setSheetVisible(false)}
          scaleFactor={0.85}
          isScrollable={true}
        >
          <View style={styles.sheet}>
            <View style={styles.handle} />
            <Text style={styles.sheetTitle}>Scrollable Content 📜</Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>💡 Try this:</Text>
              <Text style={styles.infoText}>• When at top → Drag down to dismiss</Text>
              <Text style={styles.infoText}>• While scrolling → Scroll works normally</Text>
              <Text style={styles.infoText}>• Gestures compose seamlessly</Text>
            </View>

            {Array.from({ length: 30 }).map((_, index) => (
              <View key={index} style={styles.item}>
                <View style={styles.itemNumber}>
                  <Text style={styles.itemNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>Item {index + 1}</Text>
                  <Text style={styles.itemDescription}>
                    {index === 0
                      ? "You're at the top! Try dragging down to dismiss."
                      : "Keep scrolling to explore more content..."}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.footer}>
              <Text style={styles.footerText}>🎉 You've reached the end!</Text>
              <TouchableOpacity
                style={[styles.button, { marginTop: 16 }]}
                onPress={() => setSheetVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: '#EC4899',
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 24,
    alignSelf: 'center',
  },
  sheetTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#0EA5E9',
  },
  infoText: {
    fontSize: 14,
    color: '#0C4A6E',
    marginBottom: 4,
    lineHeight: 20,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  itemNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EC4899',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemNumberText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
  },
  footerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
})
