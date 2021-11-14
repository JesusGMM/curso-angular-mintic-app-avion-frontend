import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitudes,
  Persona,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesPersonaController {
  constructor(
    @repository(SolicitudesRepository)
    public solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Solicitudes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Solicitudes.prototype.id,
  ): Promise<Persona> {
    return this.solicitudesRepository.persona(id);
  }
}
