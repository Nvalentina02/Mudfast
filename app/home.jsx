import { View, Text, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Image } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function HomeScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null)

  const menuOptions = [
    {
      id: "1",
      title: "Solicitar Mudanza",
      icon: "add-circle",
      color: "#28A745",
      route: "/solicitar-mudanza",
      rolAssigned: "usuario",
    },
    {
      id: "2",
      title: "Mis Mudanzas",
      icon: "list",
      color: "#1E56A0",
      route: "/historial-mudanzas",
      rolAssigned: "todos",
    },
    {
      id: "3",
      title: "Centro de Ayuda",
      icon: "help-circle",
      color: "#FF9800",
      route: "/centro-ayuda",
      rolAssigned: "todos",
    },
    {
      id: "4",
      title: "Panel Proveedor",
      icon: "business",
      color: "#9C27B0",
      route: "/panel-proveedor",
      rolAssigned: "proveedor",
    },
  ];

  const filteredMenu = menuOptions.filter(
    (item) =>
      item.rolAssigned === "todos" ||
      item.rolAssigned === usuario?.rol
  );
  
  useEffect(() => {
    const cargarSesion = async () => {
      const session = await AsyncStorage.getItem("session")
      if (session) {
        setUsuario(JSON.parse(session))
      }
    }

    cargarSesion()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E56A0" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola, {usuario?.rol}</Text>
          <Text style={styles.subtitle}>Bienvenido a MUDFAST</Text>
        </View>
        <TouchableOpacity style={styles.avatarButton}>
          <Image source={{ uri: `https://i.pravatar.cc/150?img=${usuario?.img}` }} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Acciones rápidas */}
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <View style={styles.actionsGrid}>
            {filteredMenu.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => router.push(item.route)}
                style={styles.actionCard}
              >
                <View style={[styles.actionIcon, { backgroundColor: `${item.color}15` }]}>
                  <Ionicons name={item.icon} size={30} color={item.color} />
                </View>
                <Text style={styles.actionTitle}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Tus Estadísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Mudanzas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Pendientes/Completas</Text>
            </View>
          </View>
        </View>

        {/* Actividad reciente */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Actividad Reciente</Text>
          <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <Ionicons name="checkmark-circle" size={24} color="#28A745" />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Mudanza Completada</Text>
              <Text style={styles.activitySubtext}>Calle 12 → Carrera 9</Text>
              <Text style={styles.activityTime}>Hace 2 días</Text>
            </View>
            <Text style={styles.activityCost}>$150,000</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#1E56A0" />
          <Text style={[styles.navText, styles.navTextActive]}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/historial-mudanzas")}>
          <Ionicons name="time" size={24} color="#999" />
          <Text style={styles.navText}>Historial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => router.push("/centro-ayuda")}>
          <Ionicons name="notifications" size={24} color="#999" />
          <Text style={styles.navText}>Ayuda</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#999" />
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  avatarButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  quickActions: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 3,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    elevation: 3,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1E56A0",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: "#666",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E0E0E0",
  },
  recentSection: {
    marginBottom: 24,
  },
  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  activityIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  activitySubtext: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: "#999",
  },
  activityCost: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1E56A0",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  navText: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
  },
  navTextActive: {
    color: "#1E56A0",
    fontWeight: "600",
  },
})
