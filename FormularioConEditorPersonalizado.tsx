"use client"

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

// Datos de ejemplo para los contactos disponibles
const contactosDisponibles = [
  { id: "1", nombre: "Juan Pérez", email: "juan.perez@empresa.com", empresa: "Empresa ABC" },
  { id: "2", nombre: "María García", email: "maria.garcia@corp.com", empresa: "Corporación XYZ" },
  { id: "3", nombre: "Carlos Rodríguez", email: "carlos.rodriguez@tech.com", empresa: "Tech Solutions" },
  { id: "4", nombre: "Ana Martínez", email: "ana.martinez@global.com", empresa: "Global Industries" },
  { id: "5", nombre: "Luis Fernández", email: "luis.fernandez@innovate.com", empresa: "Innovate Corp" },
  { id: "6", nombre: "Carmen López", email: "carmen.lopez@services.com", empresa: "Services Ltd" },
]

export default function FormularioConEditorPersonalizado() {
  const textInputRef = useRef(null)
  const [contactosSeleccionados, setContactosSeleccionados] = useState([])
  const [modalContactosVisible, setModalContactosVisible] = useState(false)
  const [asunto, setAsunto] = useState("Oferta N°(1503)")
  const [mensaje, setMensaje] = useState("")
  const [formatoActivo, setFormatoActivo] = useState({
    negrita: false,
    cursiva: false,
    subrayado: false,
    alineacion: "left", // left, center, right
    lista: false,
    numeroLista: false,
  })
  const [archivoAdjunto, setArchivoAdjunto] = useState("Ninguno archivo selec.")
  const [fechaLimiteHabilitada, setFechaLimiteHabilitada] = useState(false)
  const [fechaLimite, setFechaLimite] = useState("")
  const [horaLimite, setHoraLimite] = useState("08:00")
  const [limiteRestriccion, setLimiteRestriccion] = useState("Días")
  const [observaciones, setObservaciones] = useState("")
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)

  const handleSeleccionarOferentes = () => {
    setModalContactosVisible(true)
  }

  const handleSeleccionarContacto = (contacto) => {
    const yaSeleccionado = contactosSeleccionados.find((c) => c.id === contacto.id)
    if (!yaSeleccionado) {
      setContactosSeleccionados([...contactosSeleccionados, contacto])
    }
  }

  const handleEliminarContacto = (contactoId) => {
    setContactosSeleccionados(contactosSeleccionados.filter((c) => c.id !== contactoId))
  }

  const cerrarModalContactos = () => {
    setModalContactosVisible(false)
  }

  const handleFormatoTexto = (tipo) => {
    if (tipo === "alineacion") {
      const alineaciones = ["left", "center", "right"]
      const currentIndex = alineaciones.indexOf(formatoActivo.alineacion)
      const nextIndex = (currentIndex + 1) % alineaciones.length
      setFormatoActivo((prev) => ({
        ...prev,
        alineacion: alineaciones[nextIndex],
      }))
    } else {
      setFormatoActivo((prev) => ({
        ...prev,
        [tipo]: !prev[tipo],
      }))
    }

    // Mantener el foco en el TextInput
    setTimeout(() => {
      textInputRef.current?.focus()
    }, 100)
  }

  const insertarTexto = (textoAInsertar) => {
    const nuevoTexto = mensaje.substring(0, selectionStart) + textoAInsertar + mensaje.substring(selectionEnd)

    setMensaje(nuevoTexto)

    // Actualizar la posición del cursor
    const nuevaPosicion = selectionStart + textoAInsertar.length
    setTimeout(() => {
      textInputRef.current?.setNativeProps({
        selection: { start: nuevaPosicion, end: nuevaPosicion },
      })
    }, 10)
  }

  const handleInsertarLista = () => {
    const textoLista = formatoActivo.numeroLista ? "\n1. " : "\n• "
    insertarTexto(textoLista)
    handleFormatoTexto("lista")
  }

  const handleInsertarNumeroLista = () => {
    const textoLista = "\n1. "
    insertarTexto(textoLista)
    handleFormatoTexto("numeroLista")
  }

  const handleInsertarSaltoLinea = () => {
    insertarTexto("\n")
  }

  const handleSeleccionarArchivo = () => {
    console.log("Seleccionar archivo")
  }

  const handleCerrar = () => {
    console.log("Cerrar formulario")
  }

  const handleEnviar = () => {
    console.log("Enviar mensaje")
    console.log("Contactos seleccionados:", contactosSeleccionados)
    console.log("Contenido del mensaje:", mensaje)
    console.log("Formato aplicado:", formatoActivo)
  }

  const handleSelectionChange = (event) => {
    const { start, end } = event.nativeEvent.selection
    setSelectionStart(start)
    setSelectionEnd(end)
  }

  const getTextAlign = () => {
    switch (formatoActivo.alineacion) {
      case "center":
        return "center"
      case "right":
        return "right"
      default:
        return "left"
    }
  }

  const getIconoAlineacion = () => {
    switch (formatoActivo.alineacion) {
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  const ContactoItem = ({ item, onPress }) => (
    <TouchableOpacity style={styles.contactoItem} onPress={() => onPress(item)}>
      <View style={styles.contactoInfo}>
        <Text style={styles.contactoNombre}>{item.nombre}</Text>
        <Text style={styles.contactoEmail}>{item.email}</Text>
        <Text style={styles.contactoEmpresa}>{item.empresa}</Text>
      </View>
      <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
    </TouchableOpacity>
  )

  const ContactoSeleccionadoItem = ({ item, onEliminar }) => (
    <View style={styles.contactoSeleccionadoItem}>
      <View style={styles.contactoSeleccionadoInfo}>
        <Text style={styles.contactoSeleccionadoNombre}>{item.nombre}</Text>
        <Text style={styles.contactoSeleccionadoEmail}>{item.email}</Text>
      </View>
      <TouchableOpacity onPress={() => onEliminar(item.id)}>
        <Ionicons name="close-circle" size={20} color="#FF5722" />
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.titulo}>Seleccione los contactos</Text>

          {/* Campo de selección de contactos */}
          <View style={styles.campoContainer}>
            <View style={styles.seleccionContainer}>
              <TextInput
                style={styles.inputSeleccion}
                value={`${contactosSeleccionados.length} contacto(s) seleccionado(s)`}
                placeholder="Seleccione"
                placeholderTextColor="#999"
                editable={false}
              />
              <TouchableOpacity style={styles.botonSeleccionar} onPress={handleSeleccionarOferentes}>
                <Text style={styles.textoBotonSeleccionar}>Seleccionar oferentes</Text>
              </TouchableOpacity>
            </View>

            {/* Tabla de contactos seleccionados */}
            {contactosSeleccionados.length > 0 && (
              <View style={styles.tablaContactos}>
                <Text style={styles.tituloTabla}>Contactos seleccionados:</Text>
                <FlatList
                  data={contactosSeleccionados}
                  renderItem={({ item }) => (
                    <ContactoSeleccionadoItem item={item} onEliminar={handleEliminarContacto} />
                  )}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                />
              </View>
            )}
          </View>

          {/* Modal para seleccionar contactos */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalContactosVisible}
            onRequestClose={cerrarModalContactos}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitulo}>Seleccionar Contactos</Text>
                  <TouchableOpacity onPress={cerrarModalContactos}>
                    <Ionicons name="close" size={24} color="#333" />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={contactosDisponibles}
                  renderItem={({ item }) => <ContactoItem item={item} onPress={handleSeleccionarContacto} />}
                  keyExtractor={(item) => item.id}
                  style={styles.listaContactos}
                />

                <View style={styles.modalFooter}>
                  <TouchableOpacity style={styles.botonModalCerrar} onPress={cerrarModalContactos}>
                    <Text style={styles.textoBotonModalCerrar}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {/* Campo Asunto */}
          <View style={styles.campoContainer}>
            <Text style={styles.etiqueta}>Asunto:</Text>
            <TextInput style={styles.input} value={asunto} onChangeText={setAsunto} />
          </View>

          {/* Campo Mensaje con Editor Personalizado */}
          <View style={styles.campoContainer}>
            <Text style={styles.etiqueta}>Mensaje:</Text>

            {/* Barra de herramientas personalizada */}
            <View style={styles.barraHerramientas}>
              {/* Primera fila de botones */}
              <View style={styles.filaHerramientas}>
                <TouchableOpacity
                  style={[styles.botonHerramienta, formatoActivo.negrita && styles.botonActivo]}
                  onPress={() => handleFormatoTexto("negrita")}
                >
                  <Text style={[styles.textoHerramienta, { fontWeight: "bold" }]}>B</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botonHerramienta, formatoActivo.cursiva && styles.botonActivo]}
                  onPress={() => handleFormatoTexto("cursiva")}
                >
                  <Text style={[styles.textoHerramienta, { fontStyle: "italic" }]}>I</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botonHerramienta, formatoActivo.subrayado && styles.botonActivo]}
                  onPress={() => handleFormatoTexto("subrayado")}
                >
                  <Text style={[styles.textoHerramienta, { textDecorationLine: "underline" }]}>U</Text>
                </TouchableOpacity>

                <View style={styles.separador} />

                <TouchableOpacity style={styles.botonHerramienta} onPress={() => handleFormatoTexto("alineacion")}>
                  <Ionicons name={getIconoAlineacion()} size={16} color="#007AFF" />
                </TouchableOpacity>

                <View style={styles.separador} />

                <TouchableOpacity
                  style={[styles.botonHerramienta, formatoActivo.lista && styles.botonActivo]}
                  onPress={handleInsertarLista}
                >
                  <Ionicons name="list" size={16} color="#007AFF" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.botonHerramienta, formatoActivo.numeroLista && styles.botonActivo]}
                  onPress={handleInsertarNumeroLista}
                >
                  <Ionicons name="list-outline" size={16} color="#007AFF" />
                </TouchableOpacity>
              </View>

              {/* Segunda fila de botones */}
              <View style={styles.filaHerramientas}>
                <TouchableOpacity style={styles.botonHerramientaTexto} onPress={handleInsertarSaltoLinea}>
                  <Text style={styles.textoBotonHerramienta}>Nueva línea</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botonHerramientaTexto} onPress={() => insertarTexto("• ")}>
                  <Text style={styles.textoBotonHerramienta}>Viñeta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.botonHerramientaTexto} onPress={() => insertarTexto("    ")}>
                  <Text style={styles.textoBotonHerramienta}>Sangría</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Área de texto principal */}
            <TextInput
              ref={textInputRef}
              style={[
                styles.textAreaMensaje,
                {
                  fontWeight: formatoActivo.negrita ? "bold" : "normal",
                  fontStyle: formatoActivo.cursiva ? "italic" : "normal",
                  textDecorationLine: formatoActivo.subrayado ? "underline" : "none",
                  textAlign: getTextAlign(),
                },
              ]}
              value={mensaje}
              onChangeText={setMensaje}
              onSelectionChange={handleSelectionChange}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
              placeholder="Escriba su mensaje aquí..."
              placeholderTextColor="#999"
              scrollEnabled={true}
            />

            {/* Información del formato actual */}
            <View style={styles.infoFormato}>
              <Text style={styles.textoInfoFormato}>
                Formato: {formatoActivo.negrita ? "Negrita " : ""}
                {formatoActivo.cursiva ? "Cursiva " : ""}
                {formatoActivo.subrayado ? "Subrayado " : ""}| Alineación: {formatoActivo.alineacion}
              </Text>
            </View>
          </View>

          {/* Campo Adjunto */}
          <View style={styles.campoContainer}>
            <Text style={styles.etiqueta}>Adjunto:</Text>
            <View style={styles.adjuntoContainer}>
              <TouchableOpacity style={styles.botonAdjunto} onPress={handleSeleccionarArchivo}>
                <Text style={styles.textoBotonAdjunto}>Seleccionar archivo</Text>
              </TouchableOpacity>
              <Text style={styles.textoAdjunto}>{archivoAdjunto}</Text>
            </View>
          </View>

          {/* Sección de fecha límite */}
          <View style={styles.seccionFechaLimite}>
            <Text style={styles.tituloSeccion}>Fecha límite envío de inquietudes por parte de los oferentes (*)</Text>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setFechaLimiteHabilitada(!fechaLimiteHabilitada)}
              >
                {fechaLimiteHabilitada && <Ionicons name="checkmark" size={16} color="#007AFF" />}
              </TouchableOpacity>
              <Text style={styles.textoCheckbox}>¿Definir fecha límite de envío de mensajes?</Text>
            </View>

            {fechaLimiteHabilitada && (
              <View style={styles.camposFechaLimite}>
                <View style={styles.filaFechaLimite}>
                  <View style={styles.campoFecha}>
                    <Text style={styles.etiquetaFecha}>Fecha límite (*)</Text>
                    <TextInput
                      style={styles.inputFecha}
                      value={fechaLimite}
                      onChangeText={setFechaLimite}
                      placeholder="dd/mm/aaaa"
                    />
                  </View>
                  <View style={styles.campoHora}>
                    <Text style={styles.etiquetaFecha}>Hora límite (*)</Text>
                    <TextInput style={styles.inputFecha} value={horaLimite} onChangeText={setHoraLimite} />
                  </View>
                </View>

                <View style={styles.filaFechaLimite}>
                  <View style={styles.campoRestriccion}>
                    <Text style={styles.etiquetaFecha}>Límite restricción</Text>
                    <TouchableOpacity style={styles.selectRestriccion}>
                      <Text style={styles.textoSelect}>{limiteRestriccion} ▼</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.campoObservaciones}>
                    <Text style={styles.etiquetaFecha}>Observaciones</Text>
                    <TextInput
                      style={styles.inputObservaciones}
                      value={observaciones}
                      onChangeText={setObservaciones}
                      placeholder="Observaciones"
                    />
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Botones de acción */}
          <View style={styles.botonesContainer}>
            <TouchableOpacity style={styles.botonCerrar} onPress={handleCerrar}>
              <Text style={styles.textoBotonCerrar}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botonEnviar} onPress={handleEnviar}>
              <Text style={styles.textoBotonEnviar}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  campoContainer: {
    marginBottom: 16,
  },
  seleccionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputSeleccion: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#fff",
    marginRight: 8,
    color: "#333",
  },
  botonSeleccionar: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textoBotonSeleccionar: {
    color: "#333",
    fontSize: 14,
  },
  tablaContactos: {
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
  },
  tituloTabla: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  contactoSeleccionadoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  contactoSeleccionadoInfo: {
    flex: 1,
  },
  contactoSeleccionadoNombre: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  contactoSeleccionadoEmail: {
    fontSize: 12,
    color: "#666",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  listaContactos: {
    maxHeight: 400,
  },
  contactoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  contactoInfo: {
    flex: 1,
  },
  contactoNombre: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  contactoEmail: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  contactoEmpresa: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
  modalFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  botonModalCerrar: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  textoBotonModalCerrar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  etiqueta: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#fff",
  },
  barraHerramientas: {
    backgroundColor: "#f8f8f8",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomWidth: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  filaHerramientas: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    flexWrap: "wrap",
  },
  botonHerramienta: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 4,
    borderRadius: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    minWidth: 36,
    alignItems: "center",
  },
  botonActivo: {
    backgroundColor: "#007AFF",
  },
  textoHerramienta: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  botonHerramientaTexto: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 4,
    borderRadius: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textoBotonHerramienta: {
    fontSize: 12,
    color: "#007AFF",
  },
  separador: {
    width: 1,
    height: 20,
    backgroundColor: "#ddd",
    marginHorizontal: 8,
  },
  textAreaMensaje: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    padding: 12,
    backgroundColor: "#fff",
    minHeight: 200,
    fontSize: 16,
    maxHeight: 300,
  },
  infoFormato: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    borderTopWidth: 0,
  },
  textoInfoFormato: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
  adjuntoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  botonAdjunto: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
  },
  textoBotonAdjunto: {
    color: "#333",
    fontSize: 12,
  },
  textoAdjunto: {
    color: "#666",
    fontSize: 12,
  },
  seccionFechaLimite: {
    borderTopWidth: 2,
    borderTopColor: "#007AFF",
    paddingTop: 16,
    marginTop: 16,
  },
  tituloSeccion: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 3,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  textoCheckbox: {
    fontSize: 14,
    color: "#333",
  },
  camposFechaLimite: {
    marginTop: 16,
  },
  filaFechaLimite: {
    flexDirection: "row",
    marginBottom: 12,
  },
  campoFecha: {
    flex: 1,
    marginRight: 8,
  },
  campoHora: {
    flex: 1,
    marginLeft: 8,
  },
  campoRestriccion: {
    flex: 1,
    marginRight: 8,
  },
  campoObservaciones: {
    flex: 1,
    marginLeft: 8,
  },
  etiquetaFecha: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  inputFecha: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#fff",
    fontSize: 12,
  },
  selectRestriccion: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#fff",
  },
  textoSelect: {
    fontSize: 12,
    color: "#333",
  },
  inputObservaciones: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#fff",
    fontSize: 12,
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
  },
  botonCerrar: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textoBotonCerrar: {
    color: "#333",
    fontSize: 14,
  },
  botonEnviar: {
    backgroundColor: "#28a745",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 4,
  },
  textoBotonEnviar: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
})
