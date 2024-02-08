import { NextFunction, Request, Response } from "express";
import { v4 as uuid4 } from "uuid";
import { sendMail } from "../utils/sendEmail";
import { prisma } from "../database/prisma";
import { geneteTemplateMail } from "../utils/templateMail";

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email, name } = res.locals.account
    const tokenReset = uuid4()

    await sendMail(req.body, "Trocar senha", geneteTemplateMail())

    await prisma.account.update({
        where: {
            email
        },
        data: { tokenResetPassword: tokenReset}
    })

    return next()
}