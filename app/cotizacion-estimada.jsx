import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function CotizacionEstimadaScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()

  const distanciaEstimada = "12 km"
  const costoTotal = "$150,000"
  const proveedorNombre = "Mudanzas Rápidas"
  const proveedorVerificado = true

  const handleAceptarServicio = () => {
    router.push("/perfil-proveedor")
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E56A0" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cotización Estimada</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Perfil del Proveedor */}
        <View style={styles.providerCard}>
          <View style={styles.providerHeader}>
            <Image source={{ uri: "https://i.pravatar.cc/150?img=33" }} style={styles.providerImage} />
            <View style={styles.providerInfo}>
              <View style={styles.providerNameContainer}>
                <Text style={styles.providerName}>{proveedorNombre}</Text>
                {proveedorVerificado && (
                  <Ionicons name="checkmark-circle" size={20} color="#28A745" style={styles.verifiedIcon} />
                )}
              </View>
              <Text style={styles.providerRole}>Innovaten Verificado</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={14} color="#28A745" />
                <Text style={styles.verifiedText}>Proveedor Verificado</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Información del Servicio */}
        <View style={styles.serviceCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Distancia Estimada:</Text>
            <Text style={styles.infoValue}>{distanciaEstimada}</Text>
          </View>

          <View style={styles.costContainer}>
            <Text style={styles.costLabel}>Costo Total</Text>
            <Text style={styles.costValue}>{costoTotal}</Text>
          </View>

          <View style={styles.divider} />

          {/* Servicios Incluidos */}
          <View style={styles.servicesContainer}>
            <View style={styles.serviceItem}>
              <Ionicons name="checkmark-circle" size={20} color="#28A745" />
              <Text style={styles.serviceText}>Camión y Personal</Text>
            </View>
            <View style={styles.serviceItem}>
              <Ionicons name="checkmark-circle" size={20} color="#28A745" />
              <Text style={styles.serviceText}>Embalaje Básico</Text>
            </View>
          </View>
        </View>

        {/* Detalles de Dirección */}
        <View style={styles.addressCard}>
          <View style={styles.addressRow}>
            <Ionicons name="location" size={20} color="#1E56A0" />
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>Origen</Text>
              <Text style={styles.addressText}>{params.origen || "Escalera 37, Barrio Ciudadela"}</Text>
            </View>
          </View>

          <View style={styles.addressRow}>
            <Ionicons name="navigate" size={20} color="#28A745" />
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>Destino</Text>
              <Text style={styles.addressText}>{params.destino || "Carrera 11 #68, Barrio Chico"}</Text>
            </View>
          </View>

          <View style={styles.addressRow}>
            <Ionicons name="calendar" size={20} color="#666" />
            <View style={styles.addressInfo}>
              <Text style={styles.addressLabel}>Fecha y Hora</Text>
              <Text style={styles.addressText}>
                {params.fecha || "20 abril 2022"} • {params.hora || "10:00 AM"}
              </Text>
            </View>
          </View>
        </View>

        {/* Botones de Acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.acceptButton} onPress={handleAceptarServicio}>
            <Text style={styles.acceptButtonText}>Aceptar Servicio</Text>
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
  providerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  providerHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  providerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  providerInfo: {
    flex: 1,
  },
  providerNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  providerName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  providerRole: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  verifiedText: {
    fontSize: 12,
    color: "#28A745",
    fontWeight: "600",
    marginLeft: 4,
  },
  serviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: "#666",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  costContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  costLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  costValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E56A0",
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 16,
  },
  servicesContainer: {
    gap: 12,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  serviceText: {
    fontSize: 15,
    color: "#333",
  },
  addressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  addressInfo: {
    flex: 1,
    marginLeft: 12,
  },
  addressLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    fontWeight: "600",
  },
  addressText: {
    fontSize: 15,
    color: "#333",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  acceptButton: {
    flex: 1,
    backgroundColor: "#1E56A0",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  acceptButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})
