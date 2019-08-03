import { Repository } from 'typeorm';
import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Skill } from '../entity/skill';

@Resolver()
export class SkillResolver {
    public constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>
    ) {}

    @Mutation(() => Skill)
    public async createSkill(@Arg('name') name: string): Promise<Skill> {
        return this.skillRepository
            .create({
                name
            })
            .save();
    }

    @Query(() => [Skill])
    public async skills(): Promise<Skill[]> {
        return this.skillRepository.find();
    }

    @Mutation(() => Boolean)
    public async deleteskill(
        @Arg('skillId', () => Int) skillId: number
    ): Promise<boolean> {
        await this.skillRepository.delete({ id: skillId });
        return true;
    }
}
