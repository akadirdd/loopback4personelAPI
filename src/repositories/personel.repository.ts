import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {Personel, PersonelRelations, Unvan, Departman} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UnvanRepository} from './unvan.repository';
import {DepartmanRepository} from './departman.repository';

export class PersonelRepository extends DefaultCrudRepository<
  Personel,
  typeof Personel.prototype.id,
  PersonelRelations
> { 

  public readonly calisanlar: HasManyRepositoryFactory<Personel, typeof Personel.prototype.id>;

  public readonly yonetici: BelongsToAccessor<Personel, typeof Personel.prototype.id>;

  public readonly unvansWithHistory: HasManyRepositoryFactory<Unvan, typeof Personel.prototype.id>;

  public readonly departman: BelongsToAccessor<Departman, typeof Personel.prototype.id>;

  public readonly managerDepartmani: HasOneRepositoryFactory<Departman, typeof Personel.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,/* @repository.getter('PersonelRepository') protected personelRepositoryGetter: Getter<PersonelRepository>,*/ @repository.getter('UnvanRepository') protected unvanRepositoryGetter: Getter<UnvanRepository>,/* @repository.getter('PersonelRepository') protected personelRepositoryGetter: Getter<PersonelRepository>,*/ @repository.getter('DepartmanRepository') protected departmanRepositoryGetter: Getter<DepartmanRepository>,/* @repository.getter('PersonelRepository') protected personelRepositoryGetter: Getter<PersonelRepository>,*/
  ) {
    super(Personel, dataSource);
    this.managerDepartmani = this.createHasOneRepositoryFactoryFor('managerDepartmani', departmanRepositoryGetter);
    this.registerInclusionResolver('managerDepartmani', this.managerDepartmani.inclusionResolver);
    
    this.departman = this.createBelongsToAccessorFor('departman', departmanRepositoryGetter,);
    this.registerInclusionResolver('departman', this.departman.inclusionResolver);

    this.unvansWithHistory = this.createHasManyRepositoryFactoryFor('unvansWithHistory', unvanRepositoryGetter,);
    this.registerInclusionResolver('unvansWithHistory', this.unvansWithHistory.inclusionResolver);
    
    this.yonetici = this.createBelongsToAccessorFor('yonetici', Getter.fromValue(this),);
    this.registerInclusionResolver('yonetici', this.yonetici.inclusionResolver);

    this.calisanlar = this.createHasManyRepositoryFactoryFor('calisanlar', Getter.fromValue(this),);
    this.registerInclusionResolver('calisanlar', this.calisanlar.inclusionResolver);
  }

  public readonly nestedIncludeTemplate = {include: [{
    relation: 'calisanlar',
    scope: {
      include: [{
        relation: 'calisanlar',
        scope: {
          include: [{
            relation: 'calisanlar',
            scope: {
              include: [{
                relation: 'calisanlar',
                scope: {
                  include: [{
                    relation: 'calisanlar',
                    scope: {
                      include: [{
                        relation: 'calisanlar',
                        scope: {
                          include: ['calisanlar'],
                        },
                    }],
                    },
                }],
                },
            }],
            },
          }],
        },
      }],
    },
  }]};

}
