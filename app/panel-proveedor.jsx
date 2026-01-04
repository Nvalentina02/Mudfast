import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function PanelProveedorScreen() {
  const router = useRouter()
  const [tabActiva, setTabActiva] = useState("nuevas")

  const serviciosNuevos = [
    {
      id: "1",
      tipo: "nueva",
      origen: "Calle 25 #47",
      destino: "Carrera 9 #80",
      fecha: "Destino Carrera: 19:220",
      hora: "",
      costo: "",
      estado: "Toollisa #12B",
      icono: "location",
    },
    {
      id: "2",
      tipo: "nueva",
      origen: "Calle 120",
      destino: "Dateraioe 5Z4M",
      fecha: "Dateraioe 24 #838",
      hora: "",
      costo: "",
      estado: "Marnes, die 12 4t0",
      icono: "calendar",
    },
  ]

  const serviciosActivos = [
    {
      id: "3",
      tipo: "activa",
      origen: "Calle 12 #45",
      destino: "Carrera 9 #80",
      fecha: "Carriere Hkexia0",
      hora: "Carriss 9-5-00zs",
      costo: "$150,000",
      estado: "Tooolisa #12B Todoliss 9 P 666",
      icono: "navigate",
    },
  ]

  const serviciosMostrar = tabActiva === "nuevas" ? serviciosNuevos : serviciosActivos

  const handleFinalizarServicio = (servicioId) => {
    router.push({
      pathname: "/finalizar-servicio",
      params: { servicioId },
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
        <Text style={styles.headerTitle}>Panel del Proveedor</Text>
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
          style={[styles.tab, tabActiva === "activas" && styles.tabActive]}
          onPress={() => setTabActiva("activas")}
        >
          <Text style={[styles.tabText, tabActiva === "activas" && styles.tabTextActive]}>
            Servicios Activos
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {serviciosMostrar.map((servicio) => (
          <View key={servicio.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={18} color="#1E56A0" />
                <View style={styles.locationInfo}>
                  <Text style={styles.locationLabel}>Origen: {servicio.origen}</Text>
                  <Text style={styles.locationSubtext}>{servicio.fecha}</Text>
                </View>
              </View>

              {servicio.tipo === "activa" && (
                <View style={styles.statusBadge}>
                  <View style={[styles.statusDot, styles.statusDotActive]} />
                  <Text style={styles.statusText}>En curso</Text>
                </View>
              )}
            </View>

            <View style={styles.locationRow}>
              <Ionicons name="navigate" size={18} color="#28A745" />
              <View style={styles.locationInfo}>
                <Text style={styles.locationLabel}>Destino: {servicio.destino}</Text>
                {servicio.hora ? <Text style={styles.locationSubtext}>{servicio.hora}</Text> : null}
              </View>
            </View>

            {servicio.estado ? (
              <View style={styles.serviceDetail}>
                <Ionicons name={servicio.icono} size={18} color="#666" />
                <Text style={styles.serviceDetailText}>{servicio.estado}</Text>
              </View>
            ) : null}

            {servicio.costo ? (
              <View style={styles.costContainer}>
                <Text style={styles.costLabel}>Costo:</Text>
                <Text style={styles.costValue}>{servicio.costo}</Text>
              </View>
            ) : null}

            <View style={styles.actionButtons}>
              {servicio.tipo === "nueva" ? (
                <>
                  <TouchableOpacity style={styles.rejectButton}>
                    <Text style={styles.rejectButtonText}>Rechazar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.acceptButton}>
                    <Text style={styles.acceptButtonText}>Aceptar</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.finishButton}
                  onPress={() => handleFinalizarServicio(servicio.id)}
                >
                  <Text style={styles.finishButtonText}>Finalizar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        {serviciosMostrar.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="folder-open-outline" size={64} color="#CCC" />
            <Text style={styles.emptyText}>
              No hay servicios {tabActiva === "nuevas" ? "nuevos" : "activos"}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  header: {
    backgroundColor: "#1E56A0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: { marginRight: 16 },
  headerTitle: { fontSize: 20, fontWeight: "600", color: "#FFFFFF" },
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
  tabActive: { borderBottomColor: "#1E56A0" },
  tabText: { fontSize: 14, fontWeight: "600", color: "#666" },
  tabTextActive: { color: "#1E56A0" },
  content: { flex: 1 },
  contentContainer: { padding: 20 },
  serviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  locationRow: { flexDirection: "row", marginBottom: 12 },
  locationInfo: { marginLeft: 10, flex: 1 },
  locationLabel: { fontSize: 14, fontWeight: "600", color: "#333" },
  locationSubtext: { fontSize: 12, color: "#666" },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusDotActive: { backgroundColor: "#28A745" },
  statusText: { fontSize: 12, fontWeight: "600", color: "#28A745" },
  serviceDetail: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  serviceDetailText: { fontSize: 13, color: "#666", marginLeft: 10 },
  costContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 12,
  },
  costLabel: { fontSize: 14, fontWeight: "600" },
  costValue: { fontSize: 18, fontWeight: "700", color: "#1E56A0" },
  actionButtons: { flexDirection: "row", gap: 10 },
  rejectButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  rejectButtonText: { color: "#666", fontWeight: "600" },
  acceptButton: {
    flex: 1,
    backgroundColor: "#28A745",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  acceptButtonText: { color: "#FFFFFF", fontWeight: "600" },
  finishButton: {
    flex: 1,
    backgroundColor: "#1E56A0",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  finishButtonText: { color: "#FFFFFF", fontWeight: "600" },
  emptyState: { alignItems: "center", paddingVertical: 60 },
  emptyText: { fontSize: 16, color: "#999", marginTop: 16 },
})
