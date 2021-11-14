import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SmartairDataSource} from '../datasources';
import {Persona, PersonaRelations, Solicitudes} from '../models';
import {SolicitudesRepository} from './solicitudes.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitudes, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.Smartair') dataSource: SmartairDataSource, @repository.getter('SolicitudesRepository') protected solicitudesRepositoryGetter: Getter<SolicitudesRepository>,
  ) {
    super(Persona, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudesRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
