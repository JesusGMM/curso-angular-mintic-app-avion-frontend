import {Entity, hasMany, model, property, hasOne} from '@loopback/repository';
import {Solicitudes} from './solicitudes.model';
import {Aviones} from './aviones.model';

@model()
export class Persona extends Entity {
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
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: false,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  rol: string;

  @property({
    type: 'string',
  })
  ciudad?: string;

  @property({
    type: 'string',
  })
  departamento?: string;

  @property({
    type: 'string',
    required: false,
  })
  dirreccion: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
  })
  carta_laboral?: string;

  @hasMany(() => Solicitudes)
  solicitudes: Solicitudes[];

  @property({
    type: 'string',
  })
  avionesId?: string;

  @hasOne(() => Aviones, {keyTo: 'responsableId'})
  aviones: Aviones;

  @hasOne(() => Aviones, {keyTo: 'responsableId'})
  responsable: Aviones;

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
