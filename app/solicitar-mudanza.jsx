import { useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Alert } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function SolicitarMudanzaScreen() {
  const router = useRouter()
  const [origenDireccion, setOrigenDireccion] = useState("")
  const [origenBarrio, setOrigenBarrio] = useState("")
  const [destinoDireccion, setDestinoDireccion] = useState("")
  const [destinoBarrio, setDestinoBarrio] = useState("")
  const [tipoPropiedad, setTipoPropiedad] = useState(null)
  const [fecha, setFecha] = useState("")
  const [hora, setHora] = useState("")
  const [camionPersonal, setCamionPersonal] = useState(false)
  const [embalaje, setEmbalaje] = useState(false)

  const handleSolicitarCotizacion = () => {
    if (!origenDireccion || !destinoDireccion || !tipoPropiedad || !fecha || !hora) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios")
      return
    }

    // Navegar a la pantalla de cotización
    router.push({
      pathname: "/cotizacion-estimada",
      params: {
        origen: origenDireccion,
        destino: destinoDireccion,
        tipoPropiedad,
        fecha,
        hora,
      },
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
        <Text style={styles.headerTitle}>Solicitar Mudanza</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {/* Dirección de Origen */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dirección de Origen</Text>
          <View style={styles.inputGroup}>
            <Ionicons name="location-outline" size={20} color="#1E56A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Escalera 37, Barrio Ciudadela"
              placeholderTextColor="#999"
              value={origenDireccion}
              onChangeText={setOrigenDireccion}
            />
          </View>
          <TextInput
            style={styles.inputSecondary}
            placeholder="Barrio"
            placeholderTextColor="#999"
            value={origenBarrio}
            onChangeText={setOrigenBarrio}
          />
        </View>

        {/* Dirección de Destino */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dirección de Destino</Text>
          <View style={styles.inputGroup}>
            <Ionicons name="navigate-outline" size={20} color="#1E56A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Carrera 11 #68, Barrio Chico"
              placeholderTextColor="#999"
              value={destinoDireccion}
              onChangeText={setDestinoDireccion}
            />
          </View>
          <TextInput
            style={styles.inputSecondary}
            placeholder="Barrio"
            placeholderTextColor="#999"
            value={destinoBarrio}
            onChangeText={setDestinoBarrio}
          />
        </View>

        {/* Tipo de Propiedad */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tipo de Propiedad</Text>
          <View style={styles.propertyTypeContainer}>
            <TouchableOpacity
              style={[styles.propertyTypeButton, tipoPropiedad === "apartamento" && styles.propertyTypeButtonActive]}
              onPress={() => setTipoPropiedad("apartamento")}
            >
              <Ionicons name="business" size={24} color={tipoPropiedad === "apartamento" ? "#FFFFFF" : "#1E56A0"} />
              <Text style={[styles.propertyTypeText, tipoPropiedad === "apartamento" && styles.propertyTypeTextActive]}>
                Apartamento
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.propertyTypeButton, tipoPropiedad === "oficina" && styles.propertyTypeButtonActive]}
              onPress={() => setTipoPropiedad("oficina")}
            >
              <Ionicons name="briefcase" size={24} color={tipoPropiedad === "oficina" ? "#FFFFFF" : "#1E56A0"} />
              <Text style={[styles.propertyTypeText, tipoPropiedad === "oficina" && styles.propertyTypeTextActive]}>
                Oficina
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.propertyTypeButton, tipoPropiedad === "casa" && styles.propertyTypeButtonActive]}
              onPress={() => setTipoPropiedad("casa")}
            >
              <Ionicons name="home" size={24} color={tipoPropiedad === "casa" ? "#FFFFFF" : "#1E56A0"} />
              <Text style={[styles.propertyTypeText, tipoPropiedad === "casa" && styles.propertyTypeTextActive]}>
                Casa
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Fecha y Hora */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fecha y Hora</Text>
          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeGroup}>
              <Ionicons name="calendar-outline" size={20} color="#1E56A0" style={styles.inputIcon} />
              <TextInput
                style={styles.dateTimeInput}
                placeholder="20 abril 2022"
                placeholderTextColor="#999"
                value={fecha}
                onChangeText={setFecha}
              />
            </View>
            <View style={styles.dateTimeGroup}>
              <Ionicons name="time-outline" size={20} color="#1E56A0" style={styles.inputIcon} />
              <TextInput
                style={styles.dateTimeInput}
                placeholder="10:00 AM"
                placeholderTextColor="#999"
                value={hora}
                onChangeText={setHora}
              />
            </View>
          </View>
        </View>

        {/* Servicios Adicionales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Servicios Adicionales</Text>

          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setCamionPersonal(!camionPersonal)}>
            <View style={[styles.checkbox, camionPersonal && styles.checkboxActive]}>
              {camionPersonal && <Ionicons name="checkmark" size={18} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxLabel}>Camión y Personal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxContainer} onPress={() => setEmbalaje(!embalaje)}>
            <View style={[styles.checkbox, embalaje && styles.checkboxActive]}>
              {embalaje && <Ionicons name="checkmark" size={18} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxLabel}>Embalaje Básico</Text>
          </TouchableOpacity>
        </View>

        {/* Botón Solicitar */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSolicitarCotizacion}>
          <Text style={styles.submitButtonText}>Solicitar Cotización</Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#333",
  },
  inputSecondary: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 15,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  propertyTypeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  propertyTypeButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  propertyTypeButtonActive: {
    backgroundColor: "#1E56A0",
    borderColor: "#1E56A0",
  },
  propertyTypeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E56A0",
    marginTop: 6,
  },
  propertyTypeTextActive: {
    color: "#FFFFFF",
  },
  dateTimeContainer: {
    flexDirection: "row",
    gap: 12,
  },
  dateTimeGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  dateTimeInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#333",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#CCC",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxActive: {
    backgroundColor: "#28A745",
    borderColor: "#28A745",
  },
  checkboxLabel: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#1E56A0",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})
