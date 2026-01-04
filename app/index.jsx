import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from "react-native"
import { useRouter } from "expo-router"

export default function InicioScreen() {
  const router = useRouter()
  const [tipoUsuario, setTipoUsuario] = useState("usuario")

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E56A0" />

      {/* Header con Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: "/truck-icon.png" }} style={styles.logoIcon} />
          <Text style={styles.logoText}>MUDFAST</Text>
        </View>
        <Text style={styles.subtitle}>
          Plataforma de Mudanzas{"\n"}en Bogotá DC
        </Text>
      </View>

      {/* Botones de Acción */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/login")}>
          <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push("/registro")}>
          <Text style={styles.secondaryButtonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>

      {/* Selector de Tipo de Usuario */}
      <View style={styles.userTypeContainer}>
        <TouchableOpacity
          style={[styles.userTypeOption, tipoUsuario === "usuario" && styles.userTypeOptionActive]}
          onPress={() => setTipoUsuario("usuario")}
        >
          <View style={[styles.radio, tipoUsuario === "usuario" && styles.radioActive]}>
            {tipoUsuario === "usuario" && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.userTypeText}>Soy Usuario</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.userTypeOption, tipoUsuario === "proveedor" && styles.userTypeOptionActive]}
          onPress={() => setTipoUsuario("proveedor")}
        >
          <View style={[styles.radio, tipoUsuario === "proveedor" && styles.radioActive]}>
            {tipoUsuario === "proveedor" && <View style={styles.radioInner} />}
          </View>
          <Text style={styles.userTypeText}>Soy Proveedor</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E56A0",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logoIcon: {
    width: 60,
    height: 60,
    tintColor: "#FFFFFF",
    marginRight: 12,
  },
  logoText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    opacity: 0.9,
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    color: "#1E56A0",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  userTypeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 40,
    gap: 20,
  },
  userTypeOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  userTypeOptionActive: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  radioActive: {
    borderColor: "#FFFFFF",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  userTypeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
})
