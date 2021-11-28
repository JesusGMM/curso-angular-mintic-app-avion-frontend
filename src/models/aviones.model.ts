import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Solicitudes} from './solicitudes.model';
import {Persona} from './persona.model';

@model()
export class Aviones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @hasMany(() => Solicitudes)
  solicitudes: Solicitudes[];

  @property({
    type: 'string',
  })
  responsableId?: string;

  constructor(data?: Partial<Aviones>) {
    super(data);
  }
}

export interface AvionesRelations {
  // describe navigational properties here
}

export type AvionesWithRelations = Aviones & AvionesRelations;
