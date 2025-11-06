import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function Index() {
  const router = useRouter()

  const examples = [
    {
      id: 'basic',
      title: 'Basic Bottom Sheet',
      description: 'Simple bottom sheet with default configuration',
      color: '#6366F1',
    },
    {
      id: 'modal',
      title: 'Modal Sheet',
      description: 'Modal with custom springs and opacity effects',
      color: '#8B5CF6',
    },
    {
      id: 'scroll',
      title: 'Scrollable Content',
      description: 'Long content with scroll-to-drag gesture composition',
      color: '#EC4899',
    },
    {
      id: 'luma',
      title: 'Luma Style',
      description: 'Polished sheet with blur background effect',
      color: '#F59E0B',
    },
    {
      id: 'directions',
      title: 'Drag Directions',
      description: 'Multi-directional drag gestures',
      color: '#10B981',
    },
    {
      id: 'nested',
      title: 'Nested Sheets',
      description: 'Progressive scaling with multiple sheets',
      color: '#06B6D4',
    },
  ]

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.header}>
        <Text style={styles.title}>React Native Sheet Transitions</Text>
        <Text style={styles.subtitle}>Ultra-smooth, physics-based sheet animations</Text>
      </View>

      <View style={styles.examplesContainer}>
        {examples.map(example => (
          <TouchableOpacity
            key={example.id}
            style={[styles.exampleCard, { borderLeftColor: example.color }]}
            onPress={() => router.push(`/${example.id}`)}
            activeOpacity={0.7}
          >
            <View style={[styles.colorIndicator, { backgroundColor: example.color }]} />
            <View style={styles.cardContent}>
              <Text style={styles.exampleTitle}>{example.title}</Text>
              <Text style={styles.exampleDescription}>{example.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap any example to see it in action
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#A0A0A0',
    fontWeight: '400',
  },
  examplesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  exampleCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    marginBottom: 12,
    padding: 20,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 4,
    height: 48,
    borderRadius: 2,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  exampleDescription: {
    fontSize: 14,
    color: '#A0A0A0',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#606060',
    textAlign: 'center',
  },
})
