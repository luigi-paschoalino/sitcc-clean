import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { LoginDTO } from 'src/core/application/dtos/Login.dto';
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository';

const secretToken = "sdaFsadasdaGasdCMySecretKey";

@Injectable()
export class LoginService {
    constructor(private readonly usuarioRepository: UsuarioRepository) {}
    
    async login(body: LoginDTO) {
        const usuario = await this.usuarioRepository.buscarPorId(body.id);
        if (usuario) {
        if (!(usuario instanceof Error) && usuario.getSenha() === body.senha) {
            const token = jwt.sign({ id: usuario.getId() }, secretToken, {
            expiresIn: 300,
            });
            return { auth: true, token: token };
        }
        }
        return { auth: false, token: null } ;
    }
      
}
