import { envs } from '../../config/envs';
import { MailerServiceException } from 'src/shared/domain/exception/mailer.exception';
import { Mailer } from 'src/shared/domain/service/mailer.service';
import * as nodemailer from 'nodemailer';


export class MailerService implements Mailer {
  constructor(){}

  async sendEmail(to: string, subject: string, template: string): Promise<boolean> {

    try {
      const transporter = nodemailer.createTransport({
        host: envs.SMTP_HOST,
        port: envs.SMTP_PORT,
        secure: false,
        auth: {
          user: envs.SMTP_EMAIL,
          pass: envs.SMTP_PASSWORD
        }
      })

      await transporter.sendMail({
        from: 'Billetera Digital',
        to,
        subject,
        html: template
      })

      return true
    } catch (error) {
      throw MailerServiceException.sendingEmailError()
    }
  }
}