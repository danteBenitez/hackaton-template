import { ROLES } from '@/auth/consts';
import { Role } from '@/auth/entities/role.entity';
import { ENVIRONMENT } from '@/config/env';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService {
  constructor(
    private entityManager: EntityManager,
    private configService: ConfigService
  ) { }

  /**
   * Apply all seeding operations
   */
  async seed() {
    await this.seedRoles();
    await this.seedDefaultAdmin();
  }

  get saltRounds(): number {
    const saltRounds =
      this.configService.get<ENVIRONMENT['SALT_ROUNDS']>('SALT_ROUNDS');
    if (!saltRounds) {
      return 10;
    }
    return parseInt(saltRounds);
  }

  async seedDefaultAdmin() {
    const roleRepository = this.entityManager.getRepository(Role);
    const adminRole = await roleRepository.findOne({
      where: { name: ROLES.ADMIN },
    });
    if (!adminRole) {
      throw new Error('Admin role not found');
    }
    const userRepository = this.entityManager.getRepository(User);
    const hasAdmin = await userRepository.findOne({
      where: {
        roles: [adminRole],
      },
    });
    if (hasAdmin) {
      return hasAdmin;
    }

    const admin = userRepository.create({
      name: 'admin',
      password: await bcrypt.hash('admin', this.saltRounds),
      email: 'admin@example.com',
    });
    admin.roles = [adminRole];

    return userRepository.save(admin);
  }


  /**
   * Seeds any roles on the consts file on auth module.
   * This is useful to ensure that the roles are always present on the database.
   * It performs an upsert operation, so to avoid duplicates.
   */
  async seedRoles(): Promise<void> {
    const roleRepository = this.entityManager.getRepository(Role);
    console.log(roleRepository.metadata);
    const roles = Object.values(ROLES)
      .map(roleName => {
        return roleRepository.create({ name: roleName });
      })
      .map(role => {
        return roleRepository.upsert(role, {
          conflictPaths: {
            name: true
          }
        })
      });

    await Promise.all(roles);
  }
}
