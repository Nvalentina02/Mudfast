import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function HistorialProveedorScreen() {
  const router = useRouter()

  const servicios = [
    {
      id: "1",
      origen: "Calle 12 #45 - Carrera 33 #865",
      destino: "Escalera #12B - Calle 226",
      fecha: "Martes, día 19 AM",
      costo: "$150,000",
      estado: "completado",
    },
    {
      id: "2",
      origen: "Escalera #12B - Calle 226",
      destino: "Avenida 19 #55",
      fecha: "Martes, día 23",
      costo: "$90,000",
      estado: "completado",
    },
  ]

  const handleCancelarServicio = () => {
    // lógica para cancelar servicio
  }

  const handleHablaremos = () => {
    // lógica para contactar
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
        {servicios.map((servicio) => (
          <View key={servicio.id} style={styles.servicioCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={18} color="#1E56A0" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Origen</Text>
                <Text style={styles.infoText}>{servicio.origen}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="navigate" size={18} color="#28A745" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Destino</Text>
                <Text style={styles.infoText}>{servicio.destino}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={18} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Fecha</Text>
                <Text style={styles.infoText}>{servicio.fecha}</Text>
              </View>
              <Text style={styles.costoText}>{servicio.costo}</Text>
            </View>

            <View style={styles.estadoBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#28A745" />
              <Text style={styles.estadoText}>Completado</Text>
            </View>
          </View>
        ))}

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelarServicio}>
            <Text style={styles.cancelButtonText}>Cancelar servicio</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactButton} onPress={handleHablaremos}>
            <Text style={styles.contactButtonText}>Hablaremos más tarde</Text>
          </TouchableOpacity>
        </View>
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
  servicioCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  infoContent: {
    flex: 1,
    marginLeft: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
  },
  costoText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E56A0",
    marginLeft: 12,
  },
  estadoBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  estadoText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#28A745",
    marginLeft: 6,
  },
  actionButtons: {
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#666",
  },
  contactButton: {
    backgroundColor: "#1E56A0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  contactButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
})
