export default function PaypalCheckoutUI() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resumen del Servicio */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Checkout de Pago
              </h1>
              <p className="text-gray-500 mt-2">
                Plataforma de servicios profesionales - chambealo.com
              </p>
            </div>

            <img
              src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
              alt="PayPal"
              className="w-24 h-auto"
            />
          </div>

          {/* Servicio */}
          <div className="border border-gray-200 rounded-2xl p-5 mb-6 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl">
                💼
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Desarrollo de Página Web Empresarial
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Servicio contratado mediante chambealo.com
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                    Disponible
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div>
                    <p className="text-gray-400 text-sm">Tiempo</p>
                    <p className="font-semibold">7 días</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Categoría</p>
                    <p className="font-semibold">Desarrollo Web</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Proveedor</p>
                    <p className="font-semibold">VAFTEC Perú SAC</p>
                  </div>

                  <div>
                    <p className="text-gray-400 text-sm">Estado</p>
                    <p className="font-semibold text-blue-600">Pendiente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Datos del cliente */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Información del Cliente
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  placeholder="Ingrese su nombre"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Método de pago */}
          <div className="border border-blue-100 bg-blue-50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Método de Pago
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Pago seguro procesado mediante PayPal API
                </p>
              </div>

              <div className="bg-white rounded-xl px-4 py-2 shadow-sm border border-blue-100 text-blue-600 font-semibold">
                PayPal Checkout
              </div>
            </div>

            {/* Botón PayPal */}
            <div className="bg-white rounded-2xl border border-dashed border-blue-300 p-8 text-center">
              <p className="text-gray-500 mb-5">
                Aquí se renderizará el componente oficial de PayPal Buttons
              </p>

              <button className="bg-yellow-400 hover:bg-yellow-300 transition-all text-gray-900 font-bold px-8 py-4 rounded-2xl shadow-lg text-lg">
                Pagar con PayPal
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-white rounded-3xl shadow-xl p-8 h-fit sticky top-5">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Resumen del Pago
          </h2>

          <div className="space-y-4 border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Servicio</span>
              <span className="font-medium">S/ 1,500.00</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">Comisión</span>
              <span className="font-medium">S/ 0.00</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">IGV</span>
              <span className="font-medium">Incluido</span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 mb-8">
            <span className="text-xl font-semibold text-gray-800">Total</span>
            <span className="text-3xl font-bold text-blue-600">
              S/ 1,500
            </span>
          </div>

          {/* Seguridad */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-6">
            <div className="flex gap-3 items-start">
              <div className="text-2xl">🔒</div>

              <div>
                <h4 className="font-semibold text-green-700">
                  Pago Seguro
                </h4>

                <p className="text-sm text-green-600 mt-1">
                  Tus transacciones están protegidas mediante cifrado SSL y
                  validación segura con PayPal.
                </p>
              </div>
            </div>
          </div>

          {/* Estado */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600 text-sm">
                Backend Laravel conectado
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600 text-sm">
                API PayPal configurada
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="text-gray-600 text-sm">
                Esperando validación de pago
              </span>
            </div>
          </div>

          {/* Botón alternativo */}
          <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-4 rounded-2xl shadow-lg">
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}
