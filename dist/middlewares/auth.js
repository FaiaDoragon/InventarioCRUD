"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const validarJWT = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        res.status(401).json({
            msg: "No hay token en la peticion"
        });
    }
    try {
        const verificacion = jwt.verify(token || "", process.env.KEY_TOKEN || "");
        res.json({ verificacion });
    }
    catch (error) {
        console.log('error en la verificacion del Token');
        throw error;
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=auth.js.map