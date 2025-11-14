
export interface Mailer {
  sendEmail(to: string, subject: string,template: string): Promise<boolean>
}

export const mailerDefinition = {
  name: 'Mailer',
}