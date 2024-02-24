import nodemailer  from 'nodemailer';

const emailRegistro = async (datos) =>{
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
        subject : 'Confirmar cuenta',
        text : 'Confirmar cuenta en Administrador de pacientes de Veterinaria',
        html : `<p> Hola : ${nombre} confirma tu cuenta.</p>
                <p> Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace.</p>
                <a href='${process.env.FRONTEND_URL}/confirmar-cuenta/${token}'> Comfirmar Cuenta</a>

                <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje!</p>
        
        `
    });

    console.log('mensaje enviado : %s', info.messageId);
};

export default emailRegistro;
