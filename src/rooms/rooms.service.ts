import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { isValidObjectId, Model } from 'mongoose';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<RoomDocument>,
  ) {}
  async findAll(query: any) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (query.available !== undefined) {
      filter.available = query.available === 'true';
    }

    const sortField = query.sort || 'createdAt';
    const sortOrder = query.order === 'asc' ? 1 : -1;

    return this.roomModel
      .find(filter)
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);
  }
  async create(roomData: Partial<Room>) {
    const room = new this.roomModel(roomData);
    return room.save();
  }
  async findOne(id: string) {
    const room = await this.roomModel.findById(id);
    if (!room) {
      throw new NotFoundException('Room Not Found');
    }
    return room;
  }
  async update(id: string, data: Partial<Room>) {
    return this.roomModel.findByIdAndUpdate(id, data, { new: true });
  }
  async remove(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid ID');
    }
    return this.roomModel.findByIdAndDelete(id);
  }
}
