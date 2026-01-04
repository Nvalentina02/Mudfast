import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function ServicioFinalizadoScreen() {
  const router = useRouter()
  const [calificacion, setCalificacion] = useState(0)
  const [comentario, setComentario] = useState("")

  const handleCalificar = (rating) => {
    setCalificacion(rating)
  }

  const handleEnviarCalificacion = () => {
    if (calificacion === 0) {
      alert("Por favor selecciona una calificación")
      return
    }
    console.log("[v0] Calificación enviada:", { calificacion, comentario })
    router.push("/historial-mudanzas")
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="light-content" backgroundColor="#1E56A0" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Servicio Finalizado</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Resumen del Servicio */}
        <View style={styles.summaryCard}>
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={64} color="#28A745" />
          </View>
          <Text style={styles.successTitle}>¡Servicio Completado!</Text>
          <Text style={styles.successMessage}>Tu mudanza se ha realizado exitosamente</Text>

          <View style={styles.summaryDetails}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Origen:</Text>
              <Text style={styles.summaryValue}>Calle 12 #45-520</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Destino:</Text>
              <Text style={styles.summaryValue}>Carrera 9 #80</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Costo:</Text>
              <Text style={styles.summaryValueHighlight}>$150,000</Text>
            </View>
          </View>
        </View>

        {/* Calificación del Proveedor */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingTitle}>Calífique al Proveedor</Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleCalificar(star)} activeOpacity={0.7}>
                <Ionicons name={star <= calificacion ? "star" : "star-outline"} size={48} color="#FFC107" />
              </TouchableOpacity>
            ))}
          </View>

          {calificacion > 0 && (
            <Text style={styles.ratingText}>
              {calificacion === 5
                ? "Excelente"
                : calificacion === 4
                  ? "Muy Bueno"
                  : calificacion === 3
                    ? "Bueno"
                    : calificacion === 2
                      ? "Regular"
                      : "Malo"}
            </Text>
          )}
        </View>

        {/* Comentario */}
        <View style={styles.commentCard}>
          <Text style={styles.commentTitle}>Deja tu comentario...</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Cuéntanos tu experiencia con el servicio"
            placeholderTextColor="#999"
            value={comentario}
            onChangeText={setComentario}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Botón Enviar */}
        <TouchableOpacity style={styles.submitButton} onPress={handleEnviarCalificacion}>
          <Text style={styles.submitButtonText}>Enviar Calificación</Text>
        </TouchableOpacity>

        {/* Botón Omitir */}
        <TouchableOpacity style={styles.skipButton} onPress={() => router.push("/historial-mudanzas")}>
          <Text style={styles.skipButtonText}>Omitir por ahora</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  successIcon: {
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  summaryDetails: {
    width: "100%",
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 14,
    color: "#333",
  },
  summaryValueHighlight: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E56A0",
  },
  ratingCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E56A0",
  },
  commentCard: {
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
  commentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  commentInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: "#333",
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  submitButton: {
    backgroundColor: "#1E56A0",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  skipButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    alignItems: "center",
  },
  skipButtonText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
  },
})
