import nodemailer  from 'nodemailer';

const emailNuevoPassword = async (datos) =>{
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
        subject : 'Restablece tu password',
        text : 'Restablece tu password',
        html : `<p style=" color: rgb(75 85 99); text-align: center; font-size: 16px;"> Hola : ${nombre} has solicítado restablecer tu password.</p>
                <p  style=" color: rgb(75 85 99);"> Sigue el siguiente enlace para generar un nuevo password.</p>
                <a href='${process.env.FRONTEND_URL}/reset-password/${token}' style="background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: block; font-size: 16px; margin: 4px 2px; margin:0 auto; cursor: pointer; border-radius: 8px;"> Restablecer password</a>
                <p style="color: red;">Si tú no has solícitado restablecer el password, puedes ignorar este mensaje.</p>   
        `});

    console.log('mensaje enviado : %s', info.messageId);
};

export default emailNuevoPassword;
