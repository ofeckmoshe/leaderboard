import { UserService } from "./user.service";
import { CreateUserWithScoreDTO } from "./DTOs/CreateUserWithScoreDTO";
import { UpdateScoreDTO } from "./DTOs/UpdateScoreDTO";
import { ScoreService } from "../score/score.service";
import { User } from "src/database/entities/user.entity";
export declare class UserController {
    private readonly userService;
    private readonly scoreService;
    constructor(userService: UserService, scoreService: ScoreService);
    createMock(): Promise<void>;
    addUser(createUserDto: CreateUserWithScoreDTO): Promise<User>;
    updateScore(userId: number, updateScoreDto: UpdateScoreDTO): Promise<import("../../database/entities/score.entity").Score>;
}
