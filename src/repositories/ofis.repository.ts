import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import { Ofis, OfisRelations } from '../models/ofis.model';
import {Departman} from '../models';
import {DepartmanRepository} from './departman.repository';

export class OfisRepository extends DefaultCrudRepository<
  Ofis,
  typeof Ofis.prototype.id,
  OfisRelations
> {

  public readonly departmen: HasManyRepositoryFactory<Departman, typeof Ofis.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('DepartmanRepository') protected departmanRepositoryGetter: Getter<DepartmanRepository>,
  ) {
    super(Ofis, dataSource);
    this.departmen = this.createHasManyRepositoryFactoryFor('departmen', departmanRepositoryGetter,);
    this.registerInclusionResolver('departmen', this.departmen.inclusionResolver);
  }
}
