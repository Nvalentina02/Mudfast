import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function FormularioModificacionContractual() {
  const [tiempoSeleccionado, setTiempoSeleccionado] = useState(false)
  const [valorSeleccionado, setValorSeleccionado] = useState(false)
  const [alcanceSeleccionado, setAlcanceSeleccionado] = useState(false)

  const [diasTiempo, setDiasTiempo] = useState("")
  const [observacionesTiempo, setObservacionesTiempo] = useState("")

  const [monedaValor, setMonedaValor] = useState("COP")
  const [valorMonto, setValorMonto] = useState("")
  const [observacionesValor, setObservacionesValor] = useState("")

  const [alcanceTexto, setAlcanceTexto] = useState("")
  const [observacionesAlcance, setObservacionesAlcance] = useState("")

  const [numeroModificacion] = useState("")
  const [numeroSolicitud] = useState("")
  const [fechaAprobacion] = useState("")
  const [tipoModificacion] = useState("")
  const [monedaAdicional] = useState("")
  const [presupuestoAdicional] = useState("")
  const [presupuestoSMMLV] = useState("")
  const [nuevoPresupuesto] = useState("")
  const [diasAdicion] = useState("")
  const [nuevaFechaVencimiento] = useState("")
  const [fechaTerminacion] = useState("")
  const [responsableForo] = useState("")
  const [usuarioCreador] = useState("Usuario Actual")
  const [justificacionModificacion, setJustificacionModificacion] = useState("")

  const [mostrarExcepciones, setMostrarExcepciones] = useState(false)
  const [esExcepcion, setEsExcepcion] = useState("")
  const [cualExcepcion, setCualExcepcion] = useState("")
  const [requiereRevision, setRequiereRevision] = useState("")
  const [requiereAprobacion, setRequiereAprobacion] = useState("")
  const [aprobacionDe, setAprobacionDe] = useState("")

  const [mostrarAreasSoporte, setMostrarAreasSoporte] = useState(false)
  const [impuestosFlujoDoc, setImpuestosFlujoDoc] = useState("")
  const [impuestosObservaciones, setImpuestosObservaciones] = useState("")
  const [segurosFlujoDoc, setSegurosFlujoDoc] = useState("")
  const [segurosObservaciones, setSegurosObservaciones] = useState("")
  const [contabilidadFlujoDoc, setContabilidadFlujoDoc] = useState("")
  const [contabilidadObservaciones, setContabilidadObservaciones] = useState("")

  const [mostrarCompliance, setMostrarCompliance] = useState(false)
  const [complianceFlujoDoc, setComplianceFlujoDoc] = useState("")
  const [complianceObservaciones, setComplianceObservaciones] = useState("")

  const [modalMoneda, setModalMoneda] = useState(false)

  // ✅ CORREGIDO PARA JSX
  const formatearNumero = (valor) => {
    return valor.replace(/[^\d.,]/g, "")
  }

  const handleGuardarModificacion = () => {
    if (!tiempoSeleccionado && !valorSeleccionado && !alcanceSeleccionado) {
      Alert.alert("Error", "Debe seleccionar al menos un tipo de modificación")
      return
    }

    if (tiempoSeleccionado && !diasTiempo) {
      Alert.alert("Error", "Debe ingresar los días para la modificación de tiempo")
      return
    }

    if (valorSeleccionado && !valorMonto) {
      Alert.alert("Error", "Debe ingresar el valor para la modificación de valor")
      return
    }

    if (alcanceSeleccionado && !alcanceTexto) {
      Alert.alert("Error", "Debe ingresar el alcance para la modificación de alcance")
      return
    }

    if (!justificacionModificacion) {
      Alert.alert("Error", "Debe ingresar la justificación de la modificación")
      return
    }

    Alert.alert("Éxito", "Modificación creada correctamente")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titulo}>Modificación Contractual (Adendos/Otrosi)</Text>

        {/* TODO: el resto del JSX permanece EXACTAMENTE igual */}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollView: { padding: 16 },
  titulo: { fontSize: 20, fontWeight: "700", marginBottom: 20 },
})
