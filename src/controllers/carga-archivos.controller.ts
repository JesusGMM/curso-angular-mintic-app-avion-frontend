// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {
  HttpErrors,
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import multer from 'multer';
import patch from 'path';
import {Llaves as key} from '../config/llaves';
export class CargaArchivosController {
  constructor() {}

  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarImagenAviones', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la imagen de la persona.',
      },
    },
  })
  async cargarFotoAviones(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const rutaImagenPersona = patch.join(__dirname, key.carpetaImagenPersonas);
    let res = await this.StoreFileToPath(
      rutaImagenPersona,
      key.nombreCampoImagenPersona,
      request,
      response,
      key.extensionesPermitidasIMG,
    );
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarDocumentoPersona', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de documentos de la persona.',
      },
    },
  })
  async DocumentosPersona(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const rutaDocumentoPersona = patch.join(
      __dirname,
      key.carpetaDocumentoPersona,
    );
    let res = await this.StoreFileToPath(
      rutaDocumentoPersona,
      key.nombreCampoDocumentoPersona,
      request,
      response,
      key.extensionesPermitidasDOC,
    );
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path);
      },
      filename: function (req: any, file: any, cb: any) {
        filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(
    storePath: string,
    fieldname: string,
    request: Request,
    response: Response,
    acceptedExt: string[],
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = patch.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(
            new HttpErrors[400]('El formato del archivo no es permitido.'),
          );
        },
        limits: {
          fileSize: key.tamMaxImagenPersona,
        },
      }).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }
}
