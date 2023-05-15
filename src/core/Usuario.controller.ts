import { Controller, Get } from "@nestjs/common";

@Controller('usuario')
export class UsuarioController {
    @Get(':id')
    public async getUsuario() {}
}