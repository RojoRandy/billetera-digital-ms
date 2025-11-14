
export const compraTokenTemplate = (token: string): string => {
  return `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Código de Confirmación de Compra</title>
            <style>
                /* Estilos en línea para mejor compatibilidad con clientes de correo */
                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    color: #333333;
                }
                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
                    padding: 30px;
                    text-align: center;
                }
                .header {
                    padding-bottom: 20px;
                }
                .header h1 {
                    color: #1a73e8; /* Color de tu billetera/marca */
                    font-size: 24px;
                    margin: 0;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .token-box {
                    background-color: #f0f8ff; /* Fondo claro para resaltar */
                    border: 1px solid #cceeff;
                    border-radius: 4px;
                    padding: 15px 20px;
                    margin: 25px 0;
                    display: inline-block; /* Centrar la caja */
                }
                .token {
                    font-size: 32px;
                    font-weight: bold;
                    letter-spacing: 10px; /* Separación para mejorar la lectura */
                    color: #1a73e8;
                    margin: 0;
                }
                .footer {
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #eeeeee;
                    font-size: 12px;
                    color: #999999;
                }
            </style>
        </head>
        <body>
            <div style="padding: 20px;">
                <div class="container">
                    <div class="header">
                        <h1>Verificación de Compra</h1>
                    </div>
                    
                    <div class="content">
                        <p>Recibiste este correo porque estás intentando confirmar una transacción en tu billetera digital. Utiliza el siguiente código para finalizar la compra:</p>
                        
                        <div class="token-box">
                            <p class="token">
                              ${token}
                            </p>
                        </div>
                        
                    </div>
                    
                    <div class="footer">
                        <p>&copy; 2025 Mi Billetera Digital. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `
}