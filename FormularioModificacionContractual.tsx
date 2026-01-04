"use client"

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
  // Estados para los tipos de modificación
  const [tiempoSeleccionado, setTiempoSeleccionado] = useState(false)
  const [valorSeleccionado, setValorSeleccionado] = useState(false)
  const [alcanceSeleccionado, setAlcanceSeleccionado] = useState(false)

  // Estados para Tiempo
  const [diasTiempo, setDiasTiempo] = useState("")
  const [observacionesTiempo, setObservacionesTiempo] = useState("")

  // Estados para Valor
  const [monedaValor, setMonedaValor] = useState("COP")
  const [valorMonto, setValorMonto] = useState("")
  const [observacionesValor, setObservacionesValor] = useState("")

  // Estados para Alcance
  const [alcanceTexto, setAlcanceTexto] = useState("")
  const [observacionesAlcance, setObservacionesAlcance] = useState("")

  // Estados para campos de modificación
  const [numeroModificacion, setNumeroModificacion] = useState("")
  const [numeroSolicitud, setNumeroSolicitud] = useState("")
  const [fechaAprobacion, setFechaAprobacion] = useState("")
  const [tipoModificacion, setTipoModificacion] = useState("")
  const [monedaAdicional, setMonedaAdicional] = useState("")
  const [presupuestoAdicional, setPresupuestoAdicional] = useState("")
  const [presupuestoSMMLV, setPresupuestoSMMLV] = useState("")
  const [nuevoPresupuesto, setNuevoPresupuesto] = useState("")
  const [diasAdicion, setDiasAdicion] = useState("")
  const [nuevaFechaVencimiento, setNuevaFechaVencimiento] = useState("")
  const [fechaTerminacion, setFechaTerminacion] = useState("")
  const [alcanceCampo, setAlcanceCampo] = useState("")
  const [responsableForo, setResponsableForo] = useState("")
  const [usuarioCreador, setUsuarioCreador] = useState("Usuario Actual")
  const [justificacionModificacion, setJustificacionModificacion] = useState("")

  // Estados para flujo de excepciones
  const [mostrarExcepciones, setMostrarExcepciones] = useState(false)
  const [esExcepcion, setEsExcepcion] = useState("")
  const [cualExcepcion, setCualExcepcion] = useState("")
  const [requiereRevision, setRequiereRevision] = useState("")
  const [revisionDe, setRevisionDe] = useState("")
  const [requiereAprobacion, setRequiereAprobacion] = useState("")
  const [aprobacionDe, setAprobacionDe] = useState("")

  // Estados para áreas de soporte
  const [mostrarAreasSoporte, setMostrarAreasSoporte] = useState(false)
  const [impuestosFlujoDoc, setImpuestosFlujoDoc] = useState("")
  const [impuestosObservaciones, setImpuestosObservaciones] = useState("")
  const [segurosFlujoDoc, setSegurosFlujoDoc] = useState("")
  const [segurosObservaciones, setSegurosObservaciones] = useState("")
  const [contabilidadFlujoDoc, setContabilidadFlujoDoc] = useState("")
  const [contabilidadObservaciones, setContabilidadObservaciones] = useState("")

  // Estados para compliance
  const [mostrarCompliance, setMostrarCompliance] = useState(false)
  const [complianceFlujoDoc, setComplianceFlujoDoc] = useState("")
  const [complianceObservaciones, setComplianceObservaciones] = useState("")

  // Modal de selección de moneda
  const [modalMoneda, setModalMoneda] = useState(false)

  const formatearNumero = (valor: string) => {
    // Remover caracteres no numéricos excepto punto y coma
    const numero = valor.replace(/[^\d.,]/g, "")
    return numero
  }

  const handleGuardarModificacion = () => {
    // Validaciones
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

    // Aquí iría la lógica para guardar
    Alert.alert("Éxito", "Modificación creada correctamente", [
      {
        text: "OK",
        onPress: () => {
          console.log("Modificación guardada:", {
            tiempo: tiempoSeleccionado ? { dias: diasTiempo, observaciones: observacionesTiempo } : null,
            valor: valorSeleccionado
              ? { moneda: monedaValor, valor: valorMonto, observaciones: observacionesValor }
              : null,
            alcance: alcanceSeleccionado ? { alcance: alcanceTexto, observaciones: observacionesAlcance } : null,
            justificacion: justificacionModificacion,
          })
        },
      },
    ])
  }

  const CheckboxPersonalizado = ({ valor, onChange, label }) => (
    <View style={styles.checkboxContainer}>
      <TouchableOpacity style={[styles.checkbox, valor && styles.checkboxActivo]} onPress={() => onChange(!valor)}>
        {valor && <Ionicons name="checkmark" size={16} color="#fff" />}
      </TouchableOpacity>
      {label && <Text style={styles.checkboxLabel}>{label}</Text>}
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titulo}>Modificación Contractual (Adendos/Otrosi)</Text>

        {/* Tabla de tipos de modificación */}
        <View style={styles.tablaContainer}>
          {/* Header */}
          <View style={styles.tablaHeader}>
            <Text style={[styles.headerCell, { flex: 1.5 }]}>Tipo</Text>
            <Text style={[styles.headerCell, { flex: 0.5 }]}>
              <Ionicons name="checkmark-circle" size={16} color="#fff" />
            </Text>
            <Text style={[styles.headerCell, { flex: 2.5 }]}>Criterio</Text>
            <Text style={[styles.headerCell, { flex: 2.5 }]}>Observación</Text>
          </View>

          {/* Fila Tiempo */}
          <View style={styles.tablaFila}>
            <View style={[styles.cell, { flex: 1.5 }]}>
              <Text style={styles.cellText}>Tiempo</Text>
            </View>
            <View style={[styles.cell, { flex: 0.5, alignItems: "center" }]}>
              <TouchableOpacity
                style={[styles.checkbox, tiempoSeleccionado && styles.checkboxActivo]}
                onPress={() => setTiempoSeleccionado(!tiempoSeleccionado)}
              >
                {tiempoSeleccionado && <Ionicons name="checkmark" size={16} color="#fff" />}
              </TouchableOpacity>
            </View>
            <View style={[styles.cell, { flex: 2.5 }]}>
              <View style={styles.inputGroup}>
                <TextInput
                  style={[styles.input, { flex: 4 }]}
                  placeholder="Días calendario"
                  keyboardType="numeric"
                  value={diasTiempo}
                  onChangeText={setDiasTiempo}
                  editable={tiempoSeleccionado}
                />
                <View style={[styles.inputSufijo, { flex: 1 }]}>
                  <Text style={styles.sufijoText}>Días</Text>
                </View>
              </View>
            </View>
            <View style={[styles.cell, { flex: 2.5 }]}>
              <TextInput
                style={styles.textArea}
                placeholder="Observaciones..."
                multiline
                numberOfLines={3}
                value={observacionesTiempo}
                onChangeText={setObservacionesTiempo}
                editable={tiempoSeleccionado}
                maxLength={800}
              />
            </View>
          </View>

          {/* Fila Valor */}
          <View style={styles.tablaFila}>
            <View style={[styles.cell, { flex: 1.5 }]}>
              <Text style={styles.cellText}>Valor</Text>
            </View>
            <View style={[styles.cell, { flex: 0.5, alignItems: "center" }]}>
              <TouchableOpacity
                style={[styles.checkbox, valorSeleccionado && styles.checkboxActivo]}
                onPress={() => setValorSeleccionado(!valorSeleccionado)}
              >
                {valorSeleccionado && <Ionicons name="checkmark" size={16} color="#fff" />}
              </TouchableOpacity>
            </View>
            <View style={[styles.cell, { flex: 2.5 }]}>
              <View style={styles.inputGroup}>
                <TouchableOpacity
                  style={[styles.selectMoneda, { flex: 1.5 }]}
                  onPress={() => valorSeleccionado && setModalMoneda(true)}
                  disabled={!valorSeleccionado}
                >
                  <Text style={styles.selectText}>{monedaValor}</Text>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </TouchableOpacity>
                <TextInput
                  style={[styles.input, { flex: 3 }]}
                  placeholder="Valor"
                  keyboardType="numeric"
                  value={valorMonto}
                  onChangeText={(text) => setValorMonto(formatearNumero(text))}
                  editable={valorSeleccionado}
                />
              </View>
            </View>
            <View style={[styles.cell, { flex: 2.5 }]}>
              <TextInput
                style={styles.textArea}
                placeholder="Observaciones..."
                multiline
                numberOfLines={3}
                value={observacionesValor}
                onChangeText={setObservacionesValor}
                editable={valorSeleccionado}
                maxLength={800}
              />
            </View>
          </View>

          {/* Fila Alcance */}
          <View style={styles.tablaFila}>
            <View style={[styles.cell, { flex: 1.5 }]}>
              <Text style={styles.cellText}>Alcance</Text>
            </View>
            <View style={[styles.cell, { flex: 0.5, alignItems: "center" }]}>
              <TouchableOpacity
                style={[styles.checkbox, alcanceSeleccionado && styles.checkboxActivo]}
                onPress={() => setAlcanceSeleccionado(!alcanceSeleccionado)}
              >
                {alcanceSeleccionado && <Ionicons name="checkmark" size={16} color="#fff" />}
              </TouchableOpacity>
            </View>
            <View style={[styles.cell, { flex: 2.5 }]}>
              <TextInput
                style={styles.textArea}
                placeholder="Descripción del alcance..."
                multiline
                numberOfLines={3}
                value={alcanceTexto}
                onChangeText={setAlcanceTexto}
                editable={alcanceSeleccionado}
                maxLength={800}
              />
            </View>
            <View style={[styles.cell, { flex: 2.5 }]}>
              <TextInput
                style={styles.textArea}
                placeholder="Observaciones..."
                multiline
                numberOfLines={3}
                value={observacionesAlcance}
                onChangeText={setObservacionesAlcance}
                editable={alcanceSeleccionado}
                maxLength={800}
              />
            </View>
          </View>
        </View>

        {/* Campos adicionales de modificación */}
        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Datos de la Modificación</Text>

          <View style={styles.filaFormulario}>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Número de modificación</Text>
              <TextInput style={styles.inputDeshabilitado} value={numeroModificacion} editable={false} />
            </View>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Número de Solicitud modificación contractual</Text>
              <View style={styles.inputConBoton}>
                <TextInput style={[styles.inputDeshabilitado, { flex: 1 }]} value={numeroSolicitud} editable={false} />
                <TouchableOpacity style={styles.botonBuscar}>
                  <Ionicons name="search" size={20} color="#007AFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.filaFormulario}>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Fecha de aprobación solicitud</Text>
              <TextInput style={styles.inputDeshabilitado} value={fechaAprobacion} editable={false} />
            </View>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Tipo de modificación contractual</Text>
              <TextInput style={styles.inputDeshabilitado} value={tipoModificacion} editable={false} />
            </View>
          </View>

          <View style={styles.filaFormulario}>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Moneda adición</Text>
              <TextInput style={styles.inputDeshabilitado} value={monedaAdicional} editable={false} />
            </View>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Presupuesto adición sin impuestos</Text>
              <TextInput style={styles.inputDeshabilitado} value={presupuestoAdicional} editable={false} />
            </View>
          </View>

          <View style={styles.filaFormulario}>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Presupuesto adición SMMLV sin impuestos</Text>
              <TextInput style={styles.inputDeshabilitado} value={presupuestoSMMLV} editable={false} />
            </View>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Nuevo presupuesto del contrato en SMMLV</Text>
              <TextInput style={styles.inputDeshabilitado} value={nuevoPresupuesto} editable={false} />
            </View>
          </View>

          <View style={styles.filaFormulario}>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Días a adicionar (días calendario)</Text>
              <TextInput style={styles.inputDeshabilitado} value={diasAdicion} editable={false} />
            </View>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Nueva fecha de vencimiento contractual</Text>
              <TextInput style={styles.inputDeshabilitado} value={nuevaFechaVencimiento} editable={false} />
            </View>
          </View>

          <View style={styles.filaFormulario}>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Fecha de terminación anticipada</Text>
              <TextInput style={styles.inputDeshabilitado} value={fechaTerminacion} editable={false} />
            </View>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Responsable foro de estrategia</Text>
              <TextInput style={styles.inputDeshabilitado} value={responsableForo} editable={false} />
            </View>
          </View>

          <View style={styles.filaFormulario}>
            <View style={styles.campoFormulario}>
              <Text style={styles.etiqueta}>Usuario creador</Text>
              <TextInput style={styles.inputDeshabilitado} value={usuarioCreador} editable={false} />
            </View>
          </View>

          {/* Justificación y Documento */}
          <View style={styles.filaFormulario}>
            <View style={styles.campoFormularioCompleto}>
              <Text style={styles.etiqueta}>
                Justificación de modificación <Text style={styles.requerido}>(*)</Text>
              </Text>
              <TextInput
                style={styles.textAreaGrande}
                placeholder="Ingrese la justificación de la modificación..."
                multiline
                numberOfLines={4}
                value={justificacionModificacion}
                onChangeText={setJustificacionModificacion}
                maxLength={800}
              />
            </View>
          </View>

          <View style={styles.filaFormulario}>
            <View style={styles.campoFormularioCompleto}>
              <Text style={styles.etiqueta}>
                Documento de modificación <Text style={styles.requerido}>(*)</Text>
                <Ionicons name="warning" size={14} color="#FFA500" style={{ marginLeft: 5 }} />
              </Text>
              <TouchableOpacity style={styles.botonAdjuntar}>
                <Ionicons name="cloud-upload-outline" size={20} color="#007AFF" />
                <Text style={styles.textoBotonAdjuntar}>Seleccionar documento</Text>
              </TouchableOpacity>
              <Text style={styles.textoAyuda}>La carga máxima de archivos es de 100 MB</Text>
            </View>
          </View>
        </View>

        {/* Sección de Excepciones */}
        <TouchableOpacity style={styles.seccionExpandible} onPress={() => setMostrarExcepciones(!mostrarExcepciones)}>
          <Text style={styles.tituloSeccionExpandible}>Flujo de Excepciones</Text>
          <Ionicons name={mostrarExcepciones ? "chevron-up" : "chevron-down"} size={24} color="#007AFF" />
        </TouchableOpacity>

        {mostrarExcepciones && (
          <View style={styles.contenidoExpandible}>
            <View style={styles.filaFormulario}>
              <View style={styles.campoFormulario}>
                <Text style={styles.etiqueta}>
                  ¿Excepción? <Text style={styles.requerido}>(*)</Text>
                </Text>
                <View style={styles.selectorBinario}>
                  <TouchableOpacity
                    style={[styles.opcionBinaria, esExcepcion === "Si" && styles.opcionSeleccionada]}
                    onPress={() => setEsExcepcion("Si")}
                  >
                    <Text style={[styles.textoOpcion, esExcepcion === "Si" && styles.textoOpcionSeleccionada]}>Sí</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.opcionBinaria,
                      esExcepcion === "No" && styles.opcionSeleccionada,
                      { borderRightWidth: 0 },
                    ]}
                    onPress={() => setEsExcepcion("No")}
                  >
                    <Text style={[styles.textoOpcion, esExcepcion === "No" && styles.textoOpcionSeleccionada]}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {esExcepcion === "Si" && (
                <View style={styles.campoFormulario}>
                  <Text style={styles.etiqueta}>
                    ¿Cuál? <Text style={styles.requerido}>(*)</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Especifique la excepción"
                    value={cualExcepcion}
                    onChangeText={setCualExcepcion}
                  />
                </View>
              )}
            </View>

            {esExcepcion === "Si" && (
              <>
                <View style={styles.filaFormulario}>
                  <View style={styles.campoFormulario}>
                    <Text style={styles.etiqueta}>
                      ¿Requiere revisión? <Text style={styles.requerido}>(*)</Text>
                    </Text>
                    <View style={styles.selectorBinario}>
                      <TouchableOpacity
                        style={[styles.opcionBinaria, requiereRevision === "Si" && styles.opcionSeleccionada]}
                        onPress={() => setRequiereRevision("Si")}
                      >
                        <Text style={[styles.textoOpcion, requiereRevision === "Si" && styles.textoOpcionSeleccionada]}>
                          Sí
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.opcionBinaria,
                          requiereRevision === "No" && styles.opcionSeleccionada,
                          { borderRightWidth: 0 },
                        ]}
                        onPress={() => setRequiereRevision("No")}
                      >
                        <Text style={[styles.textoOpcion, requiereRevision === "No" && styles.textoOpcionSeleccionada]}>
                          No
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.campoFormulario}>
                    <Text style={styles.etiqueta}>
                      ¿Requiere aprobación? <Text style={styles.requerido}>(*)</Text>
                    </Text>
                    <View style={styles.selectorBinario}>
                      <TouchableOpacity
                        style={[styles.opcionBinaria, requiereAprobacion === "Si" && styles.opcionSeleccionada]}
                        onPress={() => setRequiereAprobacion("Si")}
                      >
                        <Text
                          style={[styles.textoOpcion, requiereAprobacion === "Si" && styles.textoOpcionSeleccionada]}
                        >
                          Sí
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.opcionBinaria,
                          requiereAprobacion === "No" && styles.opcionSeleccionada,
                          { borderRightWidth: 0 },
                        ]}
                        onPress={() => setRequiereAprobacion("No")}
                      >
                        <Text
                          style={[styles.textoOpcion, requiereAprobacion === "No" && styles.textoOpcionSeleccionada]}
                        >
                          No
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {requiereAprobacion === "Si" && (
                  <View style={styles.filaFormulario}>
                    <View style={styles.campoFormularioCompleto}>
                      <Text style={styles.etiqueta}>
                        Aprobación de <Text style={styles.requerido}>(*)</Text>
                      </Text>
                      <TouchableOpacity style={styles.select}>
                        <Text style={styles.selectText}>{aprobacionDe || "[SELECCIONE]"}</Text>
                        <Ionicons name="chevron-down" size={16} color="#666" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        )}

        {/* Sección de Áreas de Soporte */}
        <TouchableOpacity style={styles.seccionExpandible} onPress={() => setMostrarAreasSoporte(!mostrarAreasSoporte)}>
          <Text style={styles.tituloSeccionExpandible}>Áreas de Soporte</Text>
          <Ionicons name={mostrarAreasSoporte ? "chevron-up" : "chevron-down"} size={24} color="#007AFF" />
        </TouchableOpacity>

        {mostrarAreasSoporte && (
          <View style={styles.contenidoExpandible}>
            {/* Impuestos */}
            <View style={styles.areaSoporte}>
              <Text style={styles.subtituloArea}>Impuestos</Text>
              <View style={styles.filaFormulario}>
                <View style={styles.campoFormulario}>
                  <Text style={styles.etiqueta}>Requiere flujo o documento</Text>
                  <TouchableOpacity style={styles.select}>
                    <Text style={styles.selectText}>{impuestosFlujoDoc || "[SELECCIONE]"}</Text>
                    <Ionicons name="chevron-down" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
                {impuestosFlujoDoc === "Documento" && (
                  <View style={styles.campoFormulario}>
                    <TouchableOpacity style={styles.botonAdjuntar}>
                      <Ionicons name="document-attach-outline" size={20} color="#007AFF" />
                      <Text style={styles.textoBotonAdjuntar}>Documento concepto</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {impuestosFlujoDoc === "Documento" && (
                <View style={styles.filaFormulario}>
                  <View style={styles.campoFormularioCompleto}>
                    <Text style={styles.etiqueta}>Observaciones</Text>
                    <TextInput
                      style={styles.textArea}
                      placeholder="Observaciones..."
                      multiline
                      numberOfLines={3}
                      value={impuestosObservaciones}
                      onChangeText={setImpuestosObservaciones}
                      maxLength={800}
                    />
                  </View>
                </View>
              )}
            </View>

            {/* Seguros */}
            <View style={styles.areaSoporte}>
              <Text style={styles.subtituloArea}>Seguros</Text>
              <View style={styles.filaFormulario}>
                <View style={styles.campoFormulario}>
                  <Text style={styles.etiqueta}>Requiere flujo o documento</Text>
                  <TouchableOpacity style={styles.select}>
                    <Text style={styles.selectText}>{segurosFlujoDoc || "[SELECCIONE]"}</Text>
                    <Ionicons name="chevron-down" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
                {segurosFlujoDoc === "Documento" && (
                  <View style={styles.campoFormulario}>
                    <TouchableOpacity style={styles.botonAdjuntar}>
                      <Ionicons name="document-attach-outline" size={20} color="#007AFF" />
                      <Text style={styles.textoBotonAdjuntar}>Documento concepto</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {segurosFlujoDoc === "Documento" && (
                <View style={styles.filaFormulario}>
                  <View style={styles.campoFormularioCompleto}>
                    <Text style={styles.etiqueta}>Observaciones</Text>
                    <TextInput
                      style={styles.textArea}
                      placeholder="Observaciones..."
                      multiline
                      numberOfLines={3}
                      value={segurosObservaciones}
                      onChangeText={setSegurosObservaciones}
                      maxLength={800}
                    />
                  </View>
                </View>
              )}
            </View>

            {/* Contabilidad */}
            <View style={styles.areaSoporte}>
              <Text style={styles.subtituloArea}>Contabilidad</Text>
              <View style={styles.filaFormulario}>
                <View style={styles.campoFormulario}>
                  <Text style={styles.etiqueta}>Requiere flujo o documento</Text>
                  <TouchableOpacity style={styles.select}>
                    <Text style={styles.selectText}>{contabilidadFlujoDoc || "[SELECCIONE]"}</Text>
                    <Ionicons name="chevron-down" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
                {contabilidadFlujoDoc === "Documento" && (
                  <View style={styles.campoFormulario}>
                    <TouchableOpacity style={styles.botonAdjuntar}>
                      <Ionicons name="document-attach-outline" size={20} color="#007AFF" />
                      <Text style={styles.textoBotonAdjuntar}>Documento concepto</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {contabilidadFlujoDoc === "Documento" && (
                <View style={styles.filaFormulario}>
                  <View style={styles.campoFormularioCompleto}>
                    <Text style={styles.etiqueta}>Observaciones</Text>
                    <TextInput
                      style={styles.textArea}
                      placeholder="Observaciones..."
                      multiline
                      numberOfLines={3}
                      value={contabilidadObservaciones}
                      onChangeText={setContabilidadObservaciones}
                      maxLength={800}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Sección de Compliance */}
        <TouchableOpacity style={styles.seccionExpandible} onPress={() => setMostrarCompliance(!mostrarCompliance)}>
          <Text style={styles.tituloSeccionExpandible}>Compliance</Text>
          <Ionicons name={mostrarCompliance ? "chevron-up" : "chevron-down"} size={24} color="#007AFF" />
        </TouchableOpacity>

        {mostrarCompliance && (
          <View style={styles.contenidoExpandible}>
            <View style={styles.areaSoporte}>
              <Text style={styles.subtituloArea}>Compliance</Text>
              <View style={styles.filaFormulario}>
                <View style={styles.campoFormulario}>
                  <Text style={styles.etiqueta}>Requiere flujo o documento</Text>
                  <TouchableOpacity style={styles.select}>
                    <Text style={styles.selectText}>{complianceFlujoDoc || "[SELECCIONE]"}</Text>
                    <Ionicons name="chevron-down" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
                {complianceFlujoDoc === "Documento" && (
                  <View style={styles.campoFormulario}>
                    <TouchableOpacity style={styles.botonAdjuntar}>
                      <Ionicons name="document-attach-outline" size={20} color="#007AFF" />
                      <Text style={styles.textoBotonAdjuntar}>Documento concepto</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {complianceFlujoDoc === "Documento" && (
                <View style={styles.filaFormulario}>
                  <View style={styles.campoFormularioCompleto}>
                    <Text style={styles.etiqueta}>Observaciones</Text>
                    <TextInput
                      style={styles.textArea}
                      placeholder="Observaciones..."
                      multiline
                      numberOfLines={3}
                      value={complianceObservaciones}
                      onChangeText={setComplianceObservaciones}
                      maxLength={800}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Botón Guardar */}
        <View style={styles.botonesContainer}>
          <TouchableOpacity style={styles.botonGuardar} onPress={handleGuardarModificacion}>
            <Text style={styles.textoBotonGuardar}>Crear modificación</Text>
          </TouchableOpacity>
        </View>

        {/* Modal de Selección de Moneda */}
        <Modal visible={modalMoneda} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitulo}>Seleccionar Moneda</Text>
                <TouchableOpacity onPress={() => setModalMoneda(false)}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              {["COP", "USD", "EUR"].map((moneda) => (
                <TouchableOpacity
                  key={moneda}
                  style={[styles.opcionModal, monedaValor === moneda && styles.opcionModalSeleccionada]}
                  onPress={() => {
                    setMonedaValor(moneda)
                    setModalMoneda(false)
                  }}
                >
                  <Text
                    style={[styles.textoOpcionModal, monedaValor === moneda && styles.textoOpcionModalSeleccionada]}
                  >
                    {moneda}
                  </Text>
                  {monedaValor === moneda && <Ionicons name="checkmark" size={20} color="#007AFF" />}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
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
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  tablaContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
    overflow: "hidden",
  },
  tablaHeader: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    padding: 12,
  },
  headerCell: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  tablaFila: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    minHeight: 80,
  },
  cell: {
    padding: 8,
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#eee",
  },
  cellText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxActivo: {
    backgroundColor: "#007AFF",
  },
  inputGroup: {
    flexDirection: "row",
    gap: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    fontSize: 12,
    backgroundColor: "#fff",
  },
  inputSufijo: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  sufijoText: {
    fontSize: 10,
    color: "#666",
  },
  selectMoneda: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#fff",
  },
  selectText: {
    fontSize: 12,
    color: "#333",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    fontSize: 12,
    backgroundColor: "#fff",
    minHeight: 60,
    textAlignVertical: "top",
  },
  seccion: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  filaFormulario: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  campoFormulario: {
    flex: 1,
  },
  campoFormularioCompleto: {
    flex: 1,
  },
  etiqueta: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
    fontWeight: "500",
  },
  requerido: {
    color: "#FF5722",
  },
  inputDeshabilitado: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
    color: "#999",
  },
  inputConBoton: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  botonBuscar: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  textAreaGrande: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#fff",
    minHeight: 100,
    textAlignVertical: "top",
  },
  botonAdjuntar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#fff",
  },
  textoBotonAdjuntar: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "500",
  },
  textoAyuda: {
    fontSize: 11,
    color: "#999",
    marginTop: 4,
    fontStyle: "italic",
  },
  seccionExpandible: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  tituloSeccionExpandible: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  contenidoExpandible: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectorBinario: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
  },
  opcionBinaria: {
    flex: 1,
    paddingVertical: 10,
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
    fontSize: 14,
    color: "#333",
  },
  textoOpcionSeleccionada: {
    color: "#fff",
    fontWeight: "600",
  },
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#fff",
  },
  areaSoporte: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  subtituloArea: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 12,
  },
  botonesContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  botonGuardar: {
    backgroundColor: "#28a745",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
  },
  textoBotonGuardar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
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
  opcionModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  opcionModalSeleccionada: {
    backgroundColor: "#f0f7ff",
  },
  textoOpcionModal: {
    fontSize: 16,
    color: "#333",
  },
  textoOpcionModalSeleccionada: {
    color: "#007AFF",
    fontWeight: "600",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
})
