import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {SmartairDataSource} from '../datasources';
import {Persona, PersonaRelations, Solicitudes, Aviones} from '../models';
import {SolicitudesRepository} from './solicitudes.repository';
import {AvionesRepository} from './aviones.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly solicitudes: HasManyRepositoryFactory<Solicitudes, typeof Persona.prototype.id>;

  public readonly aviones: HasOneRepositoryFactory<Aviones, typeof Persona.prototype.id>;
  
  constructor(
    @inject('datasources.Smartair') dataSource: SmartairDataSource, @repository.getter('SolicitudesRepository') protected solicitudesRepositoryGetter: Getter<SolicitudesRepository>, @repository.getter('AvionesRepository') protected avionesRepositoryGetter: Getter<AvionesRepository>,
  ) {
    super(Persona, dataSource);
    this.aviones = this.createHasOneRepositoryFactoryFor('aviones', avionesRepositoryGetter);
    this.registerInclusionResolver('aviones', this.aviones.inclusionResolver);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudesRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
  }
}
