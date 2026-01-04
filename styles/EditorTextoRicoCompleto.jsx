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
  Alert,
} from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"

const FUENTES_DISPONIBLES = [
  "System",
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier",
  "Georgia",
  "Verdana",
  "Trebuchet MS",
]

const COLORES_TEXTO = [
  "#000000",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FFA500",
  "#800080",
  "#008000",
  "#800000",
  "#000080",
  "#808080",
  "#C0C0C0",
]

const TAMANOS_FUENTE = [12, 14, 16, 18, 20, 24, 28, 32, 36]

export default function EditorTextoRicoCompleto() {
  const textInputRef = useRef(null)
  const [texto, setTexto] = useState("")
  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)

  // Estados de formato
  const [formatoActivo, setFormatoActivo] = useState({
    negrita: false,
    cursiva: false,
    subrayado: false,
    tachado: false,
    alineacion: "left",
    fuenteSeleccionada: "System",
    tamanoFuente: 16,
    colorTexto: "#000000",
  })

  // Estados de modales
  const [modalFuentes, setModalFuentes] = useState(false)
  const [modalColores, setModalColores] = useState(false)
  const [modalTamanos, setModalTamanos] = useState(false)
  const [modalEnlace, setModalEnlace] = useState(false)
  const [modalTabla, setModalTabla] = useState(false)
  const [modalAyuda, setModalAyuda] = useState(false)

  // Estados para enlaces y tablas
  const [textoEnlace, setTextoEnlace] = useState("")
  const [urlEnlace, setUrlEnlace] = useState("")
  const [filasTabla, setFilasTabla] = useState(2)
  const [columnasTabla, setColumnasTabla] = useState(2)

  const handleFormatoTexto = (tipo) => {
    if (tipo === "alineacion") {
      const alineaciones = ["left", "center", "right", "justify"]
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

    setTimeout(() => {
      textInputRef.current?.focus()
    }, 100)
  }

  const insertarTexto = (textoAInsertar) => {
    const nuevoTexto = texto.substring(0, selectionStart) + textoAInsertar + texto.substring(selectionEnd)
    setTexto(nuevoTexto)

    const nuevaPosicion = selectionStart + textoAInsertar.length
    setTimeout(() => {
      textInputRef.current?.setNativeProps({
        selection: { start: nuevaPosicion, end: nuevaPosicion },
      })
    }, 10)
  }

  const handleSelectionChange = (event) => {
    const { start, end } = event.nativeEvent.selection
    setSelectionStart(start)
    setSelectionEnd(end)
  }

  const insertarLista = (tipo) => {
    const prefijo = tipo === "numerada" ? "\n1. " : "\n• "
    insertarTexto(prefijo)
  }

  const insertarEnlace = () => {
    if (textoEnlace && urlEnlace) {
      const enlace = `[${textoEnlace}](${urlEnlace})`
      insertarTexto(enlace)
      setTextoEnlace("")
      setUrlEnlace("")
      setModalEnlace(false)
    }
  }

  const insertarTabla = () => {
    let tabla = "\n"

    // Crear encabezados
    for (let i = 0; i < columnasTabla; i++) {
      tabla += `| Columna ${i + 1} `
    }
    tabla += "|\n"

    // Crear separador
    for (let i = 0; i < columnasTabla; i++) {
      tabla += "| --- "
    }
    tabla += "|\n"

    // Crear filas
    for (let i = 0; i < filasTabla; i++) {
      for (let j = 0; j < columnasTabla; j++) {
        tabla += "| Celda "
      }
      tabla += "|\n"
    }

    insertarTexto(tabla)
    setModalTabla(false)
  }

  const getTextAlign = () => {
    switch (formatoActivo.alineacion) {
      case "center":
        return "center"
      case "right":
        return "right"
      case "justify":
        return "justify"
      default:
        return "left"
    }
  }

  const getIconoAlineacion = () => {
    switch (formatoActivo.alineacion) {
      case "center":
        return "format-align-center"
      case "right":
        return "format-align-right"
      case "justify":
        return "format-align-justify"
      default:
        return "format-align-left"
    }
  }

  const BotonHerramienta = ({ onPress, activo = false, children, style = {} }) => (
    <TouchableOpacity style={[styles.botonHerramienta, activo && styles.botonActivo, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )

  const SelectorFuente = () => (
    <TouchableOpacity style={styles.selectorFuente} onPress={() => setModalFuentes(true)}>
      <Text style={styles.textoSelectorFuente}>{formatoActivo.fuenteSeleccionada}</Text>
      <Ionicons name="chevron-down" size={12} color="#666" />
    </TouchableOpacity>
  )

  const SelectorColor = () => (
    <TouchableOpacity style={styles.selectorColor} onPress={() => setModalColores(true)}>
      <Text style={[styles.textoA, { color: formatoActivo.colorTexto }]}>A</Text>
      <View style={[styles.lineaColor, { backgroundColor: formatoActivo.colorTexto }]} />
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editorContainer}>
        {/* Barra de herramientas responsive */}
        <View style={styles.barraHerramientasResponsive}>
          {/* Primera fila - Formato básico */}
          <View style={styles.filaHerramientas}>
            <BotonHerramienta onPress={() => Alert.alert("Formato", "Limpiar formato")} style={styles.botonPequeno}>
              <MaterialIcons name="format-clear" size={14} color="#666" />
            </BotonHerramienta>

            <BotonHerramienta
              onPress={() => handleFormatoTexto("negrita")}
              activo={formatoActivo.negrita}
              style={styles.botonPequeno}
            >
              <Text style={styles.textoHerramientaNegrita}>B</Text>
            </BotonHerramienta>

            <BotonHerramienta
              onPress={() => handleFormatoTexto("cursiva")}
              activo={formatoActivo.cursiva}
              style={styles.botonPequeno}
            >
              <Text style={styles.textoHerramientaCursiva}>I</Text>
            </BotonHerramienta>

            <BotonHerramienta
              onPress={() => handleFormatoTexto("subrayado")}
              activo={formatoActivo.subrayado}
              style={styles.botonPequeno}
            >
              <Text style={styles.textoHerramientaSubrayado}>U</Text>
            </BotonHerramienta>

            <BotonHerramienta
              onPress={() => handleFormatoTexto("tachado")}
              activo={formatoActivo.tachado}
              style={styles.botonPequeno}
            >
              <Text style={styles.textoHerramientaTachado}>S</Text>
            </BotonHerramienta>

            {/* Selector de fuente responsive */}
            <TouchableOpacity style={styles.selectorFuenteResponsive} onPress={() => setModalFuentes(true)}>
              <Text style={styles.textoSelectorFuenteResponsive} numberOfLines={1}>
                {formatoActivo.fuenteSeleccionada.length > 8
                  ? formatoActivo.fuenteSeleccionada.substring(0, 8) + "..."
                  : formatoActivo.fuenteSeleccionada}
              </Text>
              <Ionicons name="chevron-down" size={10} color="#666" />
            </TouchableOpacity>

            {/* Selector de color responsive */}
            <TouchableOpacity style={styles.selectorColorResponsive} onPress={() => setModalColores(true)}>
              <Text style={[styles.textoAResponsive, { color: formatoActivo.colorTexto }]}>A</Text>
              <View style={[styles.lineaColorResponsive, { backgroundColor: formatoActivo.colorTexto }]} />
            </TouchableOpacity>
          </View>

          {/* Segunda fila - Listas y alineación */}
          <View style={styles.filaHerramientas}>
            <BotonHerramienta onPress={() => insertarLista("viñetas")} style={styles.botonPequeno}>
              <MaterialIcons name="format-list-bulleted" size={14} color="#666" />
            </BotonHerramienta>

            <BotonHerramienta onPress={() => insertarLista("numerada")} style={styles.botonPequeno}>
              <MaterialIcons name="format-list-numbered" size={14} color="#666" />
            </BotonHerramienta>

            <BotonHerramienta onPress={() => handleFormatoTexto("alineacion")} style={styles.botonPequeno}>
              <MaterialIcons name={getIconoAlineacion()} size={14} color="#666" />
            </BotonHerramienta>

            <BotonHerramienta onPress={() => setModalTabla(true)} style={styles.botonPequeno}>
              <MaterialIcons name="table-chart" size={14} color="#666" />
            </BotonHerramienta>

            <BotonHerramienta onPress={() => setModalEnlace(true)} style={styles.botonPequeno}>
              <MaterialIcons name="link" size={14} color="#666" />
            </BotonHerramienta>

            <BotonHerramienta onPress={() => Alert.alert("Imagen", "Insertar imagen")} style={styles.botonPequeno}>
              <MaterialIcons name="image" size={14} color="#666" />
            </BotonHerramienta>

            <BotonHerramienta onPress={() => insertarTexto("    ")} style={styles.botonPequeno}>
              <MaterialIcons name="format-indent-increase" size={14} color="#666" />
            </BotonHerramienta>

            <BotonHerramienta onPress={() => Alert.alert("Código", "Insertar código")} style={styles.botonPequeno}>
              <MaterialIcons name="code" size={14} color="#666" />
            </BotonHerramienta>

            <BotonHerramienta onPress={() => setModalAyuda(true)} style={styles.botonPequeno}>
              <MaterialIcons name="help-outline" size={14} color="#666" />
            </BotonHerramienta>
          </View>
        </View>

        {/* Área de texto */}
        <TextInput
          ref={textInputRef}
          style={[
            styles.textArea,
            {
              fontWeight: formatoActivo.negrita ? "bold" : "normal",
              fontStyle: formatoActivo.cursiva ? "italic" : "normal",
              textDecorationLine:
                formatoActivo.subrayado && formatoActivo.tachado
                  ? "underline line-through"
                  : formatoActivo.subrayado
                    ? "underline"
                    : formatoActivo.tachado
                      ? "line-through"
                      : "none",
              textAlign: getTextAlign(),
              fontFamily: formatoActivo.fuenteSeleccionada,
              fontSize: formatoActivo.tamanoFuente,
              color: formatoActivo.colorTexto,
            },
          ]}
          value={texto}
          onChangeText={setTexto}
          onSelectionChange={handleSelectionChange}
          multiline
          placeholder="Comienza a escribir tu texto aquí..."
          placeholderTextColor="#999"
          textAlignVertical="top"
        />

        {/* Información de estado */}
        <View style={styles.barraEstado}>
          <Text style={styles.textoEstado}>
            Caracteres: {texto.length} | Formato: {formatoActivo.fuenteSeleccionada} {formatoActivo.tamanoFuente}px
          </Text>
        </View>
      </View>

      {/* Modal de Fuentes */}
      <Modal visible={modalFuentes} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Seleccionar Fuente</Text>
              <TouchableOpacity onPress={() => setModalFuentes(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={FUENTES_DISPONIBLES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.itemModal, formatoActivo.fuenteSeleccionada === item && styles.itemSeleccionado]}
                  onPress={() => {
                    setFormatoActivo((prev) => ({ ...prev, fuenteSeleccionada: item }))
                    setModalFuentes(false)
                  }}
                >
                  <Text style={[styles.textoItemModal, { fontFamily: item }]}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Modal de Colores */}
      <Modal visible={modalColores} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Seleccionar Color</Text>
              <TouchableOpacity onPress={() => setModalColores(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.paletaColores}>
              {COLORES_TEXTO.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorItem,
                    { backgroundColor: color },
                    formatoActivo.colorTexto === color && styles.colorSeleccionado,
                  ]}
                  onPress={() => {
                    setFormatoActivo((prev) => ({ ...prev, colorTexto: color }))
                    setModalColores(false)
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Enlaces */}
      <Modal visible={modalEnlace} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Insertar Enlace</Text>
              <TouchableOpacity onPress={() => setModalEnlace(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.etiquetaModal}>Texto del enlace:</Text>
              <TextInput
                style={styles.inputModal}
                value={textoEnlace}
                onChangeText={setTextoEnlace}
                placeholder="Texto a mostrar"
              />
              <Text style={styles.etiquetaModal}>URL:</Text>
              <TextInput
                style={styles.inputModal}
                value={urlEnlace}
                onChangeText={setUrlEnlace}
                placeholder="https://ejemplo.com"
                keyboardType="url"
              />
              <TouchableOpacity style={styles.botonModal} onPress={insertarEnlace}>
                <Text style={styles.textoBotonModal}>Insertar Enlace</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Tabla */}
      <Modal visible={modalTabla} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Insertar Tabla</Text>
              <TouchableOpacity onPress={() => setModalTabla(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <Text style={styles.etiquetaModal}>Filas: {filasTabla}</Text>
              <View style={styles.sliderContainer}>
                <TouchableOpacity onPress={() => setFilasTabla(Math.max(1, filasTabla - 1))}>
                  <Ionicons name="remove-circle" size={24} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.valorSlider}>{filasTabla}</Text>
                <TouchableOpacity onPress={() => setFilasTabla(Math.min(10, filasTabla + 1))}>
                  <Ionicons name="add-circle" size={24} color="#007AFF" />
                </TouchableOpacity>
              </View>

              <Text style={styles.etiquetaModal}>Columnas: {columnasTabla}</Text>
              <View style={styles.sliderContainer}>
                <TouchableOpacity onPress={() => setColumnasTabla(Math.max(1, columnasTabla - 1))}>
                  <Ionicons name="remove-circle" size={24} color="#007AFF" />
                </TouchableOpacity>
                <Text style={styles.valorSlider}>{columnasTabla}</Text>
                <TouchableOpacity onPress={() => setColumnasTabla(Math.min(10, columnasTabla + 1))}>
                  <Ionicons name="add-circle" size={24} color="#007AFF" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.botonModal} onPress={insertarTabla}>
                <Text style={styles.textoBotonModal}>Insertar Tabla</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Ayuda */}
      <Modal visible={modalAyuda} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Ayuda del Editor</Text>
              <TouchableOpacity onPress={() => setModalAyuda(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              <Text style={styles.tituloAyuda}>Atajos de teclado:</Text>
              <Text style={styles.textoAyuda}>• Negrita: Ctrl+B</Text>
              <Text style={styles.textoAyuda}>• Cursiva: Ctrl+I</Text>
              <Text style={styles.textoAyuda}>• Subrayado: Ctrl+U</Text>

              <Text style={styles.tituloAyuda}>Formato de enlaces:</Text>
              <Text style={styles.textoAyuda}>[Texto](URL)</Text>

              <Text style={styles.tituloAyuda}>Listas:</Text>
              <Text style={styles.textoAyuda}>• Para viñetas</Text>
              <Text style={styles.textoAyuda}>1. Para numeradas</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  editorContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  barraHerramientas: {
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    maxHeight: 50,
  },
  grupoHerramientas: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  botonHerramienta: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    minWidth: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  botonActivo: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  textoHerramientaNegrita: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  textoHerramientaCursiva: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#333",
  },
  textoHerramientaSubrayado: {
    fontSize: 14,
    textDecorationLine: "underline",
    color: "#333",
  },
  textoHerramientaTachado: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#333",
  },
  separador: {
    width: 1,
    height: 24,
    backgroundColor: "#ddd",
    marginHorizontal: 4,
  },
  selectorFuente: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    minWidth: 80,
  },
  textoSelectorFuente: {
    fontSize: 12,
    color: "#333",
    marginRight: 4,
  },
  selectorColor: {
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    minWidth: 32,
  },
  textoA: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lineaColor: {
    width: 20,
    height: 3,
    marginTop: 2,
  },
  textArea: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: "top",
  },
  barraEstado: {
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  textoEstado: {
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
  modalContent: {
    padding: 16,
  },
  itemModal: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemSeleccionado: {
    backgroundColor: "#e3f2fd",
  },
  textoItemModal: {
    fontSize: 16,
    color: "#333",
  },
  paletaColores: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 16,
    justifyContent: "space-between",
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 4,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  colorSeleccionado: {
    borderColor: "#007AFF",
    borderWidth: 3,
  },
  etiquetaModal: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    marginTop: 16,
  },
  inputModal: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  botonModal: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  textoBotonModal: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  valorSlider: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: "center",
  },
  tituloAyuda: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  textoAyuda: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    lineHeight: 20,
  },
  // Estilos responsive para la barra de herramientas
  barraHerramientasResponsive: {
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  filaHerramientas: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginBottom: 4,
    paddingHorizontal: 2,
  },
  botonPequeno: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginHorizontal: 1,
    marginVertical: 1,
    borderRadius: 3,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    minWidth: 28,
    minHeight: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  selectorFuenteResponsive: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    minWidth: 60,
    maxWidth: 80,
    marginHorizontal: 1,
    marginVertical: 1,
  },
  textoSelectorFuenteResponsive: {
    fontSize: 10,
    color: "#333",
    marginRight: 2,
    flex: 1,
  },
  selectorColorResponsive: {
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 2,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    minWidth: 28,
    minHeight: 28,
    marginHorizontal: 1,
    marginVertical: 1,
    justifyContent: "center",
  },
  textoAResponsive: {
    fontSize: 12,
    fontWeight: "bold",
  },
  lineaColorResponsive: {
    width: 16,
    height: 2,
    marginTop: 1,
  },
})
