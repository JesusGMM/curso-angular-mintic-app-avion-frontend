import {/* inject, */ BindingScope, injectable} from '@loopback/core';
const generador = require('password-generator');
const cryptoJs = require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  GenerarClave() {
    let clave = generador(10, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJs.MD5(clave).toString();
    return claveCifrada;
  }
}
