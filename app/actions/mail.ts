import * as emailjs from "emailjs-com";
import { db } from "@/lib/db";

emailjs.init("2hUV1GLHX6hixJRJS");
export const sendEmail = async ({ username, otp }: any) => {
  await emailjs
    .send("service_l0f690e", "template_w2gy3fl", {
      email: username,
      otp: otp,
    })
    .then(
      (result) => {
        return result;
      },
      (error) => {
        return error.text;
      }
    );
};
