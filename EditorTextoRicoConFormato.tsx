"use client"

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

// Estructura para representar fragmentos de texto con formato
interface FragmentoTexto {
  texto: string
  formato: {
    negrita: boolean
    cursiva: boolean
    subrayado: boolean
    tachado: boolean
    color: string
    fuente: string
    tamano: number
  }
}

export default function EditorTextoRicoConFormato() {
  const textInputRef = useRef(null)
  const [textoPlano, setTextoPlano] = useState("")
  const [fragmentos, setFragmentos] = useState<FragmentoTexto[]>([
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
  const [modoVisualizacion, setModoVisualizacion] = useState(false) // false = edición, true = vista previa

  // Estados de formato activo para texto nuevo
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
  const [modalEnlace, setModalEnlace] = useState(false)
  const [modalTabla, setModalTabla] = useState(false)
  const [modalAyuda, setModalAyuda] = useState(false)

  // Estados para enlaces y tablas
  const [textoEnlace, setTextoEnlace] = useState("")
  const [urlEnlace, setUrlEnlace] = useState("")
  const [filasTabla, setFilasTabla] = useState(2)
  const [columnasTabla, setColumnasTabla] = useState(2)

  const aplicarFormatoASeleccion = useCallback(
    (tipoFormato: string, valor?: any) => {
      if (selectionStart === selectionEnd) {
        // No hay selección, aplicar formato al texto que se escriba
        setFormatoActivo((prev) => {
          if (tipoFormato === "alineacion") {
            const alineaciones = ["left", "center", "right", "justify"]
            const currentIndex = alineaciones.indexOf(prev.alineacion)
            const nextIndex = (currentIndex + 1) % alineaciones.length
            return { ...prev, alineacion: alineaciones[nextIndex] }
          } else if (tipoFormato === "colorTexto") {
            return { ...prev, colorTexto: valor }
          } else if (tipoFormato === "fuenteSeleccionada") {
            return { ...prev, fuenteSeleccionada: valor }
          } else {
            return { ...prev, [tipoFormato]: !prev[tipoFormato] }
          }
        })
      } else {
        // Hay selección, aplicar formato solo al texto seleccionado
        aplicarFormatoATextoSeleccionado(tipoFormato, valor)
      }
    },
    [selectionStart, selectionEnd],
  )

  const aplicarFormatoATextoSeleccionado = (tipoFormato: string, valor?: any) => {
    const textoSeleccionado = textoPlano.substring(selectionStart, selectionEnd)
    const antesSeleccion = textoPlano.substring(0, selectionStart)
    const despuesSeleccion = textoPlano.substring(selectionEnd)

    // Crear nuevo fragmento con formato aplicado
    const nuevoFormato = { ...formatoActivo }

    if (tipoFormato === "colorTexto") {
      nuevoFormato.colorTexto = valor
    } else if (tipoFormato === "fuenteSeleccionada") {
      nuevoFormato.fuenteSeleccionada = valor
    } else {
      nuevoFormato[tipoFormato] = !nuevoFormato[tipoFormato]
    }

    // Actualizar fragmentos
    const nuevosFragmentos: FragmentoTexto[] = []

    if (antesSeleccion) {
      nuevosFragmentos.push({
        texto: antesSeleccion,
        formato: {
          negrita: false,
          cursiva: false,
          subrayado: false,
          tachado: false,
          color: "#000000",
          fuente: "System",
          tamano: 16,
        },
      })
    }

    if (textoSeleccionado) {
      nuevosFragmentos.push({
        texto: textoSeleccionado,
        formato: {
          negrita: nuevoFormato.negrita,
          cursiva: nuevoFormato.cursiva,
          subrayado: nuevoFormato.subrayado,
          tachado: nuevoFormato.tachado,
          color: nuevoFormato.colorTexto,
          fuente: nuevoFormato.fuenteSeleccionada,
          tamano: nuevoFormato.tamanoFuente,
        },
      })
    }

    if (despuesSeleccion) {
      nuevosFragmentos.push({
        texto: despuesSeleccion,
        formato: {
          negrita: false,
          cursiva: false,
          subrayado: false,
          tachado: false,
          color: "#000000",
          fuente: "System",
          tamano: 16,
        },
      })
    }

    setFragmentos(nuevosFragmentos)
  }

  const handleCambioTexto = (nuevoTexto: string) => {
    setTextoPlano(nuevoTexto)

    // Si se está escribiendo texto nuevo (no hay selección), aplicar formato activo
    if (nuevoTexto.length > textoPlano.length && selectionStart === selectionEnd) {
      const textoNuevo = nuevoTexto.substring(textoPlano.length)
      const antesTexto = nuevoTexto.substring(0, textoPlano.length)

      const nuevosFragmentos: FragmentoTexto[] = []

      if (antesTexto) {
        // Mantener fragmentos existentes para el texto anterior
        let posicionActual = 0
        fragmentos.forEach((fragmento) => {
          if (posicionActual < antesTexto.length) {
            const finFragmento = Math.min(posicionActual + fragmento.texto.length, antesTexto.length)
            if (finFragmento > posicionActual) {
              nuevosFragmentos.push({
                ...fragmento,
                texto: antesTexto.substring(posicionActual, finFragmento),
              })
            }
            posicionActual = finFragmento
          }
        })
      }

      // Agregar nuevo texto con formato activo
      if (textoNuevo) {
        nuevosFragmentos.push({
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
        })
      }

      setFragmentos(nuevosFragmentos)
    }
  }

  const handleSelectionChange = (event) => {
    const { start, end } = event.nativeEvent.selection
    setSelectionStart(start)
    setSelectionEnd(end)

    // Si hay selección, actualizar formato activo basado en el texto seleccionado
    if (start !== end) {
      // Aquí podrías implementar lógica para detectar el formato del texto seleccionado
      // y actualizar formatoActivo en consecuencia
    }
  }

  const insertarTexto = (textoAInsertar: string) => {
    const nuevoTexto = textoPlano.substring(0, selectionStart) + textoAInsertar + textoPlano.substring(selectionEnd)
    setTextoPlano(nuevoTexto)

    // Insertar con formato activo
    const nuevosFragmentos: FragmentoTexto[] = []
    const antesInsercion = textoPlano.substring(0, selectionStart)
    const despuesInsercion = textoPlano.substring(selectionEnd)

    if (antesInsercion) {
      let posicionActual = 0
      fragmentos.forEach((fragmento) => {
        if (posicionActual < antesInsercion.length) {
          const finFragmento = Math.min(posicionActual + fragmento.texto.length, antesInsercion.length)
          if (finFragmento > posicionActual) {
            nuevosFragmentos.push({
              ...fragmento,
              texto: antesInsercion.substring(posicionActual, finFragmento),
            })
          }
          posicionActual = finFragmento
        }
      })
    }

    // Texto insertado con formato activo
    nuevosFragmentos.push({
      texto: textoAInsertar,
      formato: {
        negrita: formatoActivo.negrita,
        cursiva: formatoActivo.cursiva,
        subrayado: formatoActivo.subrayado,
        tachado: formatoActivo.tachado,
        color: formatoActivo.colorTexto,
        fuente: formatoActivo.fuenteSeleccionada,
        tamano: formatoActivo.tamanoFuente,
      },
    })

    if (despuesInsercion) {
      nuevosFragmentos.push({
        texto: despuesInsercion,
        formato: {
          negrita: false,
          cursiva: false,
          subrayado: false,
          tachado: false,
          color: "#000000",
          fuente: "System",
          tamano: 16,
        },
      })
    }

    setFragmentos(nuevosFragmentos)

    const nuevaPosicion = selectionStart + textoAInsertar.length
    setTimeout(() => {
      textInputRef.current?.setNativeProps({
        selection: { start: nuevaPosicion, end: nuevaPosicion },
      })
    }, 10)
  }

  const insertarLista = (tipo: string) => {
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
    for (let i = 0; i < columnasTabla; i++) {
      tabla += `| Columna ${i + 1} `
    }
    tabla += "|\n"
    for (let i = 0; i < columnasTabla; i++) {
      tabla += "| --- "
    }
    tabla += "|\n"
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

  const renderTextoConFormato = () => {
    return (
      <View style={styles.vistaPrevia}>
        {fragmentos.map((fragmento, index) => (
          <Text
            key={index}
            style={[
              styles.textoFormateado,
              {
                fontWeight: fragmento.formato.negrita ? "bold" : "normal",
                fontStyle: fragmento.formato.cursiva ? "italic" : "normal",
                textDecorationLine:
                  fragmento.formato.subrayado && fragmento.formato.tachado
                    ? "underline line-through"
                    : fragmento.formato.subrayado
                      ? "underline"
                      : fragmento.formato.tachado
                        ? "line-through"
                        : "none",
                color: fragmento.formato.color,
                fontFamily: fragmento.formato.fuente,
                fontSize: fragmento.formato.tamano,
              },
            ]}
          >
            {fragmento.texto}
          </Text>
        ))}
      </View>
    )
  }

  const BotonHerramienta = ({ onPress, activo = false, children, style = {} }) => (
    <TouchableOpacity style={[styles.botonHerramienta, activo && styles.botonActivo, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.editorContainer}>
        {/* Barra de herramientas responsive */}
        <View style={styles.barraHerramientasResponsive}>
          {/* Primera fila - Formato básico */}
          <View style={styles.filaHerramientas}>
            <BotonHerramienta
              onPress={() => setModoVisualizacion(!modoVisualizacion)}
              style={styles.botonPequeno}
              activo={modoVisualizacion}
            >
              <MaterialIcons name={modoVisualizacion ? "edit" : "visibility"} size={14} color="#666" />
            </BotonHerramienta>

            <BotonHerramienta onPress={() => Alert.alert("Formato", "Limpiar formato")} style={styles.botonPequeno}>
              <MaterialIcons name="format-clear" size={14} color="#666" />
            </BotonHerramienta>

            <BotonHerramienta
              onPress={() => aplicarFormatoASeleccion("negrita")}
              activo={formatoActivo.negrita}
              style={styles.botonPequeno}
            >
              <Text style={styles.textoHerramientaNegrita}>B</Text>
            </BotonHerramienta>

            <BotonHerramienta
              onPress={() => aplicarFormatoASeleccion("cursiva")}
              activo={formatoActivo.cursiva}
              style={styles.botonPequeno}
            >
              <Text style={styles.textoHerramientaCursiva}>I</Text>
            </BotonHerramienta>

            <BotonHerramienta
              onPress={() => aplicarFormatoASeleccion("subrayado")}
              activo={formatoActivo.subrayado}
              style={styles.botonPequeno}
            >
              <Text style={styles.textoHerramientaSubrayado}>U</Text>
            </BotonHerramienta>

            <BotonHerramienta
              onPress={() => aplicarFormatoASeleccion("tachado")}
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

            <BotonHerramienta onPress={() => aplicarFormatoASeleccion("alineacion")} style={styles.botonPequeno}>
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

            <BotonHerramienta onPress={() => setModalAyuda(true)} style={styles.botonPequeno}>
              <MaterialIcons name="help-outline" size={14} color="#666" />
            </BotonHerramienta>
          </View>
        </View>

        {/* Información de selección */}
        {selectionStart !== selectionEnd && (
          <View style={styles.infoSeleccion}>
            <Text style={styles.textoInfoSeleccion}>
              Seleccionado: {selectionEnd - selectionStart} caracteres | Posición: {selectionStart}-{selectionEnd}
            </Text>
          </View>
        )}

        {/* Área de texto o vista previa */}
        {modoVisualizacion ? (
          <ScrollView style={styles.areaVisualizacion}>{renderTextoConFormato()}</ScrollView>
        ) : (
          <TextInput
            ref={textInputRef}
            style={[
              styles.textArea,
              {
                textAlign: getTextAlign(),
              },
            ]}
            value={textoPlano}
            onChangeText={handleCambioTexto}
            onSelectionChange={handleSelectionChange}
            multiline
            placeholder="Comienza a escribir tu texto aquí... Selecciona texto para aplicar formato específico."
            placeholderTextColor="#999"
            textAlignVertical="top"
          />
        )}

        {/* Información de estado */}
        <View style={styles.barraEstado}>
          <Text style={styles.textoEstado}>
            Caracteres: {textoPlano.length} | Fragmentos: {fragmentos.length} | Formato activo:{" "}
            {formatoActivo.negrita ? "B " : ""}
            {formatoActivo.cursiva ? "I " : ""}
            {formatoActivo.subrayado ? "U " : ""}
            {formatoActivo.fuenteSeleccionada} {formatoActivo.tamanoFuente}px
          </Text>
        </View>
      </View>

      {/* Modales (mismos que antes) */}
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
                    aplicarFormatoASeleccion("fuenteSeleccionada", item)
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
                    aplicarFormatoASeleccion("colorTexto", color)
                    setModalColores(false)
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Resto de modales igual que antes... */}
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
  botonHerramienta: {
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
  infoSeleccion: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  textoInfoSeleccion: {
    fontSize: 12,
    color: "#1976d2",
    fontWeight: "500",
  },
  textArea: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: "top",
    fontFamily: "System",
  },
  areaVisualizacion: {
    flex: 1,
    padding: 16,
  },
  vistaPrevia: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  textoFormateado: {
    fontSize: 16,
    lineHeight: 24,
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
})
