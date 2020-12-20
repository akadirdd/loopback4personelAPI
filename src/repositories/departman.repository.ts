import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import { Departman, DepartmanRelations } from '../models/departman.model';
import {Unvan, Personel} from '../models';
import {UnvanRepository} from './unvan.repository';
import {PersonelRepository} from './personel.repository';
import {OfisRepository} from './ofis.repository';
import { Ofis } from '../models/ofis.model';

export class DepartmanRepository extends DefaultCrudRepository<
  Departman,
  typeof Departman.prototype.id,
  DepartmanRelations
> {

  public readonly unvans: HasManyRepositoryFactory<Unvan, typeof Departman.prototype.id>;

  public readonly manager: BelongsToAccessor<Personel, typeof Departman.prototype.id>;

  public readonly personels: HasManyRepositoryFactory<Personel, typeof Departman.prototype.id>;
  
  public readonly lokasyon: BelongsToAccessor<Ofis, typeof Departman.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UnvanRepository') protected unvanRepositoryGetter: Getter<UnvanRepository>, @repository.getter('PersonelRepository') protected personelRepositoryGetter: Getter<PersonelRepository>, @repository.getter('OfisRepository') protected ofisRepositoryGetter: Getter<OfisRepository>,
  ) {
    super(Departman, dataSource);
    this.personels = this.createHasManyRepositoryFactoryFor('personels', personelRepositoryGetter,);
    this.registerInclusionResolver('personels', this.personels.inclusionResolver);
    this.lokasyon = this.createBelongsToAccessorFor('lokasyon', ofisRepositoryGetter,);
    this.registerInclusionResolver('lokasyon', this.lokasyon.inclusionResolver);
    this.manager = this.createBelongsToAccessorFor('manager', personelRepositoryGetter,);
    this.registerInclusionResolver('manager', this.manager.inclusionResolver);
    this.unvans = this.createHasManyRepositoryFactoryFor('unvans', unvanRepositoryGetter,);
    this.registerInclusionResolver('unvans', this.unvans.inclusionResolver);
  }
}
