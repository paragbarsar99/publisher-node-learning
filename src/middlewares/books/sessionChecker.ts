import { ERRORS } from "@utils/messages";
import { Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
//stateless authorization

const sessionChecker = async (req: Request, res: Response, next: any) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      res.status(401).json({
        error: ERRORS.UNAUTHORIZE,
      });
      return;
    }
    const justToken = token.split(" ")[1];
    const tokenInfo: any = jwt.verify(justToken, process.env.JWT_SECRET!);
    // console.log(tokenInfo, " tokenInfo");

    req["body"] = { ...req["body"], user: tokenInfo };
    next();
  } catch (error) {
    // console.log(error);
    const jwtError = error as JsonWebTokenError;
    switch (jwtError.name) {
      case "TokenExpiredError":
        res.status(401).json({
          error: ERRORS.TOKEN_EXPIRED,
        });
        break;
      case "JsonWebTokenError":
        res.status(401).json({
          error: jwtError.message,
        });
        break;
      default:
        res.status(500).send({
          error: jwtError.message,
        });
    }
  }
};

export default sessionChecker;

/**
 * we don't need this logic jwt handles the expire token
    // const extension = dayjs.unix(tokenInfo?.exp || 0).add(10, "minutes");
    // const isExpired = dayjs().isAfter(extension);

    // if (isExpired) {
    //   res.status(401).json({
    //     error: ERRORS.TOKEN_EXPIRED,
    //   });
    // }
 *  Session based authrozation (statefull)
  if (!id) {
    throw new Error("Invalid Header request");
  }
   
  const [session] = await db
    .select()
    .from(sessionModel)
    .where(eq(sessionModel.id, id));
    console.log(session)
  if (!session) {
    throw new Error("Session is Expired please login again!");
  }
  const extension = dayjs(session.createdAt).add(5, "minutes");
  const isExpired = dayjs().isAfter(extension);

  if (isExpired) {
    await db.delete(sessionModel).where(eq(sessionModel.id, id));
    throw new Error("Please login again session is expired");
  }

 */
