import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function CentroAyudaScreen() {
  const router = useRouter()
  const [tabActiva, setTabActiva] = useState("nuevas")

  const notificaciones = [
    {
      id: "1",
      tipo: "origen",
      titulo: "Calle 12 #45",
      origen: "Carrera 33 #865",
      destino: "Destino: Carrera 9 #80",
      fecha: "Carrinso Hkexde",
      hora: "Corriss 9-5-0ixis",
      costo: "$150,000",
      icono: "location",
      iconColor: "#1E56A0",
    },
    {
      id: "2",
      tipo: "destino",
      titulo: "Carrera 9 #80",
      origen: "Destino: Carrera 9 #80",
      destino: "",
      fecha: "Marmes, dio 23",
      hora: "30 30",
      costo: "$150,000",
      icono: "navigate",
      iconColor: "#28A745",
    },
    {
      id: "3",
      tipo: "embalaje",
      titulo: "Embalaje #128",
      origen: "Carissa G-S1005",
      destino: "",
      fecha: "00:20,000",
      hora: "",
      costo: "",
      icono: "cube",
      iconColor: "#FF9800",
    },
  ]

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

      {/* Info Card */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={18} color="#1E56A0" />
          <Text style={styles.infoText}>Calle 12 #45 -</Text>
          <Ionicons name="business" size={18} color="#666" />
          <Text style={styles.infoValue}>$150,000</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoSubtext}>Dremisen Carriero 2732</Text>
          <Text style={styles.infoValue}>$150,000</Text>
        </View>
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
        {notificaciones.map((notificacion) => (
          <View key={notificacion.id} style={styles.notificationCard}>
            <View style={styles.notificationHeader}>
              <View style={[styles.iconCircle, { backgroundColor: `${notificacion.iconColor}15` }]}>
                <Ionicons name={notificacion.icono} size={20} color={notificacion.iconColor} />
              </View>

              <View style={styles.notificationInfo}>
                <Text style={styles.notificationTitle}>{notificacion.titulo}</Text>
                {notificacion.origen ? (
                  <Text style={styles.notificationSubtext}>{notificacion.origen}</Text>
                ) : null}
              </View>

              <Text style={styles.notificationTime}>{notificacion.fecha}</Text>
            </View>

            {notificacion.destino ? (
              <View style={styles.notificationDetail}>
                <Ionicons name="navigate" size={16} color="#28A745" />
                <Text style={styles.detailText}>{notificacion.destino}</Text>
              </View>
            ) : null}

            {notificacion.hora ? (
              <View style={styles.notificationFooter}>
                <Text style={styles.footerText}>{notificacion.hora}</Text>
                {notificacion.costo ? (
                  <Text style={styles.footerCost}>{notificacion.costo}</Text>
                ) : null}
              </View>
            ) : null}
          </View>
        ))}
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

  infoCard: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 8 },
  infoText: { fontSize: 14, color: "#333", fontWeight: "500" },
  infoSubtext: { fontSize: 13, color: "#666", flex: 1 },
  infoValue: { fontSize: 14, fontWeight: "600", color: "#1E56A0" },

  tabsContainer: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: "center", borderBottomWidth: 2 },
  tabActive: { borderBottomColor: "#1E56A0" },
  tabText: { fontSize: 14, fontWeight: "600", color: "#666" },
  tabTextActive: { color: "#1E56A0" },

  content: { flex: 1 },
  contentContainer: { padding: 20 },

  notificationCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  notificationHeader: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationInfo: { flex: 1 },
  notificationTitle: { fontSize: 15, fontWeight: "600", color: "#333" },
  notificationSubtext: { fontSize: 13, color: "#666" },
  notificationTime: { fontSize: 12, color: "#999" },

  notificationDetail: { flexDirection: "row", alignItems: "center", marginBottom: 8, gap: 8 },
  detailText: { fontSize: 13, color: "#666" },

  notificationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  footerText: { fontSize: 13, color: "#666" },
  footerCost: { fontSize: 15, fontWeight: "700", color: "#1E56A0" },
})
