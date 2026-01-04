import { useState, useRef, useCallback } from "react"
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

export default function EditorTextoRicoConFormato() {
  const textInputRef = useRef(null)
  const [textoPlano, setTextoPlano] = useState("")
  const [fragmentos, setFragmentos] = useState([
    {
      texto: "",
      formato: {
        negrita: false,
        cursiva: false,
        subrayado: false,
        tachado: false,
        color: "#000000",
        fuente: "System",
        tamano: 16,
      },
    },
  ])

  const [selectionStart, setSelectionStart] = useState(0)
  const [selectionEnd, setSelectionEnd] = useState(0)
  const [modoVisualizacion, setModoVisualizacion] = useState(false)

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

  const [modalFuentes, setModalFuentes] = useState(false)
  const [modalColores, setModalColores] = useState(false)
  const [modalEnlace, setModalEnlace] = useState(false)
  const [modalTabla, setModalTabla] = useState(false)
  const [modalAyuda, setModalAyuda] = useState(false)

  const [textoEnlace, setTextoEnlace] = useState("")
  const [urlEnlace, setUrlEnlace] = useState("")
  const [filasTabla, setFilasTabla] = useState(2)
  const [columnasTabla, setColumnasTabla] = useState(2)

  const aplicarFormatoASeleccion = useCallback((tipoFormato, valor) => {
    if (selectionStart === selectionEnd) {
      setFormatoActivo((prev) => {
        if (tipoFormato === "alineacion") {
          const alineaciones = ["left", "center", "right", "justify"]
          const i = alineaciones.indexOf(prev.alineacion)
          return { ...prev, alineacion: alineaciones[(i + 1) % alineaciones.length] }
        }
        if (tipoFormato === "colorTexto") return { ...prev, colorTexto: valor }
        if (tipoFormato === "fuenteSeleccionada") return { ...prev, fuenteSeleccionada: valor }
        return { ...prev, [tipoFormato]: !prev[tipoFormato] }
      })
    }
  }, [selectionStart, selectionEnd])

  const handleCambioTexto = (nuevoTexto) => {
    setTextoPlano(nuevoTexto)
    if (nuevoTexto.length > textoPlano.length && selectionStart === selectionEnd) {
      const textoNuevo = nuevoTexto.substring(textoPlano.length)
      setFragmentos((prev) => [
        ...prev,
        {
          texto: textoNuevo,
          formato: {
            negrita: formatoActivo.negrita,
            cursiva: formatoActivo.cursiva,
            subrayado: formatoActivo.subrayado,
            tachado: formatoActivo.tachado,
            color: formatoActivo.colorTexto,
            fuente: formatoActivo.fuenteSeleccionada,
            tamano: formatoActivo.tamanoFuente,
          },
        },
      ])
    }
  }

  const handleSelectionChange = (e) => {
    setSelectionStart(e.nativeEvent.selection.start)
    setSelectionEnd(e.nativeEvent.selection.end)
  }

  const insertarTexto = (texto) => {
    const nuevoTexto =
      textoPlano.substring(0, selectionStart) +
      texto +
      textoPlano.substring(selectionEnd)

    setTextoPlano(nuevoTexto)
  }

  const insertarLista = (tipo) => {
    insertarTexto(tipo === "numerada" ? "\n1. " : "\n• ")
  }

  const getTextAlign = () => {
    if (formatoActivo.alineacion === "center") return "center"
    if (formatoActivo.alineacion === "right") return "right"
    if (formatoActivo.alineacion === "justify") return "justify"
    return "left"
  }

  const getIconoAlineacion = () => {
    if (formatoActivo.alineacion === "center") return "format-align-center"
    if (formatoActivo.alineacion === "right") return "format-align-right"
    if (formatoActivo.alineacion === "justify") return "format-align-justify"
    return "format-align-left"
  }

  const renderTextoConFormato = () => (
    <View style={styles.vistaPrevia}>
      {fragmentos.map((f, i) => (
        <Text
          key={i}
          style={{
            fontWeight: f.formato.negrita ? "bold" : "normal",
            fontStyle: f.formato.cursiva ? "italic" : "normal",
            textDecorationLine:
              f.formato.subrayado && f.formato.tachado
                ? "underline line-through"
                : f.formato.subrayado
                ? "underline"
                : f.formato.tachado
                ? "line-through"
                : "none",
            color: f.formato.color,
            fontFamily: f.formato.fuente,
            fontSize: f.formato.tamano,
          }}
        >
          {f.texto}
        </Text>
      ))}
    </View>
  )

  const BotonHerramienta = ({ onPress, activo, children }) => (
    <TouchableOpacity
      style={[styles.botonHerramienta, activo && styles.botonActivo]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editorContainer}>
        <View style={styles.barraHerramientasResponsive}>
          <View style={styles.filaHerramientas}>
            <BotonHerramienta onPress={() => setModoVisualizacion(!modoVisualizacion)}>
              <MaterialIcons name={modoVisualizacion ? "edit" : "visibility"} size={14} />
            </BotonHerramienta>

            <BotonHerramienta onPress={() => aplicarFormatoASeleccion("negrita")}>
              <Text style={styles.textoHerramientaNegrita}>B</Text>
            </BotonHerramienta>

            <BotonHerramienta onPress={() => aplicarFormatoASeleccion("cursiva")}>
              <Text style={styles.textoHerramientaCursiva}>I</Text>
            </BotonHerramienta>
          </View>
        </View>

        {modoVisualizacion ? (
          <ScrollView>{renderTextoConFormato()}</ScrollView>
        ) : (
          <TextInput
            ref={textInputRef}
            style={[styles.textArea, { textAlign: getTextAlign() }]}
            value={textoPlano}
            onChangeText={handleCambioTexto}
            onSelectionChange={handleSelectionChange}
            multiline
          />
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  editorContainer: { flex: 1, backgroundColor: "#fff", margin: 10, borderRadius: 8 },
  barraHerramientasResponsive: { backgroundColor: "#f8f8f8" },
  filaHerramientas: { flexDirection: "row", flexWrap: "wrap" },
  botonHerramienta: {
    padding: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    margin: 2,
  },
  botonActivo: { backgroundColor: "#007AFF" },
  textoHerramientaNegrita: { fontWeight: "bold" },
  textoHerramientaCursiva: { fontStyle: "italic" },
  textArea: { flex: 1, padding: 16, fontSize: 16 },
  vistaPrevia: { flexDirection: "row", flexWrap: "wrap" },
})
