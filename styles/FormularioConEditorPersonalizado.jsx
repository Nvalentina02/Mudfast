import { useState, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const contactosDisponibles = [
  { id: "1", nombre: "Juan Pérez", email: "juan.perez@empresa.com", empresa: "Empresa ABC" },
  { id: "2", nombre: "María García", email: "maria.garcia@corp.com", empresa: "Corporación XYZ" },
  { id: "3", nombre: "Carlos Rodríguez", email: "carlos.rodriguez@tech.com", empresa: "Tech Solutions" },
  { id: "4", nombre: "Ana Martínez", email: "ana.martinez@global.com", empresa: "Global Industries" },
  { id: "5", nombre: "Luis Fernández", email: "luis.fernandez@innovate.com", empresa: "Innovate Corp" },
  { id: "6", nombre: "Carmen López", email: "carmen.lopez@services.com", empresa: "Services Ltd" },
]

export default function FormularioConEditorPersonalizado() {
  const textInputRef = useRef()
  const [contactosSeleccionados, setContactosSeleccionados] = useState([])
  const [modalContactosVisible, setModalContactosVisible] = useState(false)
  const [asunto, setAsunto] = useState("Oferta N°(1503)")
  const [mensaje, setMensaje] = useState("")
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)

  const [formatoActivo, setFormatoActivo] = useState({
    negrita: false,
    cursiva: false,
    subrayado: false,
    alineacion: "left",
    lista: false,
    numeroLista: false,
  })

  const handleFormatoTexto = (tipo) => {
    if (tipo === "alineacion") {
      const orden = ["left", "center", "right"]
      const next = (orden.indexOf(formatoActivo.alineacion) + 1) % orden.length
      setFormatoActivo({ ...formatoActivo, alineacion: orden[next] })
    } else {
      setFormatoActivo({ ...formatoActivo, [tipo]: !formatoActivo[tipo] })
    }
    setTimeout(() => textInputRef.current?.focus(), 50)
  }

  const insertarTexto = (texto) => {
    const nuevo = mensaje.slice(0, selectionStart) + texto + mensaje.slice(selectionEnd)
    setMensaje(nuevo)
    const pos = selectionStart + texto.length
    setTimeout(() => {
      textInputRef.current?.setNativeProps({
        selection: { start: pos, end: pos },
      })
    }, 10)
  }

  const handleSelectionChange = (e) => {
    setSelectionStart(e.nativeEvent.selection.start)
    setSelectionEnd(e.nativeEvent.selection.end)
  }

  const getTextAlign = () => formatoActivo.alineacion

  const getIconoAlineacion = () => {
    if (formatoActivo.alineacion === "center") return "align-horizontal"
    if (formatoActivo.alineacion === "right") return "arrow-forward"
    return "arrow-back"
  }

  const ContactoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactoItem}
      onPress={() => setContactosSeleccionados([...contactosSeleccionados, item])}
    >
      <View>
        <Text style={styles.contactoNombre}>{item.nombre}</Text>
        <Text style={styles.contactoEmail}>{item.email}</Text>
      </View>
      <Ionicons name="add-circle-outline" size={24} color="#28A745" />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView style={{ padding: 16 }}>
          <Text style={styles.titulo}>Seleccione los contactos</Text>

          <TouchableOpacity style={styles.botonSeleccionar} onPress={() => setModalContactosVisible(true)}>
            <Text>Seleccionar oferentes</Text>
          </TouchableOpacity>

          <Modal visible={modalContactosVisible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <FlatList
                  data={contactosDisponibles}
                  renderItem={({ item }) => <ContactoItem item={item} />}
                  keyExtractor={(item) => item.id}
                />
                <TouchableOpacity onPress={() => setModalContactosVisible(false)}>
                  <Text style={{ textAlign: "center", padding: 12 }}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={styles.etiqueta}>Asunto</Text>
          <TextInput style={styles.input} value={asunto} onChangeText={setAsunto} />

          <View style={styles.barraHerramientas}>
            <TouchableOpacity onPress={() => handleFormatoTexto("negrita")}>
              <Text style={{ fontWeight: "bold" }}>B</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFormatoTexto("cursiva")}>
              <Text style={{ fontStyle: "italic" }}>I</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFormatoTexto("subrayado")}>
              <Text style={{ textDecorationLine: "underline" }}>U</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFormatoTexto("alineacion")}>
              <Ionicons name={getIconoAlineacion()} size={18} />
            </TouchableOpacity>
          </View>

          <TextInput
            ref={textInputRef}
            style={[
              styles.textArea,
              {
                fontWeight: formatoActivo.negrita ? "bold" : "normal",
                fontStyle: formatoActivo.cursiva ? "italic" : "normal",
                textDecorationLine: formatoActivo.subrayado ? "underline" : "none",
                textAlign: getTextAlign(),
              },
            ]}
            multiline
            value={mensaje}
            onChangeText={setMensaje}
            onSelectionChange={handleSelectionChange}
            placeholder="Escriba su mensaje..."
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  titulo: { fontSize: 18, fontWeight: "600", marginBottom: 16 },
  etiqueta: { marginTop: 16, marginBottom: 6 },
  input: { borderWidth: 1, padding: 10, borderRadius: 4, backgroundColor: "#fff" },
  barraHerramientas: { flexDirection: "row", gap: 12, marginVertical: 8 },
  textArea: {
    borderWidth: 1,
    padding: 12,
    minHeight: 150,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  botonSeleccionar: {
    padding: 12,
    backgroundColor: "#eee",
    borderRadius: 4,
    marginBottom: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 6,
    padding: 16,
  },
  contactoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  contactoNombre: { fontWeight: "600" },
  contactoEmail: { color: "#666" },
})
