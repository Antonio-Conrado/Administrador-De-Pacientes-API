import nodemailer  from 'nodemailer';

const emailRegistro = async (datos) =>{
    var transport = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            ciphers: "TLSv1.2,TLSv1.3",
        },
    });

    const{email,nombre, token} = datos;

    const info = await transport.sendMail({
        from : "Administrador de Pacientes de Veterinaria",
        to : email,
        subject : 'Confirmar cuenta',
        text : 'Confirmar cuenta en Administrador de pacientes de Veterinaria',
        html: `<p style=" color: rgb(75 85 99); text-align: center; font-size: 16px;">Hola ${nombre}, Por favor confirma tu cuenta!</p>
            <p style=" color: rgb(75 85 99);">Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:</p>
            <a href='${process.env.FRONTEND_URL}/confirmar-cuenta/${token}' style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: block; font-size: 16px; margin: 4px 2px; margin:0 auto; cursor: pointer; border-radius: 8px;">Confirmar Cuenta</a>
            <p style="color: red;">Si tú no creaste esta cuenta, puedes ignorar este mensaje.</p>`
}); 

    console.log('mensaje enviado : %s', info.messageId);
};

export default emailRegistro;
