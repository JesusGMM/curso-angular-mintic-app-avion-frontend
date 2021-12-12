import {inject} from '@loopback/core';
import {
  get,
  HttpErrors,
  oas,
  param,
  Response,
  RestBindings,
} from '@loopback/rest';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import {Llaves as llaves} from '../config/llaves';

const readdir = promisify(fs.readdir);
export class DescargaArchivosControllerController {
  constructor() {}

  /**
   *
   * @param type
   * @param id
   */
  @get('/archivos/{type}', {
    responses: {
      200: {
        content: {
          // string[]
          'application/json': {
            schema: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
          },
        },
        description: 'A list of files',
      },
    },
  })
  async listarArchivos(@param.path.number('type') type: number) {
    const rutaCarpeta = this.ObtenerRutaDeCarpetaPorTipo(type);
    const archivos = await readdir(rutaCarpeta);
    return archivos;
  }

  /**
   *
   * @param type
   * @param recordId
   * @param response
   */
  @get('/archivo/{type}/{filename}')
  @oas.response.file()
  async descargarArchivo(
    @param.path.number('type') type: number,
    @param.path.string('filename') filename: string,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ) {
    const rutaCarpeta = this.ObtenerRutaDeCarpetaPorTipo(type);
    const archivo = this.ValidarNombreArchivo(rutaCarpeta, filename);
    //console.log("folder: " + folder)
    //console.log("fname: " + fileName)
    response.download(archivo, rutaCarpeta);
    return response;
  }

  /**
   * Get the folder when files are uploaded by type
   * @param type
   */
  private ObtenerRutaDeCarpetaPorTipo(type: number) {
    let ruta = '';
    switch (type) {
      // Aviones
      case 1:
        ruta = path.join(__dirname, llaves.carpetaDocumentoPersona);
        break;

      case 2:
        ruta = path.join(__dirname, llaves.carpetaImagenPersonas);
    }
    return ruta;
  }

  /**
   * Validate file names to prevent them goes beyond the designated directory
   * @param fileName - File name
   */
  private ValidarNombreArchivo(archivo: string, folder: string) {
    const resolved = path.resolve(archivo, folder);
    if (resolved.startsWith(archivo)) return resolved;
    // The resolved file is outside sandbox
    throw new HttpErrors[400](`La ruta del archivo es inválida: ${folder}`);
  }
}
