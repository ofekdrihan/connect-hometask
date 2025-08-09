import dotenv from "dotenv";
dotenv.config();

//Function for secure the endpoints
export const apiKeyAuth = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      success: false,
      code: 401,
      message: "Unauthorized: Missing API key or NO ACCESS"
    });
  }
  next();
}
