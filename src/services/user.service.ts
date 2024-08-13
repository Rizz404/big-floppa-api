import { DeleteResult, Repository } from "typeorm";
import { User } from "@/entity/User.entity";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import bcrypt from "bcrypt";

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const salt = await bcrypt.genSalt();
    let hashedPassword: string | undefined;

    if (userData.password) {
      hashedPassword = await bcrypt.hash(userData.password, salt);
    }

    const user = this.userRepository.create({
      password: hashedPassword,
      ...userData,
    });

    return await this.userRepository.save(user);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateById(id: string, userData: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, userData);
    return this.getById(id);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
