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

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

const DIAS_SEMANA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

export default function FormularioConCalendario() {
  const textInputRef = useRef(null)
  const [contactosSeleccionados, setContactosSeleccionados] = useState([])
  const [modalContactosVisible, setModalContactosVisible] = useState(false)
  const [asunto, setAsunto] = useState("Oferta N°(1503)")
  const [mensaje, setMensaje] = useState("")
  const [archivoAdjunto, setArchivoAdjunto] = useState("Ninguno archivo selec.")
  const [fechaLimiteHabilitada, setFechaLimiteHabilitada] = useState(false)
  const [fechaLimite, setFechaLimite] = useState("")
  const [horaLimite, setHoraLimite] = useState("08:00")
  const [limiteRestriccion, setLimiteRestriccion] = useState("No")
  const [observaciones, setObservaciones] = useState("")

  // Estados para el calendario
  const [modalCalendario, setModalCalendario] = useState(false)
  const [modalHora, setModalHora] = useState(false)
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date())
  const [mesActual, setMesActual] = useState(new Date().getMonth())
  const [anoActual, setAnoActual] = useState(new Date().getFullYear())
  const [horaSeleccionada, setHoraSeleccionada] = useState(8)
  const [minutoSeleccionado, setMinutoSeleccionado] = useState(0)

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
  }

  // Funciones del calendario
  const formatearFecha = (fecha) => {
    const dia = fecha.getDate().toString().padStart(2, "0")
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0")
    const ano = fecha.getFullYear()
    return `${dia}/${mes}/${ano}`
  }

  const formatearHora = (hora, minuto) => {
    return `${hora.toString().padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`
  }

  const obtenerDiasDelMes = (mes, ano) => {
    const primerDia = new Date(ano, mes, 1)
    const ultimoDia = new Date(ano, mes + 1, 0)
    const diasEnMes = ultimoDia.getDate()
    const diaSemanaInicio = primerDia.getDay()

    const dias = []

    // Días vacíos al inicio
    for (let i = 0; i < diaSemanaInicio; i++) {
      dias.push(null)
    }

    // Días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
      dias.push(dia)
    }

    return dias
  }

  const seleccionarFecha = (dia) => {
    if (dia) {
      const nuevaFecha = new Date(anoActual, mesActual, dia)
      setFechaSeleccionada(nuevaFecha)
      setFechaLimite(formatearFecha(nuevaFecha))
      setModalCalendario(false)
    }
  }

  const cambiarMes = (direccion) => {
    if (direccion === "anterior") {
      if (mesActual === 0) {
        setMesActual(11)
        setAnoActual(anoActual - 1)
      } else {
        setMesActual(mesActual - 1)
      }
    } else {
      if (mesActual === 11) {
        setMesActual(0)
        setAnoActual(anoActual + 1)
      } else {
        setMesActual(mesActual + 1)
      }
    }
  }

  const seleccionarHora = () => {
    setHoraLimite(formatearHora(horaSeleccionada, minutoSeleccionado))
    setModalHora(false)
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

  const renderCalendario = () => {
    const dias = obtenerDiasDelMes(mesActual, anoActual)
    const hoy = new Date()
    const esHoy = (dia) => {
      return dia && hoy.getDate() === dia && hoy.getMonth() === mesActual && hoy.getFullYear() === anoActual
    }

    const esFechaSeleccionada = (dia) => {
      return (
        dia &&
        fechaSeleccionada.getDate() === dia &&
        fechaSeleccionada.getMonth() === mesActual &&
        fechaSeleccionada.getFullYear() === anoActual
      )
    }

    return (
      <View style={styles.calendario}>
        {/* Header del calendario */}
        <View style={styles.calendarioHeader}>
          <TouchableOpacity onPress={() => cambiarMes("anterior")}>
            <Ionicons name="chevron-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.calendarioTitulo}>
            {MESES[mesActual]} {anoActual}
          </Text>
          <TouchableOpacity onPress={() => cambiarMes("siguiente")}>
            <Ionicons name="chevron-forward" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Días de la semana */}
        <View style={styles.diasSemana}>
          {DIAS_SEMANA.map((dia) => (
            <Text key={dia} style={styles.diaSemana}>
              {dia}
            </Text>
          ))}
        </View>

        {/* Grid de días */}
        <View style={styles.gridDias}>
          {dias.map((dia, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.diaItem, esHoy(dia) && styles.diaHoy, esFechaSeleccionada(dia) && styles.diaSeleccionado]}
              onPress={() => seleccionarFecha(dia)}
              disabled={!dia}
            >
              <Text
                style={[
                  styles.diaTexto,
                  esHoy(dia) && styles.diaHoyTexto,
                  esFechaSeleccionada(dia) && styles.diaSeleccionadoTexto,
                  !dia && styles.diaVacio,
                ]}
              >
                {dia}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    )
  }

  const renderSelectorHora = () => {
    const horas = Array.from({ length: 24 }, (_, i) => i)
    const minutos = Array.from({ length: 60 }, (_, i) => i)

    return (
      <View style={styles.selectorHora}>
        <Text style={styles.tituloSelectorHora}>Seleccionar Hora</Text>

        <View style={styles.selectorHoraContainer}>
          {/* Selector de horas */}
          <View style={styles.columnaHora}>
            <Text style={styles.etiquetaHora}>Hora</Text>
            <ScrollView style={styles.listaHoras} showsVerticalScrollIndicator={false}>
              {horas.map((hora) => (
                <TouchableOpacity
                  key={hora}
                  style={[styles.itemHora, horaSeleccionada === hora && styles.itemHoraSeleccionado]}
                  onPress={() => setHoraSeleccionada(hora)}
                >
                  <Text style={[styles.textoHora, horaSeleccionada === hora && styles.textoHoraSeleccionado]}>
                    {hora.toString().padStart(2, "0")}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Selector de minutos */}
          <View style={styles.columnaHora}>
            <Text style={styles.etiquetaHora}>Minuto</Text>
            <ScrollView style={styles.listaHoras} showsVerticalScrollIndicator={false}>
              {minutos
                .filter((m) => m % 5 === 0)
                .map((minuto) => (
                  <TouchableOpacity
                    key={minuto}
                    style={[styles.itemHora, minutoSeleccionado === minuto && styles.itemHoraSeleccionado]}
                    onPress={() => setMinutoSeleccionado(minuto)}
                  >
                    <Text style={[styles.textoHora, minutoSeleccionado === minuto && styles.textoHoraSeleccionado]}>
                      {minuto.toString().padStart(2, "0")}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>

        <TouchableOpacity style={styles.botonSeleccionarHora} onPress={seleccionarHora}>
          <Text style={styles.textoBotonSeleccionarHora}>
            Seleccionar {formatearHora(horaSeleccionada, minutoSeleccionado)}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
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
                renderItem={({ item }) => <ContactoSeleccionadoItem item={item} onEliminar={handleEliminarContacto} />}
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

        {/* Campo Mensaje */}
        <View style={styles.campoContainer}>
          <Text style={styles.etiqueta}>Mensaje:</Text>
          <TextInput
            ref={textInputRef}
            style={styles.textAreaMensaje}
            value={mensaje}
            onChangeText={setMensaje}
            multiline
            numberOfLines={8}
            textAlignVertical="top"
            placeholder="Escriba su mensaje aquí..."
            placeholderTextColor="#999"
          />
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

        {/* Sección de fecha límite con calendario */}
        <View style={styles.seccionFechaLimite}>
          <Text style={styles.tituloSeccion}>Fecha límite envío de inquietudes por parte de los oferentes (*)</Text>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity style={styles.checkbox} onPress={() => setFechaLimiteHabilitada(!fechaLimiteHabilitada)}>
              {fechaLimiteHabilitada && <Ionicons name="checkmark" size={16} color="#007AFF" />}
            </TouchableOpacity>
            <Text style={styles.textoCheckbox}>¿Definir fecha límite de envío de mensajes?</Text>
          </View>

          {fechaLimiteHabilitada && (
            <View style={styles.camposFechaLimite}>
              <View style={styles.filaFechaLimite}>
                <View style={styles.campoFecha}>
                  <Text style={styles.etiquetaFecha}>Fecha límite (*)</Text>
                  <TouchableOpacity style={styles.inputFechaCalendario} onPress={() => setModalCalendario(true)}>
                    <Text style={styles.textoFechaCalendario}>{fechaLimite || "Seleccionar fecha"}</Text>
                    <Ionicons name="calendar-outline" size={20} color="#007AFF" />
                  </TouchableOpacity>
                </View>
                <View style={styles.campoHora}>
                  <Text style={styles.etiquetaFecha}>Hora límite (*)</Text>
                  <TouchableOpacity style={styles.inputFechaCalendario} onPress={() => setModalHora(true)}>
                    <Text style={styles.textoFechaCalendario}>{horaLimite}</Text>
                    <Ionicons name="time-outline" size={20} color="#007AFF" />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.filaFechaLimite}>
                <View style={styles.campoRestriccion}>
                  <Text style={styles.etiquetaFecha}>Límite restricción</Text>
                  <View style={styles.selectorRestriccion}>
                    <TouchableOpacity
                      style={[styles.opcionRestriccion, limiteRestriccion === "Sí" && styles.opcionSeleccionada]}
                      onPress={() => setLimiteRestriccion("Sí")}
                    >
                      <Text style={[styles.textoOpcion, limiteRestriccion === "Sí" && styles.textoOpcionSeleccionada]}>
                        Sí
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.opcionRestriccion,
                        limiteRestriccion === "No" && styles.opcionSeleccionada,
                        { borderRightWidth: 0 }, // Remover borde derecho del último elemento
                      ]}
                      onPress={() => setLimiteRestriccion("No")}
                    >
                      <Text style={[styles.textoOpcion, limiteRestriccion === "No" && styles.textoOpcionSeleccionada]}>
                        No
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.campoObservaciones}>
                  <Text style={styles.etiquetaFecha}>Observaciones</Text>
                  <TextInput
                    style={styles.textAreaObservaciones}
                    value={observaciones}
                    onChangeText={setObservaciones}
                    placeholder="Escriba sus observaciones aquí..."
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Modal del Calendario */}
        <Modal visible={modalCalendario} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCalendarioContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitulo}>Seleccionar Fecha</Text>
                <TouchableOpacity onPress={() => setModalCalendario(false)}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              {renderCalendario()}
              <View style={styles.modalFooter}>
                <TouchableOpacity
                  style={styles.botonModalCerrar}
                  onPress={() => {
                    setFechaLimite(formatearFecha(fechaSeleccionada))
                    setModalCalendario(false)
                  }}
                >
                  <Text style={styles.textoBotonModalCerrar}>Confirmar Fecha</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal del Selector de Hora */}
        <Modal visible={modalHora} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalHoraContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitulo}>Seleccionar Hora</Text>
                <TouchableOpacity onPress={() => setModalHora(false)}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              {renderSelectorHora()}
            </View>
          </View>
        </Modal>

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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
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
    paddingHorizontal: 10, // Añadir padding horizontal para mejor centrado en pantallas pequeñas
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
  textAreaMensaje: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#fff",
    minHeight: 150,
    fontSize: 16,
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
  inputFechaCalendario: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#fff",
  },
  textoFechaCalendario: {
    fontSize: 14,
    color: "#333",
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
  // Estilos del calendario
  modalCalendarioContainer: {
    width: "95%",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    maxHeight: "80%",
    alignSelf: "center", // Añadir esta línea
  },
  calendario: {
    padding: 16,
  },
  calendarioHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  calendarioTitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  diasSemana: {
    flexDirection: "row",
    marginBottom: 8,
  },
  diaSemana: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    paddingVertical: 8,
  },
  gridDias: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  diaItem: {
    width: "14.28%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: 4,
  },
  diaHoy: {
    backgroundColor: "#e3f2fd",
  },
  diaSeleccionado: {
    backgroundColor: "#007AFF",
  },
  diaTexto: {
    fontSize: 16,
    color: "#333",
  },
  diaHoyTexto: {
    color: "#1976d2",
    fontWeight: "600",
  },
  diaSeleccionadoTexto: {
    color: "#fff",
    fontWeight: "600",
  },
  diaVacio: {
    color: "transparent",
  },
  // Estilos del selector de hora
  modalHoraContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    maxHeight: "70%",
  },
  selectorHora: {
    padding: 16,
  },
  tituloSelectorHora: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  selectorHoraContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  columnaHora: {
    flex: 1,
    marginHorizontal: 8,
  },
  etiquetaHora: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  listaHoras: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
  itemHora: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemHoraSeleccionado: {
    backgroundColor: "#007AFF",
  },
  textoHora: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  textoHoraSeleccionado: {
    color: "#fff",
    fontWeight: "600",
  },
  botonSeleccionarHora: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  textoBotonSeleccionarHora: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  // Estilos para el selector de restricción
  selectorRestriccion: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
  },
  opcionRestriccion: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
  opcionSeleccionada: {
    backgroundColor: "#007AFF",
  },
  textoOpcion: {
    fontSize: 12,
    color: "#333",
  },
  textoOpcionSeleccionada: {
    color: "#fff",
    fontWeight: "600",
  },
  textAreaObservaciones: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#fff",
    fontSize: 12,
    minHeight: 60,
    maxHeight: 100,
  },
})
