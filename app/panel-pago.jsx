import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function PanelPagoScreen() {
  const router = useRouter()

  const handleFinalizarPago = () => {
    router.push("/servicio-finalizado")
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E56A0" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pago</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Logo MUDFAST */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>MUDFAST</Text>
          <Text style={styles.logoSubtext}>Plataforma de Mudanzas</Text>
        </View>

        {/* Tarjeta de Pago */}
        <View style={styles.paymentCard}>
          <View style={styles.cardLogos}>
            <View style={styles.cardLogoItem}>
              <Ionicons name="card" size={28} color="#1E56A0" />
            </View>
            <View style={styles.cardLogoItem}>
              <Text style={styles.cardLogoText}>MC</Text>
            </View>
          </View>

          <View style={styles.cardNumber}>
            <Text style={styles.cardNumberText}>7542</Text>
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.cardDetail}>
              <Text style={styles.cardDetailLabel}>CVC</Text>
              <View style={styles.cvcValue}>
                <Text style={styles.cvcDots}>••••</Text>
                <Text style={styles.cvcNumber}>1226</Text>
              </View>
            </View>
            <View style={styles.cardDetail}>
              <Text style={styles.cardDetailLabel}>Expiry</Text>
              <View style={styles.expiryValue}>
                <Text style={styles.expiryText}>180 | 15</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Información del Servicio */}
        <View style={styles.serviceInfo}>
          <View style={styles.serviceRow}>
            <Ionicons name="location" size={20} color="#1E56A0" />
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceLabel}>Origen</Text>
              <Text style={styles.serviceText}>Calle 25 #47</Text>
              <Text style={styles.serviceSubtext}>Carrezo 19:220</Text>
            </View>
          </View>

          <View style={styles.serviceRow}>
            <Ionicons name="navigate" size={20} color="#28A745" />
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceLabel}>Destino</Text>
              <Text style={styles.serviceText}>Carrera 9 #80</Text>
              <Text style={styles.serviceSubtext}>Carriere 4-30:30</Text>
            </View>
          </View>

          <View style={styles.serviceRow}>
            <Ionicons name="cash" size={20} color="#FFC107" />
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceLabel}>Costo</Text>
              <Text style={styles.serviceCost}>$150,000</Text>
            </View>
          </View>
        </View>

        {/* Botón de Pago */}
        <TouchableOpacity style={styles.payButton} onPress={handleFinalizarPago}>
          <Text style={styles.payButtonText}>Pagar $150,000</Text>
        </TouchableOpacity>

        {/* Información Adicional */}
        <View style={styles.infoBox}>
          <Ionicons name="shield-checkmark" size={20} color="#28A745" />
          <Text style={styles.infoText}>Pago seguro procesado con encriptación de datos</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E56A0",
  },
  header: {
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
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginBottom: 4,
  },
  logoSubtext: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  paymentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  cardLogos: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  cardLogoItem: {
    width: 50,
    height: 36,
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cardLogoText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF5722",
  },
  cardNumber: {
    marginBottom: 20,
  },
  cardNumberText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    letterSpacing: 2,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDetail: {
    flex: 1,
  },
  cardDetailLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
    fontWeight: "600",
  },
  cvcValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cvcDots: {
    fontSize: 18,
    color: "#666",
  },
  cvcNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  expiryValue: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  expiryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  serviceInfo: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 16,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  serviceDetails: {
    flex: 1,
    marginLeft: 12,
  },
  serviceLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "600",
    marginBottom: 4,
  },
  serviceText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  serviceSubtext: {
    fontSize: 13,
    color: "#999",
  },
  serviceCost: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E56A0",
  },
  payButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  payButtonText: {
    color: "#1E56A0",
    fontSize: 18,
    fontWeight: "600",
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 12,
    borderRadius: 8,
    gap: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: "#FFFFFF",
  },
})
