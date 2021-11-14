import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SmartairDataSource} from '../datasources';
import {Solicitudes, SolicitudesRelations, Persona, Aviones} from '../models';
import {PersonaRepository} from './persona.repository';
import {AvionesRepository} from './aviones.repository';

export class SolicitudesRepository extends DefaultCrudRepository<
  Solicitudes,
  typeof Solicitudes.prototype.id,
  SolicitudesRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Solicitudes.prototype.id>;

  public readonly aviones: BelongsToAccessor<Aviones, typeof Solicitudes.prototype.id>;

  constructor(
    @inject('datasources.Smartair') dataSource: SmartairDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('AvionesRepository') protected avionesRepositoryGetter: Getter<AvionesRepository>,
  ) {
    super(Solicitudes, dataSource);
    this.aviones = this.createBelongsToAccessorFor('aviones', avionesRepositoryGetter,);
    this.registerInclusionResolver('aviones', this.aviones.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
