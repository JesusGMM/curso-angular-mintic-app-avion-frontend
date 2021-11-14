import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Aviones,
  Solicitudes,
} from '../models';
import {AvionesRepository} from '../repositories';

export class AvionesSolicitudesController {
  constructor(
    @repository(AvionesRepository) protected avionesRepository: AvionesRepository,
  ) { }

  @get('/aviones/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Array of Aviones has many Solicitudes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitudes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Solicitudes>,
  ): Promise<Solicitudes[]> {
    return this.avionesRepository.solicitudes(id).find(filter);
  }

  @post('/aviones/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Aviones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitudes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Aviones.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {
            title: 'NewSolicitudesInAviones',
            exclude: ['id'],
            optional: ['avionesId']
          }),
        },
      },
    }) solicitudes: Omit<Solicitudes, 'id'>,
  ): Promise<Solicitudes> {
    return this.avionesRepository.solicitudes(id).create(solicitudes);
  }

  @patch('/aviones/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Aviones.Solicitudes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {partial: true}),
        },
      },
    })
    solicitudes: Partial<Solicitudes>,
    @param.query.object('where', getWhereSchemaFor(Solicitudes)) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.avionesRepository.solicitudes(id).patch(solicitudes, where);
  }

  @del('/aviones/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Aviones.Solicitudes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitudes)) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.avionesRepository.solicitudes(id).delete(where);
  }
}
