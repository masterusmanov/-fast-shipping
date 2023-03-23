import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Operation, OperationSchema } from './schema/operation.schema';


@Module({
  imports: [MongooseModule.forFeature([{name: Operation.name, schema: OperationSchema}])],
  controllers: [OperationController],
  providers: [OperationService]
})
export class OperationModule {}
