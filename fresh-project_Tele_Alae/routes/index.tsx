export default function Home() {
  return(
    <div class='min-h-screen bg-indigo-900 flex items-center justify-center'>
      <div class='bg-indigo-500/40 border border-white/40 rounded-3xl p-10 w-[500px]'>
        <h1 class='text-4xl text-center text-white font-bold mb-2'>
          Tele Alae
        </h1>
        <p class='text-center text-white/70 mb-6'>
        Sistema de Telemedicina Chiloé
        </p>
        <div class="flex mb-6">
          <button class="flex-1 text-white border-b-2 border-white py-2">
            Inicio de sesión
          </button>
          <button class="flex-1 text-white/60 border-b-2 border-transparent py-2">
            Crear Cuenta
          </button>
        </div>

      </div>
    </div>
  )
}
