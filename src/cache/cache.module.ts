import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  imports: [CacheModule.register({ ttl: 15 * 1000 })],
  exports: [CacheModule],
})
export class CacheConfigModule {}
