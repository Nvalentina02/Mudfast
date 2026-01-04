import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function CentroAyudaProveedorScreen() {
  const router = useRouter()
  const [tabActiva, setTabActiva] = useState("nuevas")

  const solicitudesNuevas = [
    {
      id: "1",
      origen: "Origen: Calle 12 #45",
      destino: "Destino: Carrera 9 #80",
      fecha: "Carriere Mkexid",
      hora: "Carriso 9-5-0ixis",
      costo: "$150,000",
      estado: "nueva",
    },
    {
      id: "2",
      origen: "Origen: Calle 12 #45 Carrera 33 #865",
      destino: "Destino: Carrera 9 #80",
      fecha: "Dizango, dio 30 Plas",
      hora: "",
      costo: "$150,000",
      estado: "nueva",
    },
    {
      id: "3",
      origen: "Origen: Escalera #12B",
      destino: "Destino: Calle 226",
      fecha: "Narnses, div 15 AM",
      hora: "10:00 AM",
      costo: "$90,000",
      estado: "completada",
    },
  ]

  const solicitudesMostrar =
    tabActiva === "nuevas"
      ? solicitudesNuevas.filter((s) => s.estado === "nueva")
      : solicitudesNuevas

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E56A0" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Centro de Ayuda</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, tabActiva === "nuevas" && styles.tabActive]}
          onPress={() => setTabActiva("nuevas")}
        >
          <Text style={[styles.tabText, tabActiva === "nuevas" && styles.tabTextActive]}>
            Solicitudes Nuevas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, tabActiva === "todas" && styles.tabActive]}
          onPress={() => setTabActiva("todas")}
        >
          <Text style={[styles.tabText, tabActiva === "todas" && styles.tabTextActive]}>
            Todas
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {solicitudesMostrar.map((solicitud) => (
          <View key={solicitud.id} style={styles.solicitudCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location" size={18} color="#1E56A0" />
              <View style={styles.infoContent}>
                <Text style={styles.infoText}>{solicitud.origen}</Text>
                {solicitud.fecha ? (
                  <Text style={styles.infoSubtext}>{solicitud.fecha}</Text>
                ) : null}
              </View>
            </View>

            <View style={styles.infoRow}>
              <Ionicons name="navigate" size={18} color="#28A745" />
              <View style={styles.infoContent}>
                <Text style={styles.infoText}>{solicitud.destino}</Text>
                {solicitud.hora ? (
                  <Text style={styles.infoSubtext}>{solicitud.hora}</Text>
                ) : null}
              </View>
            </View>

            {solicitud.estado === "nueva" && (
              <View style={styles.infoRow}>
                <Ionicons name="pricetag" size={18} color="#FFC107" />
                <View style={styles.infoContent}>
                  <Text style={styles.costoText}>Costo: {solicitud.costo}</Text>
                </View>
              </View>
            )}

            {solicitud.estado === "completada" && (
              <View style={styles.estadoBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#28A745" />
                <Text style={styles.estadoText}>Completado</Text>
              </View>
            )}
          </View>
        ))}
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
  tabsContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: "#1E56A0",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  tabTextActive: {
    color: "#1E56A0",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  solicitudCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  infoContent: {
    flex: 1,
    marginLeft: 10,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  infoSubtext: {
    fontSize: 12,
    color: "#666",
  },
  costoText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E56A0",
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
})
