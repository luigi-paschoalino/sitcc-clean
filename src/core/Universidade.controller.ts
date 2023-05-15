import { Controller, Get } from "@nestjs/common";

@Controller('universidade')
export class UniversidadeController {
    @Get(':id')
    public async getUniversidade() {}
}
