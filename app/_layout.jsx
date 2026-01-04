import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="registro" />
        <Stack.Screen name="home" />
        <Stack.Screen name="solicitar-mudanza" />
        <Stack.Screen name="cotizacion-estimada" />
        <Stack.Screen name="perfil-proveedor" />
        <Stack.Screen name="panel-pago" />
        <Stack.Screen name="confirmacion-pago" />
        <Stack.Screen name="panel-proveedor" />
        <Stack.Screen name="centro-ayuda" />
        <Stack.Screen name="centro-ayuda-proveedor" />
        <Stack.Screen name="historial-mudanzas" />
        <Stack.Screen name="historial-proveedor" />
        <Stack.Screen name="servicio-finalizado" />
      </Stack>
    </>
  )
}
