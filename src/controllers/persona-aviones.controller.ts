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
  Persona,
  Aviones,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaAvionesController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/aviones', {
    responses: {
      '200': {
        description: 'Persona has one Aviones',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Aviones),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Aviones>,
  ): Promise<Aviones> {
    return this.personaRepository.responsable(id).get(filter);
  }

  @post('/personas/{id}/aviones', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Aviones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aviones, {
            title: 'NewAvionesInPersona',
            exclude: ['id'],
            optional: ['responsableId']
          }),
        },
      },
    }) aviones: Omit<Aviones, 'id'>,
  ): Promise<Aviones> {
    return this.personaRepository.responsable(id).create(aviones);
  }

  @patch('/personas/{id}/aviones', {
    responses: {
      '200': {
        description: 'Persona.Aviones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Aviones, {partial: true}),
        },
      },
    })
    aviones: Partial<Aviones>,
    @param.query.object('where', getWhereSchemaFor(Aviones)) where?: Where<Aviones>,
  ): Promise<Count> {
    return this.personaRepository.responsable(id).patch(aviones, where);
  }

  @del('/personas/{id}/aviones', {
    responses: {
      '200': {
        description: 'Persona.Aviones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Aviones)) where?: Where<Aviones>,
  ): Promise<Count> {
    return this.personaRepository.responsable(id).delete(where);
  }
}
