import type { NextApiRequest, NextApiResponse } from "next";
import { PostSendMail_request, PostSendMail_response } from "./_model";
import Joi from "joi";
import { apiErrorResponse, serverErrorResponse, sucessResponse } from "@utils";
import { MailtrapClient } from "mailtrap";

const schema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().required(),
  message: Joi.string().required(),
  company: Joi.string().optional().allow(""),
  gdpr: Joi.boolean().required(),
});

const TOKEN = "e154b775c1944483fcf4cd91b9e718ef"; //process.env.EMAIL_TOKEN;
const ENDPOINT = process.env.EMAIL_ENDPOINT;
const RECIPIENT = process.env.EMAIL;

export const sendMail = async (
  req: NextApiRequest,
  res: NextApiResponse<PostSendMail_response>
) => {
  const body: PostSendMail_request = req.body;

  const validation = schema.validate(body);

  if (validation.error) {
    return apiErrorResponse(res, validation.error.message);
  }

  if (body.gdpr === false) {
    return serverErrorResponse(res, "Gdpr must be true.");
  }

  const client = new MailtrapClient({
    endpoint: ENDPOINT,
    token: TOKEN,
  });

  const sender = {
    email: "mailtrap@linsta.cz",
    name: `${body.name} ${body.surname} - ${body.email}`,
  };
  const recipients = [
    {
      email: RECIPIENT as string,
    },
  ];

  await client
    .send({
      from: sender,
      to: recipients,
      subject: body.company
        ? `Společnost: ${body.company} - vzkaz z formuláře`
        : "Vzkaz z formuláře",
      text: body.message,
      category: "Form",
    })
    .then(() => {
      sucessResponse(res, true);
    })
    .catch((err) => {
      console.log(err);
      serverErrorResponse(res, err);
    });
};
