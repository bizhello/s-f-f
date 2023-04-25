import { IRegistryRes } from "../common/interfaces/IAuth";
import AuthService from "../services/AuthService";

const authLoader = async (): Promise<IRegistryRes> => {
    try {
        return await AuthService.checkAuth();
    } catch (e) {
        throw new Error('Пользователь не авторизован');
    }
}

export default authLoader;
