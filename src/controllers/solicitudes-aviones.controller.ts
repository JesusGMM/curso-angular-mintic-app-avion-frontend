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
  Aviones,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesAvionesController {
  constructor(
    @repository(SolicitudesRepository)
    public solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/aviones', {
    responses: {
      '200': {
        description: 'Aviones belonging to Solicitudes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Aviones)},
          },
        },
      },
    },
  })
  async getAviones(
    @param.path.string('id') id: typeof Solicitudes.prototype.id,
  ): Promise<Aviones> {
    return this.solicitudesRepository.aviones(id);
  }
}
