import { Repository } from 'typeorm';
import { Arg, Mutation, Query, Resolver, Int } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Skill } from '../entity/skill';

@Resolver()
export class SkillResolver {
    constructor(
        @InjectRepository(Skill)
        private readonly skillRepository: Repository<Skill>
    ) {}

    @Mutation(() => Skill)
    async createSkill(@Arg('name') name: string) {
        return this.skillRepository
            .create({
                name
            })
            .save();
    }

    @Mutation(() => Boolean)
    async deleteskill(@Arg('skillId', () => Int) skillId: number) {
        await this.skillRepository.delete({ id: skillId });
        return true;
    }

    @Query(() => [Skill])
    async skills() {
        return this.skillRepository.find();
    }
}
