import { SentMessageInfo } from "nodemailer/lib/smtp-transport";

type PostSendMail_request = {
  name: string;
  surname: string;
  email: string;
  company?: string;
  message: string;
  gdpr: boolean;
};
type PostSendMail_response = boolean | string;

export type { PostSendMail_request, PostSendMail_response };
