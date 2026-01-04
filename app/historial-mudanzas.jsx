import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function HistorialMudanzasScreen() {
  const router = useRouter()

  const mudanzas = [
    {
      id: "1",
      origen: "Calle 12 #45 - Carrera 33 #865",
      destino: "Escalera #12B - Calle 226",
      fecha: "Domingo, día 30",
      costo: "$150,000",
      estado: "completado",
    },
    {
      id: "2",
      origen: "Escalera #12B - Calle 226",
      destino: "Avenida 19 #55 - Carretera 11 #858",
      fecha: "Martes, día 15",
      costo: "$90,000",
      estado: "completado",
    },
    {
      id: "3",
      origen: "Avenida 19 #55 - Carretera 11 #858",
      destino: "Carrera 9 #80",
      fecha: "Miércoles, día 23",
      costo: "$150,000",
      estado: "completado",
    },
  ]

  const handleVerDetalle = (mudanzaId) => {
    router.push({
      pathname: "/detalle-mudanza",
      params: { mudanzaId },
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E56A0" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Historial de Mudanzas</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {mudanzas.map((mudanza) => (
          <TouchableOpacity
            key={mudanza.id}
            style={styles.mudanzaCard}
            onPress={() => handleVerDetalle(mudanza.id)}
            activeOpacity={0.7}
          >
            <View style={styles.mudanzaHeader}>
              <View style={styles.iconContainer}>
                <Ionicons name="cube" size={24} color="#1E56A0" />
              </View>

              <View style={styles.mudanzaInfo}>
                <View style={styles.addressRow}>
                  <Ionicons name="location" size={16} color="#1E56A0" />
                  <Text style={styles.addressText} numberOfLines={1}>
                    {mudanza.origen}
                  </Text>
                </View>

                <View style={styles.addressRow}>
                  <Ionicons name="navigate" size={16} color="#28A745" />
                  <Text style={styles.addressText} numberOfLines={1}>
                    {mudanza.destino}
                  </Text>
                </View>
              </View>

              <View style={styles.costoContainer}>
                <Text style={styles.costoValue}>{mudanza.costo}</Text>
              </View>
            </View>

            <View style={styles.mudanzaFooter}>
              <View style={styles.fechaContainer}>
                <Ionicons name="calendar" size={14} color="#666" />
                <Text style={styles.fechaText}>{mudanza.fecha}</Text>
              </View>

              <View style={[styles.estadoBadge, styles.estadoBadgeCompletado]}>
                <Ionicons name="checkmark-circle" size={14} color="#28A745" />
                <Text style={styles.estadoText}>Completado</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.terminosButton}>
          <Ionicons name="document-text" size={20} color="#1E56A0" />
          <Text style={styles.terminosButtonText}>
            Consultar términos y condiciones
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#1E56A0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  mudanzaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  mudanzaHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    backgroundColor: "#E3F2FD",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  mudanzaInfo: {
    flex: 1,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  addressText: {
    fontSize: 13,
    color: "#333",
    marginLeft: 6,
    flex: 1,
  },
  costoContainer: {
    alignItems: "flex-end",
  },
  costoValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E56A0",
  },
  mudanzaFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  fechaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  fechaText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 6,
  },
  estadoBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#E8F5E9",
  },
  estadoBadgeCompletado: {},
  estadoText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#28A745",
    marginLeft: 4,
  },
  terminosButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  terminosButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E56A0",
    marginLeft: 8,
  },
})
