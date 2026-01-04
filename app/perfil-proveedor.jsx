import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image, Modal } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function PerfilProveedorScreen() {
  const router = useRouter()
  const [modalPagoVisible, setModalPagoVisible] = useState(false)

  const distanciaEstimada = "12 km"
  const servicioBase = "$120,000"
  const seguroCarga = "$30,000"
  const totalCarrono = "$150,000"

  const handlePagar = () => {
    setModalPagoVisible(true)
  }

  const confirmarPago = () => {
    setModalPagoVisible(false)
    router.push("/panel-pago")
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E56A0" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Perfil del Proveedor</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Perfil del Proveedor */}
        <View style={styles.providerCard}>
          <View style={styles.providerHeader}>
            <Image source={{ uri: "https://i.pravatar.cc/150?img=33" }} style={styles.providerImage} />
            <View style={styles.providerInfo}>
              <View style={styles.providerNameContainer}>
                <Text style={styles.providerName}>Mudanzas Rápidas</Text>
                <Ionicons name="checkmark-circle" size={20} color="#28A745" style={styles.verifiedIcon} />
              </View>
              <Text style={styles.providerRole}>Innovaten Verificado</Text>
              <View style={styles.verifiedBadge}>
                <Ionicons name="shield-checkmark" size={14} color="#28A745" />
                <Text style={styles.verifiedText}>Proveedor Verificado</Text>
              </View>
            </View>
          </View>

          {/* Estadísticas del Proveedor */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={20} color="#FFC107" />
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="checkmark-done" size={20} color="#28A745" />
              <Text style={styles.statValue}>125+</Text>
              <Text style={styles.statLabel}>Servicios</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="time" size={20} color="#1E56A0" />
              <Text style={styles.statValue}>3 años</Text>
              <Text style={styles.statLabel}>Experiencia</Text>
            </View>
          </View>
        </View>

        {/* Detalles del Servicio */}
        <View style={styles.serviceCard}>
          <Text style={styles.cardTitle}>Detalles del Servicio</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Distancia estimada</Text>
            <Text style={styles.infoValue}>{distanciaEstimada}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Servicio base</Text>
            <Text style={styles.costValue}>{servicioBase}</Text>
          </View>

          <View style={styles.costRow}>
            <Text style={styles.costLabel}>Seguro de carga</Text>
            <Text style={styles.costValue}>{seguroCarga}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Totale de carrono</Text>
            <Text style={styles.totalValue}>{totalCarrono}</Text>
          </View>
        </View>

        {/* Método de Pago */}
        <View style={styles.paymentCard}>
          <Text style={styles.cardTitle}>Método de Pago</Text>

          <View style={styles.paymentMethod}>
            <View style={styles.cardLogos}>
              <View style={styles.cardLogo}>
                <Ionicons name="card" size={24} color="#1E56A0" />
              </View>
              <View style={styles.cardLogo}>
                <Text style={styles.cardLogoText}>MC</Text>
              </View>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardType}>Basal</Text>
              <Text style={styles.cardNumber}>7542</Text>
            </View>
          </View>

          <View style={styles.cvcContainer}>
            <Text style={styles.cvcLabel}>CVC</Text>
            <View style={styles.cvcInput}>
              <Text style={styles.cvcDots}>••••</Text>
              <Text style={styles.cvcNumber}>7542</Text>
            </View>
            <View style={styles.cvcExpiry}>
              <Text style={styles.expiryLabel}>180</Text>
              <Text style={styles.expiryValue}>133</Text>
            </View>
          </View>
        </View>

        {/* Botón de Pago */}
        <TouchableOpacity style={styles.payButton} onPress={handlePagar}>
          <Text style={styles.payButtonText}>Pagar $150,000</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal de Confirmación */}
      <Modal visible={modalPagoVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIcon}>
              <Ionicons name="card" size={48} color="#1E56A0" />
            </View>
            <Text style={styles.modalTitle}>Confirmar Pago</Text>
            <Text style={styles.modalMessage}>¿Deseas proceder con el pago de $150,000?</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={() => setModalPagoVisible(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmButton} onPress={confirmarPago}>
                <Text style={styles.modalConfirmText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
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
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E0E0E0",
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
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
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
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 12,
  },
  costRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  costLabel: {
    fontSize: 14,
    color: "#666",
  },
  costValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E56A0",
  },
  paymentCard: {
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
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardLogos: {
    flexDirection: "row",
    gap: 8,
    marginRight: 16,
  },
  cardLogo: {
    width: 40,
    height: 28,
    backgroundColor: "#F5F5F5",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cardLogoText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FF5722",
  },
  cardInfo: {
    flex: 1,
  },
  cardType: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  cvcContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cvcLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  cvcInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 8,
  },
  cvcDots: {
    fontSize: 16,
    color: "#666",
  },
  cvcNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  cvcExpiry: {
    flexDirection: "row",
    gap: 8,
  },
  expiryLabel: {
    fontSize: 14,
    color: "#666",
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  expiryValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },
  payButton: {
    backgroundColor: "#1E56A0",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  modalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  modalCancelText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: "#1E56A0",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  modalConfirmText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})
