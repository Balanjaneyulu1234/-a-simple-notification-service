// src/app.module.ts

import { Module } from '@nestjs/common';
import { ComplianceModule } from './compliance/compliance.module';

@Module({
  imports: [ComplianceModule],
})
export class AppModule {}
