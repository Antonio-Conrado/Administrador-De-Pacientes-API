import nodemailer  from 'nodemailer';

const emailNuevoPassword = async (datos) =>{
    var transport = nodemailer.createTransport({
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
        html : `<p> Hola : ${nombre} has solicítado restablecer tu password.</p>
                <p> Sigue el siguiente enlace para generar un nuevo password.</p>
                <a href='${process.env.FRONTEND_URL}/reset-password/${token}'> Restablecer password</a>

                <p>Si tú no has solicítado restablecer tu password, puedes ignora este mensaje!</p>
        
        `
    });

    console.log('mensaje enviado : %s', info.messageId);
};

export default emailNuevoPassword;
