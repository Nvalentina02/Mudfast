import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function ConfirmacionPagoScreen() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E56A0" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Centro de Ayuda{"\n"}(Arention 3on11)</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Perfil del Proveedor */}
        <View style={styles.providerCard}>
          <View style={styles.providerBadge}>
            <Text style={styles.providerBadgeText}>Mudanzas Rápidas</Text>
          </View>
          <Text style={styles.providerSubtext}>Esosteen Verificalo</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="shield-checkmark" size={14} color="#28A745" />
            <Text style={styles.verifiedText}>Provenem Verificalo</Text>
          </View>
        </View>

        {/* Información del Servicio */}
        <View style={styles.serviceCard}>
          <View style={styles.serviceRow}>
            <Ionicons name="location" size={20} color="#1E56A0" />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceLabel}>Origen</Text>
              <Text style={styles.serviceText}>Calle 18 9 #65</Text>
              <Text style={styles.serviceSubtext}>Carriero 11 #858</Text>
            </View>
          </View>

          <View style={styles.serviceRow}>
            <Ionicons name="navigate" size={20} color="#28A745" />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceLabel}>Destino</Text>
              <Text style={styles.serviceText}>Marmes, die 29 ABU</Text>
            </View>
            <Text style={styles.servicePrice}>$150,000</Text>
          </View>
        </View>

        {/* Tarjeta de Pago */}
        <View style={styles.paymentCard}>
          <View style={styles.cardLogos}>
            <View style={styles.cardLogoItem}>
              <Ionicons name="card" size={24} color="#1E56A0" />
            </View>
            <View style={styles.cardLogoItem}>
              <Text style={styles.cardLogoText}>50</Text>
            </View>
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.cardDetailRow}>
              <Text style={styles.cardLabel}>CVC</Text>
              <View style={styles.cvcValue}>
                <Text style={styles.cvcDots}>•••••</Text>
                <Text style={styles.cvcNumber}>12126</Text>
              </View>
            </View>
            <View style={styles.cardDetailRow}>
              <Text style={styles.expiryLabel}>123 1594</Text>
            </View>
          </View>
        </View>

        {/* Botón de Pago */}
        <TouchableOpacity style={styles.payButton} onPress={() => router.push("/servicio-finalizado")}>
          <Text style={styles.payButtonText}>Pagar $150,000</Text>
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
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: 24,
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
    alignItems: "center",
  },
  providerBadge: {
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  providerBadgeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E56A0",
  },
  providerSubtext: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
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
    gap: 16,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  serviceInfo: {
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
  servicePrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E56A0",
    marginLeft: 12,
  },
  paymentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  cardLogos: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  cardLogoItem: {
    width: 45,
    height: 32,
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
    color: "#1E56A0",
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardDetailRow: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
    fontWeight: "600",
  },
  cvcValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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
  expiryLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: "flex-start",
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
})
