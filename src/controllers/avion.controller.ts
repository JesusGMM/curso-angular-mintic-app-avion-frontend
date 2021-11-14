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
import {Aviones} from '../models';
import {AvionesRepository} from '../repositories';

export class AvionController {
  constructor(
    @repository(AvionesRepository)
    public avionesRepository : AvionesRepository,
  ) {}

  @post('/aviones')
  @response(200, {
    description: 'Aviones model instance',
    content: {'application/json': {schema: getModelSchemaRef(Aviones)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aviones, {
            title: 'NewAviones',
            exclude: ['id'],
          }),
        },
      },
    })
    aviones: Omit<Aviones, 'id'>,
  ): Promise<Aviones> {
    return this.avionesRepository.create(aviones);
  }

  @get('/aviones/count')
  @response(200, {
    description: 'Aviones model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Aviones) where?: Where<Aviones>,
  ): Promise<Count> {
    return this.avionesRepository.count(where);
  }

  @get('/aviones')
  @response(200, {
    description: 'Array of Aviones model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Aviones, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Aviones) filter?: Filter<Aviones>,
  ): Promise<Aviones[]> {
    return this.avionesRepository.find(filter);
  }

  @patch('/aviones')
  @response(200, {
    description: 'Aviones PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aviones, {partial: true}),
        },
      },
    })
    aviones: Aviones,
    @param.where(Aviones) where?: Where<Aviones>,
  ): Promise<Count> {
    return this.avionesRepository.updateAll(aviones, where);
  }

  @get('/aviones/{id}')
  @response(200, {
    description: 'Aviones model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Aviones, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Aviones, {exclude: 'where'}) filter?: FilterExcludingWhere<Aviones>
  ): Promise<Aviones> {
    return this.avionesRepository.findById(id, filter);
  }

  @patch('/aviones/{id}')
  @response(204, {
    description: 'Aviones PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aviones, {partial: true}),
        },
      },
    })
    aviones: Aviones,
  ): Promise<void> {
    await this.avionesRepository.updateById(id, aviones);
  }

  @put('/aviones/{id}')
  @response(204, {
    description: 'Aviones PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() aviones: Aviones,
  ): Promise<void> {
    await this.avionesRepository.replaceById(id, aviones);
  }

  @del('/aviones/{id}')
  @response(204, {
    description: 'Aviones DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.avionesRepository.deleteById(id);
  }
}
