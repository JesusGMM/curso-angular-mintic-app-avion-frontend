import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Solicitudes} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudController {
  constructor(
    @repository(SolicitudesRepository)
    public solicitudesRepository : SolicitudesRepository,
  ) {}

  @post('/solicitudes')
  @response(200, {
    description: 'Solicitudes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Solicitudes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {
            title: 'NewSolicitudes',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudes: Omit<Solicitudes, 'id'>,
  ): Promise<Solicitudes> {
    return this.solicitudesRepository.create(solicitudes);
  }

  @get('/solicitudes/count')
  @response(200, {
    description: 'Solicitudes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Solicitudes) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.solicitudesRepository.count(where);
  }

  @get('/solicitudes')
  @response(200, {
    description: 'Array of Solicitudes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Solicitudes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Solicitudes) filter?: Filter<Solicitudes>,
  ): Promise<Solicitudes[]> {
    return this.solicitudesRepository.find(filter);
  }

  @patch('/solicitudes')
  @response(200, {
    description: 'Solicitudes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {partial: true}),
        },
      },
    })
    solicitudes: Solicitudes,
    @param.where(Solicitudes) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.solicitudesRepository.updateAll(solicitudes, where);
  }

  @get('/solicitudes/{id}')
  @response(200, {
    description: 'Solicitudes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Solicitudes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Solicitudes, {exclude: 'where'}) filter?: FilterExcludingWhere<Solicitudes>
  ): Promise<Solicitudes> {
    return this.solicitudesRepository.findById(id, filter);
  }

  @patch('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitudes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {partial: true}),
        },
      },
    })
    solicitudes: Solicitudes,
  ): Promise<void> {
    await this.solicitudesRepository.updateById(id, solicitudes);
  }

  @put('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitudes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitudes: Solicitudes,
  ): Promise<void> {
    await this.solicitudesRepository.replaceById(id, solicitudes);
  }

  @del('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitudes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudesRepository.deleteById(id);
  }
}
