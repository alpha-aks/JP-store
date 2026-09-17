import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1] // "Bearer token" => ["Bearer","token"]
        // console.log("token", token);
        
        if(!token) {
            return res.status(401).json({
                message: "You need to login before adding product to cart or continuing.",
                error: true, 
                success: false
            })
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN)
        // console.log("Decode: ", decode);
        if(!decode) {
            return res.status(401).json({
                message: "You need to login before adding product to cart or continuing.",
                error: true,
                success: false
            })
        }

        req.userId = decode.id
        // console.log("req.userId:", req.userId);
        
        next()

    } catch (error) {
        const isExpired = error?.name === "TokenExpiredError" || error?.message?.includes("expired");
        return res.status(401).json({
            message: isExpired 
                ? "Your session has expired. Please log in again to continue." 
                : "You need to login before adding product to cart or continuing.",
            error: true,
            success: false
        })
    }
}

export default authMiddleware