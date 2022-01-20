export function SetHeaderMiddleWare(req: any, res: any, next: () => void) {
    res.header("Access-Control-Expose-Headers", "access-token");
    next();
}
