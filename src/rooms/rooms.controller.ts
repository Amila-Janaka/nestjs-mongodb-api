import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  getAllRooms(@Query() query: any) {
    return this.roomsService.findAll(query);
  }
  @Post()
  createRoom(@Body() dto: CreateRoomDto) {
    return this.roomsService.create(dto);
  }
  @Get(':id')
  getRoom(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    return this.roomsService.update(id, dto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
