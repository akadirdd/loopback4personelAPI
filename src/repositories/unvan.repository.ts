import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Unvan, UnvanRelations, Personel, Departman} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PersonelRepository} from './personel.repository';
import {DepartmanRepository} from './departman.repository';

export class UnvanRepository extends DefaultCrudRepository<
  Unvan,
  typeof Unvan.prototype.id,
  UnvanRelations
> {

  public readonly personel: BelongsToAccessor<Personel, typeof Unvan.prototype.id>;

  public readonly departman: BelongsToAccessor<Departman, typeof Unvan.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('PersonelRepository') protected personelRepositoryGetter: Getter<PersonelRepository>, @repository.getter('DepartmanRepository') protected departmanRepositoryGetter: Getter<DepartmanRepository>,
  ) {
    super(Unvan, dataSource);
    this.departman = this.createBelongsToAccessorFor('departman', departmanRepositoryGetter,);
    this.registerInclusionResolver('departman', this.departman.inclusionResolver);
    this.personel = this.createBelongsToAccessorFor('personel', personelRepositoryGetter,);
    this.registerInclusionResolver('personel', this.personel.inclusionResolver);
  }
}
