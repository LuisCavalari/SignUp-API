import { Controller, HttpRequest } from '../../presentation/protocols'
import { Response, Request } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async function (request: Request, response: Response) {
    const httpRequest: HttpRequest = {
      body: request.body
    }
    const httResponse = await controller.handle(httpRequest)
    response.status(httResponse.statusCode).json(httResponse.body)
  }
}
