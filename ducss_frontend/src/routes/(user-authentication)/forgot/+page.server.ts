import { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASSWORD } from "$env/static/private";
import { DB } from "$lib/server/database";
import { redirect, fail, type Actions } from "@sveltejs/kit";
import nodemailer from 'nodemailer';

export const actions = {
    forgot: async ({ request }) => {
        const data = await request.formData();

        let email = data.get('email')?.toString();
        if (!email || email.trim() === '') {
            return fail(400, { message: 'Please provide a valid email.' });
        }

        // Find user and get ID
        const sql = `SELECT * FROM auth.users WHERE lower(email) = lower($1)`;
        const rows = await DB().query(sql, [email]);
        if (rows.length > 0) {
            if (!rows[0]) {
                return { success: true };
            }
            const user_id: number = rows[0].id;

            // create reset request
            const requestRows = await DB().query(`INSERT INTO auth.password_resets (user_id) VALUES ($1) RETURNING *`, [user_id]);
            const reset_session_id = requestRows[0].session_id;

            // send email with help code from
            // https://stackoverflow.com/questions/46742402/error-self-signed-certificate-in-certificate-chain-nodejs-nodemailer-express
            // (a bit insecure, needs improvement)
            const mail = nodemailer.createTransport({
                host: MAIL_HOST,
                port: Number(MAIL_PORT),
                secure: false,
                auth: {
                    user: MAIL_USER,
                    pass: MAIL_PASSWORD
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            let emailBody = '<h3>Reset Your Password</h3>';
            emailBody += '<p>Well, well, you forgot your DUCSS password, did you? Johnathan is unimpressed.</p>';
            emailBody += '<p>(If this was sent to you in error, our bad, just ignore us. Your status with Johnathan remains.)</p>'
            emailBody += `<a href="http://localhost:5173/change?id=`+reset_session_id+`" `;
            emailBody += 'style="display:block; font-size:16px; background-color:orange; width:215px; color:white !important; line-height:46px; text-align:center;text-decoration:none;">Reset Password</a>'
        
            await mail.sendMail({
                from: {
                    name: 'DUCSS',
                    address: MAIL_USER
                },
                to: email.toString(),
                subject: 'DUCSS - Reset your password',
                html: emailBody
            })
        
            return {success:true};
        } else return fail(400, { message: 'That email appears to lack a DUCSS account.' });
    }
} satisfies Actions;