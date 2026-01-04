import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function RegistroScreen() {
  const router = useRouter()
  const [tipoUsuario, setTipoUsuario] = useState("usuario")
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [telefono, setTelefono] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [aceptaTerminos, setAceptaTerminos] = useState(false)

  const handleRegistro = () => {
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    if (!aceptaTerminos) {
      alert("Debes aceptar los términos y condiciones")
      return
    }
    console.log("[v0] Registro:", { nombre, email, telefono, tipoUsuario })
    // Aquí iría la lógica de registro
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="light-content" backgroundColor="#1E56A0" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Registro</Text>
        </View>

        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.logoText}>MUDFAST</Text>
          <Text style={styles.welcomeText}>Crea tu cuenta</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Selector de Tipo de Usuario */}
          <View style={styles.userTypeContainer}>
            <TouchableOpacity
              style={[styles.userTypeButton, tipoUsuario === "usuario" && styles.userTypeButtonActive]}
              onPress={() => setTipoUsuario("usuario")}
            >
              <Text style={[styles.userTypeButtonText, tipoUsuario === "usuario" && styles.userTypeButtonTextActive]}>
                Usuario
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.userTypeButton, tipoUsuario === "proveedor" && styles.userTypeButtonActive]}
              onPress={() => setTipoUsuario("proveedor")}
            >
              <Text style={[styles.userTypeButtonText, tipoUsuario === "proveedor" && styles.userTypeButtonTextActive]}>
                Proveedor
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nombre Completo</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingresa tu nombre"
              placeholderTextColor="#999"
              value={nombre}
              onChangeText={setNombre}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Correo Electrónico</Text>
            <TextInput
              style={styles.input}
              placeholder="ejemplo@correo.com"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Teléfono</Text>
            <TextInput
              style={styles.input}
              placeholder="300 123 4567"
              placeholderTextColor="#999"
              value={telefono}
              onChangeText={setTelefono}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirmar Contraseña</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={22} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.terminosContainer} onPress={() => setAceptaTerminos(!aceptaTerminos)}>
            <View style={[styles.checkbox, aceptaTerminos && styles.checkboxActive]}>
              {aceptaTerminos && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
            </View>
            <Text style={styles.terminosText}>
              Acepto los <Text style={styles.terminosLink}>términos y condiciones</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.registroButton} onPress={handleRegistro}>
            <Text style={styles.registroButtonText}>Registrarse</Text>
          </TouchableOpacity>

          <View style={styles.loginSection}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.loginLink}>Inicia sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E56A0",
  },
  scrollContent: {
    flexGrow: 1,
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
  logoSection: {
    alignItems: "center",
    paddingVertical: 30,
  },
  logoText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  formSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 20,
  },
  userTypeContainer: {
    flexDirection: "row",
    marginBottom: 24,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 4,
  },
  userTypeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 6,
  },
  userTypeButtonActive: {
    backgroundColor: "#1E56A0",
  },
  userTypeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  userTypeButtonTextActive: {
    color: "#FFFFFF",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    paddingHorizontal: 12,
  },
  terminosContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    marginTop: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#CCC",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxActive: {
    backgroundColor: "#1E56A0",
    borderColor: "#1E56A0",
  },
  terminosText: {
    flex: 1,
    fontSize: 13,
    color: "#666",
  },
  terminosLink: {
    color: "#1E56A0",
    fontWeight: "600",
  },
  registroButton: {
    backgroundColor: "#1E56A0",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  registroButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  loginSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  loginText: {
    color: "#666",
    fontSize: 14,
  },
  loginLink: {
    color: "#1E56A0",
    fontSize: 14,
    fontWeight: "600",
  },
})
