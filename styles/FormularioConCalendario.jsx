import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import { useRouter } from "expo-router"

export default function FormularioConCalendario() {
  const router = useRouter()
  const [fecha, setFecha] = useState("")
  const [descripcion, setDescripcion] = useState("")

  const handleEnviar = () => {
    if (!fecha || !descripcion) {
      alert("Completa todos los campos")
      return
    }

    console.log("Fecha:", fecha)
    console.log("Descripción:", descripcion)

    router.back()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitud de Mudanza</Text>

      <TextInput
        style={styles.input}
        placeholder="Fecha de la mudanza"
        value={fecha}
        onChangeText={setFecha}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe tu mudanza"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar Solicitud</Text>
      </TouchableOpacity>
    </View>
  )
}
